from django.urls import path, include
from knox import views as knox_views
from .views import LoginView, VerifyView

urlpatterns = [
  path('api/auth/login', LoginView.as_view()),
  path('api/auth/verify', VerifyView.as_view()),
]