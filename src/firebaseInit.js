import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9eaNJ3jbB6w1YMPBtaBcb86zenzzuShQ",
  authDomain: "geo-earth-chat1.firebaseapp.com",
  projectId: "geo-earth-chat1",
  storageBucket: "geo-earth-chat1.appspot.com",
  messagingSenderId: "784172219721",
  appId: "1:784172219721:web:8c62c76fdb8daf94e12e98"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

//use these db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };