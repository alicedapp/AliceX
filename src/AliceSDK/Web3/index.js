import { NativeModules, NativeEventEmitter } from "react-native";
import {ethers, Contract as EthersContract} from 'ethers';
let infuraProvider = new ethers.providers.InfuraProvider('mainnet');
let infuraProviderRopsten = new ethers.providers.InfuraProvider('ropsten');


// const getAddress = (cb) => NativeModules.WalletModule.getAddress(cb);
const getAddress = async () => {
  try {
    return await NativeModules.WalletModule.getAddress();
  } catch(e) {
    return "Wallet fetch failed"
  }
};

const getBalance = async () => {
  try {
    return await NativeModules.WalletModule.getBalance();
  } catch(e) {
    return "Get balance failed with error: " + e
  }
};


const sendTransaction = async ({to, value, data}) => {
  try {
    return await NativeModules.WalletModule.sendTransaction(to, ethers.utils.parseEther(value).toHexString(),data);
  } catch(e) {
    return "Send transaction failed with error: " + e
  }
};

const sendTransactionWithDapplet = async ({to, value, data = "0x0"}) => {
  try {
    return await NativeModules.WalletModule.sendTransactionWithDapplet(to, ethers.utils.parseEther(value).toHexString(), ethers.utils.formatBytes32String(data));
  } catch(e) {
    return "Send transaction failed with error: " + e
  }
};

const signTransaction = async ({to, value, data = "0x0"}) => {
  try {
    return await NativeModules.WalletModule.signTransaction(to, ethers.utils.parseEther(value).toHexString(), ethers.utils.formatBytes32String(data));
  } catch(e) {
    return "Sign transaction failed with error: " + e
  }
};

const signMessage = async (message) => {
  try {
    return await NativeModules.WalletModule.signMessage(ethers.utils.formatBytes32String(message));
  } catch(e) {
    return "Sign message failed with error: " + e
  }
};

const settingsPopUp = () => NativeModules.NativeVCModule.setting();

const openBrowser = (url) =>  url ? NativeModules.NativeVCModule.browser(url) : NativeModules.NativeVCModule.browser('duckduckgo.com');

const sendToken = () => {
  return "Coming Soon!"
};

const write = async ({contractAddress, abi, functionName, parameters, value, data = "0x0"}) => {
  try {
    return await NativeModules.ContractModule.write(contractAddress, JSON.stringify(abi), functionName, parameters, ethers.utils.parseEther(value).toHexString(), ethers.utils.hashMessage(data));
  } catch(e) {
    return "Write to contract failed with error: " + e
  }
};

const read = async ({contractAddress, abi, functionName, parameters, network}) => {
  if (network === "ropsten") {
    const contract = new EthersContract(contractAddress, abi, infuraProviderRopsten);
    if (parameters.length === 0) {
      return contract[functionName]();
    } else if (parameters.length > 0) {
      return contract[functionName](...parameters);
    }

  } else {
    const contract = new EthersContract(contractAddress, abi, infuraProvider);
    if (parameters.length === 0) {
      return contract[functionName]();
    } else if (parameters.length > 0) {
      return contract[functionName](...parameters);
    }
  }

};

const resolve = async (ensName) => {
  if (ensName.substring(0,2) === '0x') {
    if (/^(0x){1}[0-9a-fA-F]{40}$/i.test(ensName)) {
      return ensName;
    } else {
      return "0x0000000000000000000000000000000000000000";
    }
  } else if (ensName.slice(-4) === '.eth' || ensName.slice(-4) === '.xyz') {
    try {
      return await infuraProvider.resolveName(ensName);
    } catch (e) {
      return "ENS resolver error: " + e;
    }
  } else {
    return "0x0000000000000000000000000000000000000000";
  }
};

const isPublicAddress = (ensName) => {
  if (ensName) {
    if (/^(0x){1}[0-9a-fA-F]{40}$/i.test(ensName)) {
      return ensName;
    } else {
      return "0x0000000000000000000000000000000000000000";
    }
  }
};

const walletChangeEvent = () => {
  return new NativeEventEmitter(NativeModules.CallRNModule);
};

export const Settings = {
  settingsPopUp,
  openBrowser
};

export const Wallet = {
  getAddress,
  getBalance,
  sendTransaction,
  signTransaction,
  signMessage,
  sendToken,
  walletChangeEvent,
  sendTransactionWithDapplet
};

export const Contract = {
  write,
  read
};

export const ENS = {
  resolve,
  isPublicAddress
}
