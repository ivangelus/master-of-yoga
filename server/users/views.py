from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from server import firebase
import json
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

class RegisterView(APIView):
  def post(self, request):
    parsedRequestBody = json.loads(request.body)
    registerResponse = firebase.registerUser(parsedRequestBody)
    if registerResponse['success']:
      password = registerResponse['password']
      email = registerResponse['userData']['email']
      loginResponse = firebase.logIn(email, password)
      token = loginResponse['result']['idToken']
      return Response({
        'msg': 'User registered and logged in successfully',
        'token': token,
        'user': registerResponse['userData']
      })
    else:
      return Response({
        'msg': str(registerResponse['msg'])
      })

class UpdateView(APIView):
  def post(self, request, uid):
    parsedBody = json.loads(request.body)
    updatedUser = firebase.updateUser(uid, parsedBody)
    updatedUser['uid'] = uid
    return Response(updatedUser)