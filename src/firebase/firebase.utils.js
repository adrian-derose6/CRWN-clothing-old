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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


