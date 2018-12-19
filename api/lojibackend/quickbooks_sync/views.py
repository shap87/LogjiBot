from django.shortcuts import render,redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
import json,requests
from purchase_orders.models import Vendor, PurchaseOrder, Part, PurchaseOrderItem
from users.models import UserCompany
from intuitlib.client import AuthClient
from django.conf import settings

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
    intuit_auth_client.get_bearer_token(request.GET.get('code'))
    userinfo = intuit_auth_client.get_user_info().content

    return redirect(str(settings.APP_URL) + ':' + str(settings.APP_PORT)\
                + '/qb/auth?access_token=' + intuit_auth_client.access_token\
                + '&realm_id=' + request.GET.get('realmId'))


@api_view(['POST'])
@authentication_classes(())
@permission_classes(())
def sync(request):
    '''
    Append to purchase orders models new items from QB database
    '''
    body = json.loads(request.body)

    #prepare API request
    base_url = 'https://sandbox-quickbooks.api.intuit.com'
    select_statment = 'select * from PurchaseOrder'
    url = '{0}/v3/company/{1}/query?query={2}'.format(base_url,
                                                      body['realm_id'],
                                                      select_statment)
    auth_header = 'Bearer {0}'.format(body['access_token'])
    headers = {
        'Authorization': auth_header,
        'Accept': 'application/json'
    }
    #make API call
    response = requests.get(url, headers=headers)

    if(response.status_code == 200):
        #perform serialization
        pos_content = json.loads(response.content)

        #check if there is a this app company exist and create if not
        uc,created = UserCompany.objects.get_or_create(id=0)
        uc.name = "John Peterson's Company"
        uc.save()

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
                purchase_order.company = vendor.company
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
