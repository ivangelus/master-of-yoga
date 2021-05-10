from django.urls import path, include
from knox import views as knox_views
from .views import VerifyView, RegisterView

urlpatterns = [
  path('api/users/verify', VerifyView.as_view()),
  path('api/users', RegisterView.as_view()),
]