import { NativeModules } from "react-native";
import {ethers, Contract as EthersContract} from 'ethers';
let infuraProvider = new ethers.providers.InfuraProvider('ropsten');


// const getAddress = (cb) => NativeModules.WalletModule.getAddress(cb);
const getAddress = async () => {
  try {
    return await NativeModules.WalletModule.getAddress();
  } catch(e) {
    return "Wallet fetch failed"
  }
};

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

const settingsPopUp = () => {
  return NativeModules.NativeVCModule.setting();
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

const walletChangeEvent = () => new NativeEventEmitter(NativeModules.CallRNModule);

export const Settings = {
  settingsPopUp
};

export const Wallet = {
  getAddress,
  getBalance,
  sendTransaction,
  signTransaction,
  signMessage,
  sendToken,
  walletChangeEvent,
};

export const Contract = {
  write,
  read
};
