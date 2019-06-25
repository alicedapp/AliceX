import {Image, NativeModules, Text, TouchableOpacity, View} from "react-native";

export const getAddress = (cb) => {
  NativeModules.WalletModule.getAddress(cb);
};

export const sendTransaction = ({to, value, data}, cb) => NativeModules.WalletModule.sendTransaction(to, value, cb);
