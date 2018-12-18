from django.shortcuts import render
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
import json,requests

@api_view(['POST'])
@authentication_classes(())
@permission_classes(())
def sync(request):
    '''
    Append to purchase orders models new items from QB database
    '''
    body = json.loads(request.body)


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
    response = requests.get(url, headers=headers)
    pos_content = json.loads(response.content)

    print(pos_content)
    #for po in pos_content['QueryResponse']['PurchaseOrder']:


    return Response(status=200)
# Create your views here.
