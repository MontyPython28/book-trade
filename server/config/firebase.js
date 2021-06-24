const firebase = require('firebase');
require('firebase/auth');

var config = {
    apiKey: "AIzaSyCPLmhFy_zZtjKbmnLSBu96KKCaFOlH7N4",
    authDomain: "nusbooktrade-auth.firebaseapp.com",
    projectId: "nusbooktrade-auth",
    storageBucket: "nusbooktrade-auth.appspot.com",
    messagingSenderId: "968125307153",
    appId: "1:968125307153:web:76be954a17d64a2c8154b0"
}

const app = firebase.initializeApp(config);

module.exports = {
    signup: function (email, password) {
        return app.auth().createUserWithEmailAndPassword(email, password)
    }
}