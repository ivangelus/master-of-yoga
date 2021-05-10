import os
import pathlib
import pyrebase
import firebase_admin
from dotenv import load_dotenv, dotenv_values
from firebase_admin import auth, credentials, firestore


BASE_DIR = pathlib.Path(__file__).parent.absolute()
CRED_DIR = BASE_DIR / 'firebase-sdk.json'

load_dotenv(dotenv_path = BASE_DIR / '.env')

config = {
  "apiKey": os.getenv('PYREBASE_API_KEY'),
  "authDomain": "master-yoga-ef07c.firebaseapp.com",
  "databaseURL": "https://master-yoga-ef07c-default-rtdb.europe-west1.firebasedatabase.app",
  "projectId": "master-yoga-ef07c",
  "storageBucket": "master-yoga-ef07c.appspot.com",
  "messagingSenderId": "406827781078",
  "appId": "1:406827781078:web:ae92f6607c4e74abccf277",
  "measurementId": "G-BQ1B138K0D"
}

cred = credentials.Certificate(CRED_DIR)
firebase_admin.initialize_app(cred)
db = firestore.client()

# TESTING LOGIN WITH PYREBASE FOR DEVELOPMENT PURPOSES
# firebase = pyrebase.initialize_app(config)
# auth = firebase.auth()

def logIn(user):
  try:
    result = auth.sign_in_with_email_and_password(user['email'], user['password'])
    return {
      "msg": "User has been logged in",
      "result":result
    }
  except:
    return {
      "msg": 'Invalid user or password'
    }

def authToken(token):
  try:
    decoded_token = auth.verify_id_token(token)
    uid = decoded_token['uid']
    return {
      "valid": True,
      "msg":"Token verified",
      "result": decoded_token
    }
  except:
    return {
      "valid": False,
      "msg":"Token is invalid",
      "result":"null"
    }

def getUser(uid):
  user = db.collection('users').document(uid).get()
  processedUser = user.to_dict()
  if processedUser:
    return processedUser
  else:
    return False

def newUser(data):
  uid = data['user_id']
  userData = {
    "consecutiveDays": 0,
    "customTracks": ["0"],
    "email": data['firebase']['identities']['email'][0],
    'firstName': 'First',
    'lastname': 'Last',
    'image':'url',
    "lastEntry": data['auth_time'],
    'posesCompletion': {
      "begginer":"0%",
      "advanced": "0%",
      "intermediate":"0%"
    }
  }
  try:
    db.collection('users').document(uid).set(userData)
    newUser = db.collection('users').document(uid).get()
    return newUser.to_dict()
  except:
    print('Failed to create new user in database')
    raise

def getPoses():
  try:
    posesCollection = db.collection('poses').get()
    posesList = []
    for pose in posesCollection:
      posesList.append(pose.to_dict())
    return posesList
  except:
    print('Failed to retrieve poses from database')

def getRoutines():
  try:
    routinesCollection = db.collection('routines')
    result = {}
    for routineSnapshot in routinesCollection.get():
      name = routineSnapshot.id
      formattedRoutines = []
      for pose in routineSnapshot.to_dict()['routineList']:
        formattedRoutines.append(pose)
      result[name] = formattedRoutines
    return result
  except:
    print('Failed to retrieve routines from database')
    raise