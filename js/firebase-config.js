// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQnOtTjmK7DmzJxe3AwEeNBZl0gYK5IQw",
  authDomain: "kotiki-auth.firebaseapp.com",
  projectId: "kotiki-auth",
  storageBucket: "kotiki-auth.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890abcdef123456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = firebase.auth();
