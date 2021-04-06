import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyA5g8vILZ0oIR83aH_tE9A10YzF3c8V_ZY",
  authDomain: "barter-app-5eb4e.firebaseapp.com",
  projectId: "barter-app-5eb4e",
  storageBucket: "barter-app-5eb4e.appspot.com",
  messagingSenderId: "64097618278",
  appId: "1:64097618278:web:4199e8e783210a81d9e0a7"
};
// Initialize Firebase
if(!firebase.apps.length){ firebase.initializeApp(firebaseConfig); } 

export default firebase.firestore()