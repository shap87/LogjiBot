from django.shortcuts import render,redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.utils.six import text_type

import json,requests
from purchase_orders.models import Vendor, PurchaseOrder, Part, PurchaseOrderItem
from users.models import ExtendUser
from users.models import UserCompany
from intuitlib.client import AuthClient
from django.conf import settings
from users.serializers import MyTokenObtainPairSerializer
from .models import QuickBooksUser

#Initialie auth client for intuit integration
intuit_auth_client = AuthClient(
    settings.INTUIT_CLIENT_ID,
    settings.INTUIT_CLIENT_SECRET,
    settings.INTUIT_REDIRECT_URI,
    settings.INTUIT_ENVIROMENT,
)

@api_view(['GET'])
@authentication_classes(())
@permission_classes(())
def auth(request):
    '''
    Route for generating auth url for QB oauth2
    '''
    url = intuit_auth_client.get_authorization_url(settings.INTUIT_SCOPES)
    return redirect(url)


@api_view(['GET'])
@authentication_classes(())
@permission_classes(())
def auth_redirect(request):
    '''
    Redirect view for intuit oauth2 flow
    This is the last step where intuit server grants access to client account
    '''
    #convert auth code to access token
    intuit_auth_client.get_bearer_token(request.GET.get('code'))
    #get info about user
    userinfo = json.loads(intuit_auth_client.get_user_info().content)

    #get or create new user
    user,created = ExtendUser.objects.get_or_create(email=userinfo['email'],
                                                    username=userinfo['email'])

    #check if there is a default app company exist and create if not
    uc,created = UserCompany.objects.get_or_create(id=0)
    if(created):
        uc.name = "John Peterson's Company"
        uc.save()
    user.company_id = uc
    user.save()

    #save access token for QB for user
    qb_user,created = QuickBooksUser.objects.get_or_create(user = user)
    qb_user.access_token = intuit_auth_client.access_token
    qb_user.refresh_token = intuit_auth_client.refresh_token
    qb_user.realm_id = request.GET.get('realmId')
    qb_user.save()


    #generate JWT token for user
    refresh = MyTokenObtainPairSerializer.get_token(user)

    #make first sync
    response = fetch_purchase_orders(user)

    if(response.status_code == 200):
        #send JWT token to the frontend
        return redirect("{}?access={}&refresh={}".format(
            settings.INTUIT_APP_REDIRECT_URI,
            text_type(refresh.access_token),
            text_type(refresh))
        )
    return response


@api_view(['POST'])
def sync(request):
    '''
    API route for synchronization with QB
    '''
    return fetch_purchase_orders(request.user)


@api_view(['POST'])
def test_qb_connect(request):
    """
    API route for test connection and refresh QB tokens
    """
    try:
        qb_user = QuickBooksUser.objects.get(user=request.user)
    except QuickBooksUser.DoesNotExist:
        return Response({'error': 'the current user is not registered as a QB user'}, status=400)
    access_token = qb_user.access_token
    refresh_token = qb_user.refresh_token
    realm_id = qb_user.realm_id

    base_url = 'https://sandbox-quickbooks.api.intuit.com'
    url = '{0}/v3/company/{1}/companyinfo/{1}'.format(base_url, realm_id)
    auth_header = 'Bearer {0}'.format(access_token)
    headers = {
        'Authorization': auth_header,
        'Accept': 'application/json'
    }
    r = requests.get(url, headers=headers)
    tokens_used_message = 'old tokens were used'
    if r.status_code >= 400:
        print('debug: connection error, trying to get new tokens...')
        url_lamda = 'https://wyklx960of.execute-api.us-east-2.amazonaws.com/beta-v6/GetRefreshToken'
        api_key = 'tJVfveegtl9HkBB2N0SP34uf0lTVFo6S3aGiqaSR'
        headers_lambda = {
            'x-api-key': api_key,
        }
        r1 = requests.get(url_lamda, headers=headers_lambda, params={'refresh_token': refresh_token})
        if r1.status_code != 200:
            return Response({'error': 'connection error with lambda function', 'data': r1.text}, status=400)
        response = json.loads(r1.text)
        print('debug: lambda response:\n{}'.format(json.dumps(response, indent=2)))
        new_access_token = response.get('access_token')
        new_refresh_token = response.get('refresh_token')
        if new_access_token and new_refresh_token:
            qb_user.access_token = new_access_token
            qb_user.refresh_token = new_refresh_token
            qb_user.save()
        else:
            return Response({'error': 'received incorrect tokens', 'data': r1.text}, status=400)
        auth_header = 'Bearer {0}'.format(new_access_token)
        headers['Authorization'] = auth_header
        r = requests.get(url, headers=headers)
        if r.status_code >= 400:
            return Response({'error': 'connection error', 'data': r.text}, status=400)
        tokens_used_message = 'new tokens were used'
    try:
        company_info = json.loads(r.text).get('CompanyInfo', {})
    except ValueError:
        company_info = {}
    domain = company_info.get('domain', '')
    company_name = company_info.get('CompanyName', '')
    if not domain and not company_name:
        message = 'an incorrect QB server response with code {}:{}'.format(r.status_code, r.text)
        return Response({'error': message}, status=400)
    message = 'you are successfully connected to domain {} and company {}, {}'.format(domain, company_name,
                                                                                      tokens_used_message)
    print(message)
    return Response({'success': message}, status=200)


def fetch_purchase_orders(user):
    '''
    Append to purchase orders models new items from QB database
    '''
    #get access_token for quick books
    try:
        qb_user = QuickBooksUser.objects.get(user=user)
    except QuickBooksUser.DoesNotExist:
        return Response(message="SignUp with QuickBooks first",status=401)
    access_token=qb_user.access_token
    realm_id=qb_user.realm_id

    #prepare API request
    base_url = 'https://sandbox-quickbooks.api.intuit.com'
    select_statment = 'select * from PurchaseOrder'
    url = '{0}/v3/company/{1}/query?query={2}'.format(base_url,
                                                      realm_id,
                                                      select_statment)
    auth_header = 'Bearer {0}'.format(access_token)
    headers = {
        'Authorization': auth_header,
        'Accept': 'application/json'
    }
    #make API call
    response = requests.get(url, headers=headers)

    if(response.status_code == 200):
        #perform serialization
        pos_content = json.loads(response.content)

        #iterate purchase orders
        for po in pos_content['QueryResponse']['PurchaseOrder']:
            vendor,created = Vendor.objects.get_or_create(qb_id=po['VendorRef']['value'])
            if created:
                vendor.name = po['VendorRef']['name']
                vendor.city = po['VendorAddr']['Line4'].split(',')[0]
                vendor.state = po['VendorAddr']['Line4'].split()[1]
                vendor.zip = po['VendorAddr']['Line4'].split()[2]
                vendor.contact_name = po['VendorAddr']['Line1']
                vendor.save()


            purchase_order,created = PurchaseOrder.objects.get_or_create(qb_id = po['Id'],
                                                                         vendor = vendor)
            if created:
                purchase_order.vendor = vendor
                purchase_order.company = user.company_id
                purchase_order.time_created = po['MetaData']['CreateTime']
                purchase_order.time_modified = po['MetaData']['LastUpdatedTime']
                purchase_order.status = 'OA'
                purchase_order.save()

                #if purchase order is new we filling info for it
                for line in po['Line']:
                    if line['DetailType'] == 'ItemBasedExpenseLineDetail':
                        part,created = Part.objects.get_or_create(qb_id=line['ItemBasedExpenseLineDetail']['ItemRef']['value'])
                        #creating items
                        if created:
                            part.name = line['ItemBasedExpenseLineDetail']['ItemRef']['name']
                            part.save()

                        poi = PurchaseOrderItem.objects.create(po=purchase_order,
                                                               part=part,
                                                               unit_price=line['ItemBasedExpenseLineDetail']['UnitPrice'],
                                                               qty=line['ItemBasedExpenseLineDetail']['Qty'])
        return Response(status=response.status_code)

    #if API call failed
    return response
