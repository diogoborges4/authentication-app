import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvkoA4uI1C4YXp-Ranetyp9nopTgTi5WU",
  authDomain: "helpdesk-3e3e1.firebaseapp.com",
  projectId: "helpdesk-3e3e1",
  storageBucket: "helpdesk-3e3e1.appspot.com",
  messagingSenderId: "39751736283",
  appId: "1:39751736283:web:d02da513133c295fbde5fe",
  measurementId: "G-DPZB2JHZNP",
  databaseURL: "https://helpdesk-3e3e1-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth(app);

export default database;
