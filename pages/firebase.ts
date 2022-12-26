import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBoNnhWf9Hz-jsotj0MTAvnwtUfKMy-Zjg",
  authDomain: "instagram-clone-react-20676.firebaseapp.com",
  projectId: "instagram-clone-react-20676",
  storageBucket: "instagram-clone-react-20676.appspot.com",
  messagingSenderId: "204973703763",
  appId: "1:204973703763:web:bfdbcd59357c926edf3ca6",
  measurementId: "G-84DC78GJ5W",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { auth };
export default db;