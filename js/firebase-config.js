// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyiFSMCIs1NF5yOPFRJm6z41de8xk77gc",
  authDomain: "kitty-40c6f.firebaseapp.com",
  projectId: "kitty-40c6f",
  storageBucket: "kitty-40c6f.firebasestorage.app",
  messagingSenderId: "465460685030",
  appId: "1:465460685030:web:06353fb1b1e4b90bee7327",
  measurementId: "G-F89SHKB80D"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = firebase.auth();
