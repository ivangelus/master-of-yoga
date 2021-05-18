from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from server import firebase
from datetime import date, timedelta
import json

def getStreak(lastSignIn, lastStreak):
  today = date.today()
  yesterday = today - timedelta(days=1)
  newStreak = 0
  if lastSignIn == str(yesterday):
    newStreak = lastStreak + 1
  elif lastSignIn == str(today):
    return lastStreak
  return newStreak

class VerifyView(APIView):
  def post(self, request):
    parsedRequestBody = json.loads(request.body)
    userToken = parsedRequestBody['token']
    authResult = firebase.authToken(userToken)
    if authResult['valid']:
      uid = authResult['result']['user_id']
      userData = firebase.getUser(uid)
      if userData:
        streak = getStreak(userData['lastEntry'], userData['consecutiveDays'])
        userData['consecutiveDays'] = streak
        userData['lastEntry'] = str(date.today())
        firebase.updateUser(uid, userData)
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