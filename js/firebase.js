import {initializeApp} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js"

const firebaseConfig = {
    apiKey: "AIzaSyC-hadqrKADb3Ew5MjHdF8P1LVf7eMKzxE",
    authDomain: "pwa-10asolano.firebaseapp.com",
    projectId: "pwa-10asolano",
    storageBucket: "pwa-10asolano.appspot.com",
    messagingSenderId: "960293986976",
    appId: "1:960293986976:web:3da53e200580f7cc7d1fc5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export{
    app
  }