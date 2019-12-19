const firebase = require('firebase');
require('firebase/firestore');
const RNfirebase = require('react-native-firebase');

const {firebaseConfig} = require('../../../env');

firebase.initializeApp(firebaseConfig);

module.exports = {
  db: firebase.firestore(),
  messaging: RNfirebase.messaging(),
  firebase
};
