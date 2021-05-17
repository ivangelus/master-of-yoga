from django.urls import path, include
from knox import views as knox_views
from .views import VerifyView, RegisterView, UpdateView

urlpatterns = [
  path('api/users/verify', VerifyView.as_view()),
  path('api/users', RegisterView.as_view()),
  path('api/users/<str:uid>', UpdateView.as_view()),
]