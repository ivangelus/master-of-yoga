from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from server import firebase
import json

class LoginView(APIView):
  # this is a testing view for development purposes
  def post(self, request):
    parsed = json.loads(request.body)
    user = {
      'email': parsed['email'],
      'password': parsed['password']
    }
    firebase.logIn(user)
    result = firebase.logIn(user)
    return Response(result) 

class VerifyView(APIView):
  def post(self, request):
    parsedRequestBody = json.loads(request.body)
    userToken = parsedRequestBody['token']
    authResult = firebase.authToken(userToken)
    if authResult['valid']:
      uid = authResult['result']['user_id']
      userData = firebase.getUser(uid)
      if userData:
        authResult['result'] = userData
      else:
        newUser = firebase.newUser(authResult['result'])
        authResult['result'] = newUser
      return Response(authResult)
    else:
      return Response(authResult) 