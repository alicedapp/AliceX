const firebase = require('firebase');
require("firebase/firestore");

const {firebaseConfig} = require('../../../env');

firebase.initializeApp(firebaseConfig);

module.exports = {
    db: firebase.firestore()
};
