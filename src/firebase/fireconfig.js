
import  firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

var firebaseConfig = {
    apiKey: "AIzaSyDj1lVoGEGda0zNfjwJiRt3AmHE7aER2c0",
    authDomain: "ididit-49e88.firebaseapp.com",
    projectId: "ididit-49e88",
    storageBucket: "ididit-49e88.appspot.com",
    messagingSenderId: "103747728065",
    appId: "1:103747728065:web:3de2db5529cc1617f61a40"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const fa = firebase.auth();

export  {fa,db}