// Where WalletConnect, and P2P Sockets SDK will live
// If you see firebase don't worry, it's just for a hackathon. it will be gone shortly :)
import {firebaseConfig} from '../../../env'

import firebase from 'firebase';
require("firebase/firestore");
class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp(firebaseConfig);
    }
  }
  db = firebase;
}
const firebaseSDK = new FirebaseSDK();

const {firestore} = firebaseSDK.db;
const db = firestore();

export default db;

//
// export const db = () => {
//   try {
//     const firebaseSDK = new FirebaseSDK();
//
//     const {firestore} = firebaseSDK.db;
//     return firestore();
//
//   } catch(e) {
//     console.log('firebase error: ', e)
//   }
//
// }
//
