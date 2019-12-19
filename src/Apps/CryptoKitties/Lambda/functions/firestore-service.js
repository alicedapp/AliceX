const firebase = require('firebase');
require("firebase/firestore");

firebase.initializeApp(require('./_keys/env').firebaseConfig);

const db = firebase.firestore();
module.exports = new class FirestoreService {
    async getWizard(network, id) {
        return db
            .collection('wizards')
            .doc('network')
            .collection(network)
            .doc(id)
            .get()
            .then(snapshot => {
                if(snapshot.exists) {
                    return snapshot.data();
                }
                return null;
            });
    }

    async getFirebaseDeviceMessagingToken(ethAddress) {
        return db
            .collection('accounts')
            .doc(ethAddress)
            .get()
            .then(snapshot => {
                if(snapshot.exists) {
                    const document = snapshot.data();
                    return document.firebaseMessagingToken ? document.firebaseMessagingToken : '';
                }
                return '';
            });
    }
};