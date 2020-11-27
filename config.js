import firebase from 'firebase/app'
require('@firebase/firestore')


// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDxTnPjepw9KSBqnGP34Stm-D9t2IYi0L4",
    authDomain: "book-santa-b0e62.firebaseapp.com",
    databaseURL: "https://book-santa-b0e62.firebaseio.com",
    projectId: "book-santa-b0e62",
    storageBucket: "book-santa-b0e62.appspot.com",
    messagingSenderId: "454651726737",
    appId: "1:454651726737:web:07416f3b6caa07481e6830"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()