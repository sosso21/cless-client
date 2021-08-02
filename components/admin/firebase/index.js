import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAB68P_aPpVDUY5OrtRqFdVCrW6JBZb9dk",
    authDomain: "cless-image.firebaseapp.com",
    projectId: "cless-image",
    storageBucket: "cless-image.appspot.com",
    messagingSenderId: "561212264407",
    appId: "1:561212264407:web:ad0acfccc442ca3464c592",
    measurementId: "G-T3WGBD3W6M"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
  
const storage = firebase.storage();

export { storage, firebase as default };