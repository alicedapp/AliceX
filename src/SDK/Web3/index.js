import {Image, NativeModules, Text, TouchableOpacity, View} from "react-native";
import ethers from 'ethers';

const getAddress = (cb) => NativeModules.WalletModule.getAddress(cb);

const sendTransaction = ({to, value, data}, cb) => NativeModules.WalletModule.sendTransaction(to, value, cb);

const signTransaction = () => {

};

const signMessage = () => {

};

const sendToken = () => {

};

const write = () => {

};

const read = () => {

};

export const Wallet = {
  getAddress,
  sendTransaction,
  signTransaction,
  signMessage,
  sendToken
};

export const Contract = {
  write,
  read
};
