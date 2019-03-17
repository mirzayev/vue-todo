import firebase from "firebase/app";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyC2Lk1ZGdOUuuR0R1zH4DAP9RgeVMsnugM",
  authDomain: "todo-vue-c888f.firebaseapp.com",
  databaseURL: "https://todo-vue-c888f.firebaseio.com",
  projectId: "todo-vue-c888f",
  storageBucket: "todo-vue-c888f.appspot.com",
  messagingSenderId: "946545379679"
};

const firebaseApp = firebase.initializeApp(config);

const firestore = firebaseApp.firestore();

export default firestore;
