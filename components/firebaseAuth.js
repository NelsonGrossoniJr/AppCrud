import firebase from 'firebase';

const firebaseConfig = {

  apiKey: "AIzaSyCPk3jQQsaUnCcXVZ3GDHGrUyONlggy6w4",
  authDomain: "nelsonsproject-8b188.firebaseapp.com",
  projectId: "nelsonsproject-8b188",
  storageBucket: "nelsonsproject-8b188.appspot.com",
  messagingSenderId: "451027229607",
  appId: "1:451027229607:web:86d869c6e72dada705f482",
  measurementId: "G-41187BB773"
  
};


let app;
if (!firebase.apps.lenght){
  app = firebase.initializeApp(firebaseConfig);
}
else{
  app= firebase.app()
}


export {firebase};
