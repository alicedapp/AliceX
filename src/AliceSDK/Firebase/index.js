const firebase = require('firebase');
require("firebase/firestore");
require("firebase/messaging");
const admin = require('firebase-admin');

const {firebaseConfig} = require('../../../env');

admin.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

module.exports = {
    db: firebase.firestore(),
    messaging: admin.messaging(),
};
