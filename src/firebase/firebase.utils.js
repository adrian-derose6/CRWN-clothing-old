import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAThoBAi0OIT95jgoYVJaIAqYzKJhEAmM8",
    authDomain: "regent-clothing.firebaseapp.com",
    databaseURL: "https://regent-clothing.firebaseio.com",
    projectId: "regent-clothing",
    storageBucket: "regent-clothing.appspot.com",
    messagingSenderId: "838673099563",
    appId: "1:838673099563:web:10603b87b545d2b4ee336e",
    measurementId: "G-7DBBKVZV0R"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


