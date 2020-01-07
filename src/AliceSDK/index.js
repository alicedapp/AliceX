// import Map from "@react-native-mapbox-gl/maps";
import {RNCamera as Camera} from 'react-native-camera';
import Socket from './Socket'
import {db} from './Firebase/index';
import Accounts from './Firebase/Accounts';
import {Wallet, Settings, Contract} from "./Web3";

export default {
  Camera,
  Contract,
  // Map,
  Settings,
  Wallet,
  Socket,
  Firestore: db,
  Accounts
}
