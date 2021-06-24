import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCPLmhFy_zZtjKbmnLSBu96KKCaFOlH7N4",
    authDomain: "nusbooktrade-auth.firebaseapp.com",
    projectId: "nusbooktrade-auth",
    storageBucket: "nusbooktrade-auth.appspot.com",
    messagingSenderId: "968125307153",
    appId: "1:968125307153:web:76be954a17d64a2c8154b0"
});


export default app;
export const auth = app.auth();
export const cred = firebase.auth.EmailAuthProvider;
