import { NativeModules, NativeEventEmitter } from "react-native";
import {ethers, Contract as EthersContract} from 'ethers';
let infuraProvider = new ethers.providers.InfuraProvider('mainnet');
let infuraProviderRopsten = new ethers.providers.InfuraProvider('ropsten');
let infuraProviderRinkeby = new ethers.providers.InfuraProvider('rinkeby');
let infuraProviderKovan = new ethers.providers.InfuraProvider('kovan');
let infuraProviderGoerli = new ethers.providers.InfuraProvider('goerli');

const url = "https://eth-mainnet.alchemyapi.io/jsonrpc/J5dtZ15uh9UBfyGUwicNlNbjXvN-aog0";
const provider = new ethers.providers.JsonRpcProvider(url);


const getAddress = async () => {
  try {
    const address = await NativeModules.WalletModule.getAddress();
    return address.toLowerCase();
  } catch(e) {
    throw "Wallet fetch failed: " + e;
  }
};

const getBalance = async () => {
  try {
    return await NativeModules.WalletModule.getBalance();
  } catch(e) {
    throw "Get balance failed with error: " + e;
  }
};

const getNetwork = async () => {
  try {
    let network = JSON.parse(await NativeModules.WalletModule.getNetwork());
    network.name = network.name.toLowerCase();
    return network;
  } catch(e) {
    throw "Get network failed with error: " + e
  }
};

const sendTransaction = async ({to, value, data}) => {
  try {
    return await NativeModules.WalletModule.sendTransaction(to, ethers.utils.parseEther(value).toHexString(),data);
  } catch(e) {
    throw "Send transaction failed with error: " + e
  }
};

const sendTransactionWithDapplet = async ({to, value, data = "0x0"}) => {
  try {
    return await NativeModules.WalletModule.sendTransactionWithDapplet(to, ethers.utils.parseEther(value).toHexString(), ethers.utils.formatBytes32String(data));
  } catch(e) {
    throw "Send transaction failed with error: " + e
  }
};

const signTransaction = async ({to, value, data = "0x0", detailObject = false}) => {
  try {
    const signedTransaction = await NativeModules.WalletModule.signTransaction(to, ethers.utils.parseEther(value).toHexString(), ethers.utils.formatBytes32String(data), detailObject);
    return typeof signedTransaction === 'string' ? signedTransaction : JSON.parse(signedTransaction);
  } catch(e) {
    throw "Sign transaction failed with error: " + e
  }
};

const signMessage = async (message) => {
  try {
    return await NativeModules.WalletModule.signMessage(ethers.utils.formatBytes32String(message));
  } catch(e) {
    throw "Sign message failed with error: " + e
  }
};

const transfer = async ({to="", value=""}) => {
  try {
    return await NativeModules.WalletModule.transfer(to, ethers.utils.parseEther(value).toHexString());
  } catch(e) {
    throw "Transfer failed with error: " + e
  }
}

const settingsPopUp = () => NativeModules.NativeVCModule.setting();

const getOrientation = async () => await NativeModules.NativeVCModule.getOrientation();

const isDarkMode = async () => await NativeModules.NativeVCModule.isDarkMode();

const openBrowser = url =>  url ? NativeModules.NativeVCModule.browser(url) : NativeModules.NativeVCModule.browser('duckduckgo.com');

const qrScanner = async () => {
  try {
    return await NativeModules.NativeVCModule.qrScanner();
  } catch(e) {
    throw "Scan QR code failed with error: " + e
  }
}

const sendToken = async ({tokenAddress, to, value, data = "0x0"}) => {
  try {
    return await NativeModules.WalletModule.sendToken(tokenAddress, to, ethers.utils.parseEther(value).toHexString(), data);
  } catch(e) {
    throw "Send transaction failed with error: " + e
  }
};

const write = async ({contractAddress, abi, functionName, parameters, value = "0", data = "0x0"}) => {
  try {
    return await NativeModules.ContractModule.write(contractAddress, JSON.stringify(abi), functionName, parameters, ethers.utils.parseEther(value.toString()).toHexString(), ethers.utils.hashMessage(data));
  } catch(e) {
    throw "Write to contract failed with error: " + e
  }
};

const read = async ({contractAddress, abi, functionName, parameters}) => {
  const networkData = await getNetwork();
  const network = networkData.name;
  if (network === "ropsten") {
    const contract = new EthersContract(contractAddress, abi, infuraProviderRopsten);
    if (parameters.length === 0) {
      return contract[functionName]();
    } else if (parameters.length > 0) {
      return contract[functionName](...parameters);
    }

  } else if (network === "rinkeby") {
    const contract = new EthersContract(contractAddress, abi, infuraProviderRinkeby);
    if (parameters.length === 0) {
      return contract[functionName]();
    } else if (parameters.length > 0) {
      return contract[functionName](...parameters);
    }

  } else if (network === "main") {
    const contract = new EthersContract(contractAddress, abi, infuraProvider);
    if (parameters.length === 0) {
      return contract[functionName]();
    } else if (parameters.length > 0) {
      return contract[functionName](...parameters);
    }

  } else if (network === "goerli") {
    const contract = new EthersContract(contractAddress, abi, infuraProviderGoerli);
    if (parameters.length === 0) {
      return contract[functionName]();
    } else if (parameters.length > 0) {
      return contract[functionName](...parameters);
    }

  } else if (network === "kovan") {
    const contract = new EthersContract(contractAddress, abi, infuraProviderKovan);
    if (parameters.length === 0) {
      return contract[functionName]();
    } else if (parameters.length > 0) {
      return contract[functionName](...parameters);
    }

  } else {
    return "Unsupported network"
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
      return await provider.resolveName(ensName);
    } catch (e) {
      throw "ENS resolver error: " + e;
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

const aliceEvent = () => {
  return new NativeEventEmitter(NativeModules.CallRNModule);
};

const createConnection = () => {
  NativeModules.WallectConnectModule.create()
}

const sendDataObject = (object) => {
  NativeModules.WallectConnectModule.message({message: JSON.stringify(object)});
}

export const Settings = {
  settingsPopUp,
  openBrowser,
  qrScanner,
  getOrientation,
  isDarkMode,
};

export const Wallet = {
  getAddress,
  getBalance,
  getNetwork,
  sendTransaction,
  signTransaction,
  signMessage,
  sendToken,
  aliceEvent,
  sendTransactionWithDapplet,
  transfer
};

export const WalletConnect = {
  createConnection,
  sendDataObject
};

export const Contract = {
  write,
  read
};

export const ENS = {
  resolve,
  isPublicAddress
}
