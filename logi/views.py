from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

class LandingPage(View):
    '''
    Handles all landing page views - Landing, About, Contact, etc
    '''
    contact_template = 'landing/contact.html'
    landing_template = 'landing/landing.html' 
    service_template = 'landing/services.html'
    about_template = 'landing/about.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.landing_template, context={})

    def post(self, request, *args, **kwargs):
        return render(request, self.landing_template, context={})
    
    def get_service_page(self, request):
        return render(request, self.service_template, context={})
    
    def get_contact_page(self, request):
        return render(request, self.contact_template, context={})

    def get_about_page(self, request):
        return render(request, self.about_template, context={})

class Login(View):
    '''
    Dashboard to see all your orders
    '''
    login_template = 'login/login.html'
    registration_template = 'login/registration.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.login_template, context={
        })

    def post(self, request, *args, **kwargs):
        return render(request, self.login_template, context={
        })
    
    def registration(self, request):
        '''
        Registers users 
        '''
        # Register user
        if reques.method == "POST":
            user, created = User.objects.get_or_create(username=request.POST['username'], email=request.POST['email'])
            if created:
                user.set_password(password)
                user.save() 
                return redirect(Dashboard)
            else:
                return render(request, self.registration_template, context={
                    "error_registration": True
                })

        return render(request, self.registration_template, context={})
    

class Dashboard(View):
    '''
    Dashboard to see all your orders
    '''
    dash_template = 'dash/dash.html'

    # @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        # Get tracking POs and SOs
        # my_tracked_pos = PersonalPoTracking.objects.filter(user=str(request.user.pk))

        return render(request, self.dash_template, context={
            # 'my_tracked_pos': my_tracked_pos
        })

    # @method_decorator(login_required)
    def post(self, request, *args, **kwargs):
        return render(request, self.dash_template, context={

        })

class PurchaseOrder(View):
    '''
    Purchase Order View 
    '''
    po_tempalte = 'purchase_order/po_detail.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.po_tempalte, context={
        })

    def post(self, request, *args, **kwargs):
        return render(request, self.po_tempalte, context={
        })

class AccountSettings(View):
    '''
    Accounting settings for user
    '''
    def get(self, request):
        return None

    def post(self, request):
        return None

class SalesOrder(View):
    '''
    Sales order view
    '''
    def get(self, request):
        return None
    
    def post(self, request):
        return None
    
    def update(self, request):
        return None