from django.urls import path, include
from .views import RoutinesView

urlpatterns = [
  path('api/routines/getAll', RoutinesView.as_view()),
]