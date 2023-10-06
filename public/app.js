// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
const firebaseConfig = {
  apiKey: "AIzaSyCYB8LA1-Dfy4A2hQiwjQQrDpf6LaW3tKo",
  authDomain: "project1-17e05.firebaseapp.com",
  databaseURL: "https://project1-17e05-default-rtdb.firebaseio.com",
  projectId: "project1-17e05",
  storageBucket: "project1-17e05.appspot.com",
  messagingSenderId: "559204208779",
  appId: "1:559204208779:web:c9786385eef630caecc48e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);