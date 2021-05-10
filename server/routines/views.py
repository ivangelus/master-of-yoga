from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from server import firebase

class RoutinesView(APIView):
  def get(self, request):
    routines = firebase.getRoutines()
    print(routines)
    return Response(routines)