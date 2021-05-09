import firebase from 'firebase/app';
import 'firebase/auth';
import env from 'react-dotenv';

const config = {
  apiKey: env.FIREBASE_APIKEY,
  authDomain: 'master-yoga-ef07c.firebaseapp.com',
  databaseURL:
    'https://master-yoga-ef07c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'master-yoga-ef07c',
  storageBucket: 'master-yoga-ef07c.appspot.com',
  messagingSenderId: '406827781078',
  appId: '1:406827781078:web:ae92f6607c4e74abccf277',
  measurementId: 'G-BQ1B138K0D',
};

firebase.initializeApp(config);

export default firebase;
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
