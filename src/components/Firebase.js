import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore'

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCsIcEU7ccNIGguRlWdQFsnDgXI-tYdx1E",
    authDomain: "messenger-by-amdrza.firebaseapp.com",
    projectId: "messenger-by-amdrza",
    storageBucket: "messenger-by-amdrza.appspot.com",
    messagingSenderId: "459060091561",
    appId: "1:459060091561:web:f41de524de7246a4d567b8",
  })
  .auth();
