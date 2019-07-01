import {Image, NativeModules, Text, TouchableOpacity, View} from "react-native";
import {ethers, Contract as EthersContract} from 'ethers';
let infuraProvider = new ethers.providers.InfuraProvider('ropsten');


const getAddress = (cb) => NativeModules.WalletModule.getAddress(cb);

const getBalance = (address) => {
  return infuraProvider.getBalance(address).then((balance) => {
    let etherString = ethers.utils.formatEther(balance);
    console.log("Balance: " + etherString);
    return etherString;
  });
}


const sendTransaction = ({to, value, data}, cb) => NativeModules.WalletModule.sendTransaction(to, value, cb);

const signTransaction = () => {

};

const signMessage = (message, cb) => {
  return NativeModules.WalletModule.signMessage(message, cb);
}


const sendToken = () => {

};

const write = ({contractAddress, abi, functionName, parameters, value, data}, cb) => NativeModules.ContractModule.write(contractAddress, JSON.stringify(abi), functionName, parameters, value, data, cb);


const read = ({contractAddress, abi, functionName, parameters}) => {
  const contract = new EthersContract(contractAddress, abi, infuraProvider);
  if (parameters.length === 0) {
    return contract[functionName]();
  } else if (parameters.length > 0) {
    return contract[functionName](...parameters);
  }

};


export const Wallet = {
  getAddress,
  getBalance,
  sendTransaction,
  signTransaction,
  signMessage,
  sendToken
};

export const Contract = {
  write,
  read
};
