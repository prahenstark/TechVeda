import firebase from "firebase";
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmhWrQzbE8BOTAdh8M6vch6LtMGK4U4YU",
    authDomain: "tech-veda.firebaseapp.com",
    projectId: "tech-veda",
    storageBucket: "tech-veda.appspot.com",
    messagingSenderId: "365206827891",
    appId: "1:365206827891:web:f6aaddb813cf3ef4680b06"
};


const firebaseApp= firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;