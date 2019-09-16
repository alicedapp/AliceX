// Where WalletConnect, Chat, and P2P Sockets SDK will live
// If you see firebase don't worry, it's just for a hackathon. it will be gone shortly :)


import firebase from 'firebase';
require("firebase/firestore");

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyAAVOJJPFaADs-0PtLSm4o_tFvZhfConfI",
        authDomain: "alice-1555232535074.firebaseapp.com",
        databaseURL: "https://alice-1555232535074.firebaseio.com",
        projectId: "alice-1555232535074",
        storageBucket: "alice-1555232535074.appspot.com",
        messagingSenderId: "439884301632",
        appId: "1:439884301632:web:3a01189b1176cb154be6a5"
      });
    }
  }
  db = firebase;
}
const firebaseSDK = new FirebaseSDK();

const {firestore} = firebaseSDK.db;
const db = firestore();

export default db
