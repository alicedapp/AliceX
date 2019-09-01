import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Clipboard,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
// import FeatherIcon from 'react-native-vector-icons/Feather'
// import MaterialCommIcon from "react-native-vector-icons/MaterialCommunityIcons";
// import { RoundButton } from 'react-native-button-component';
// import * as Animatable from 'react-native-animatable';
//
// const Web3 = require('web3');
// const web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/'));

import Input from './Input'
import { color, shadow, text } from "../../AliceUtils/themes";
import { addressResolver, checkSubdomainOwner, newSubdomain } from "../../AliceUtils/ensFunctions";
// import QrModal from './QrModal';
import CameraModal from './CameraModal';
import { navigate } from "../../AliceUtils/navigationWrapper";
// import { transferEtherNoReward, transferTokensNoReward, transferTokensWithTokenReward, transferEtherWithEtherReward } from 'tenzorum'
import { Wallet } from "../../AliceSDK";
import { ENS } from "../../AliceSDK/Web3";
// import {getBalance, getTenzBalance} from "../../Utils/ether";

const personalWalletAddress = "0xf8894138aa4d7b54b7d49afa9d5600cdb5178721";

const emptyAddress = '0x0000000000000000000000000000000000000000';

const publicAddress = "0xb78197a43836e084bE4ff1F4c84d7557EA11F214";

const cryptoCurrencies = [
  { name: 'Tenzorum', symbol: 'TENZ', abi: [], imageUrl: require('../../AliceAssets/localethereum.png'), type: "token", balance: 0, address: "0xB07C36074b8333B01e38A307df804FDc6c37e0eC", },
  { name: 'Ethereum', symbol: 'ETH', abi: [], imageUrl: require('../../AliceAssets/localethereum.png'), type: "cryptoCurrency", balance: '0', },
  { name: 'DAI', symbol: 'DAI', abi: [], imageUrl: require('../../AliceAssets/localethereum.png'), type: "token", balance: 52, },
  { name: 'FOAM', symbol: 'FOAM', abi: [], imageUrl: require('../../AliceAssets/localethereum.png'), type: "token", balance: 1000, },
  { name: 'Akropolis', symbol: 'AKR', abi: [], imageUrl: require('../../AliceAssets/localethereum.png'), type: "token", balance: 0, },
];

let { height, width } = Dimensions.get('window');

type Props = {};
export default class TransactionModal extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      buttonState: 'upload',
      cryptoBalance: '',
      inputAddress: '',
      ensAvailable: false,
      publicAddress: '',
      ensMessage: 'Enter a public address or ENS username',
      addressChecked: false,
      cameraModalVisible: false,
      qrModalVisible: false,
      currentCrypto: { name: 'Select Currency' },
      tenzBalance: 2,
      ethBalance: 0,
      amount: '',
      reward: '',
    }
  }

  handleTextRef = ref => this.text = ref;

  async componentDidMount() {
    this.setState({publicAddress: await Wallet.getAddress()});
    Wallet.getBalance().then(bal => this.setState({ethBalance: bal}));
  }

  _navigateToWebView = (uri) => {
    uri = uri || '0x08b79a6a11624e666d21420e9a2bdcdbf9ecfb43b4537e346bf8b35530f0750e';
    this.setState({ buttonState: 'upload' });
    navigate('WebView', {uri: 'https://ropsten.etherscan.io/search?q='+uri})
    this.props.modalControl();
  };

  // _sendTransaction = async () => {
  //   const {reward, amount, currentCrypto, publicAddress} = this.state;
  //   let response;
  //   Keyboard.dismiss();
  //   try {
  //     if (currentCrypto.type === "token") {
  //       if (reward) {
  //         response = await transferTokensWithTokenReward(currentCrypto.address, web3.utils.toWei(amount, "ether"), publicAddress, web3.utils.toWei(reward, "ether"));
  //         console.log('PAYLOAD: ', response);
  //       } else {
  //         response = await transferTokensNoReward(currentCrypto.address, web3.utils.toWei(amount, "ether"), publicAddress);
  //         console.log('PAYLOAD: ', response);
  //       }
  //     } else if (currentCrypto.type === "cryptoCurrency") {
  //       if (reward) {
  //         response = await transferEtherWithEtherReward(web3.utils.toWei(amount, "ether"), publicAddress, web3.utils.toWei(reward, "ether"));
  //         console.log('PAYLOAD: ', response);
  //       } else {
  //         response = await transferEtherNoReward(web3.utils.toWei(amount, "ether"), publicAddress);
  //         console.log('PAYLOAD: ', response);
  //       }
  //     } else {
  //       console.log("set currency")
  //     }
  //     if (response.txHash) {
  //       this.setState({ buttonState: 'success' })
  //       Alert.alert(
  //         'Transaction Submitted',
  //         'View on etherscan?',
  //         [
  //           {text: 'View', onPress: () => this._navigateToWebView(response.txHash)},
  //           {text: 'Close', onPress: () => this.props.modalControl(), style: 'cancel'},
  //         ],
  //         { cancelable: false }
  //       )
  //     }
  //     return response;
  //
  //   } catch(e) {
  //     this.setState({ buttonState: 'upload' })
  //     console.log("Unable to make token transfer with no reward")
  //   }
  // };

  _resolveAddress = async (ensUsername) => {
    this.setState({inputAddress: ensUsername})
    const address = await ENS.resolve(ensUsername);
    console.log('ADDRESS: ', address);
    // const {publicAddress} = this.state;
    // this.setState({addressChecked: true});
    // if (ensUsername.length === 0) {
    //   this.setState({ensAvailable: false, ensMessage: 'Enter a valid or unempty username'});
    // } else if (true === true) {
    //   if (ensUsername === emptyAddress) {
    //     this.setState({ensAvailable: false, ensMessage: 'Invalid address'});
    //   } else if(ensUsername === publicAddress) {
    //     this.setState({ensAvailable: true, ensMessage: "It's your domain!"});
    //   } else {
    //     console.log(this.state.publicAddress)
    //     this.setState({publicAddress: ensUsername});
    //     this.setState({ensAvailable: true, ensMessage: "Valid address: " + ensUsername});
    //   }
    //   return ensUsername;
    //
    // } else {
    //   this.setState({inputAddress: ensUsername});
    //   const {inputAddress} = this.state;
    //   const addr = await addressResolver(ensUsername);
    //   this.setState({publicAddress: addr});
    //   if (addr === emptyAddress) {
    //     this.setState({ensAvailable: false, ensMessage: 'Invalid address'});
    //   } else if(addr === publicAddress) {
    //     this.setState({ensAvailable: true, ensMessage: "It's your domain!"});
    //   } else {
    //     this.setState({ensAvailable: true, ensMessage: "Valid address: " + this.state.publicAddress});
    //   }
    //   return addr;
    // }
    //
  };

  _chooseBalance = (crypto) => {
    switch(crypto) {
      case "Tenzorum":
        return this.state.tenzBalance;
      case "Ethereum":
        return this.state.ethBalance;
      default:
        return;
    }
  };

  _addressScan =  async (address) => {
    const resolve = await this._resolveAddress(address);
    if (resolve) this.setState({publicAddress: address, inputAddress: address});
  }

  render() {
    const { inputAddress, ensAvailable, ensMessage, cameraModalVisible, qrModalVisible, reward, amount } = this.state;
    const { isVisible } = this.props;
    return (
        <Modal isVisible={isVisible}>
          <KeyboardAvoidingView behavior="position">
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity style={styles.button} onPress={this.props.modalControl}>
                <Text style={{color: 'white'}} >x</Text>
              </TouchableOpacity>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.transactionBox}>
                <ScrollView style={{marginRight: -20, marginLeft: -20, height: 90, padding: 10, flex: 0}} horizontal showsHorizontalScrollIndicator={false}>
                  {cryptoCurrencies.map((currency, key) => {
                    let amount = this._chooseBalance(currency.name);
                    const {imageUrl, balance} = currency;
                    let selectStyle = this.state.selected === key ? {backgroundColor: '#cbc7ef'} : {};
                    return (<TouchableOpacity key={key} style={[styles.cryptoBox, selectStyle]} onPress={() => this.setState({currentCrypto: currency, selected: key})}>
                      <Text style={{fontWeight: '700', fontSize: 20, color:'black'}}>{amount || balance}</Text>
                      <Text style={{fontWeight: '700',}}>{currency.symbol}</Text>
                      <Image style={{ width: 40, height: 40, resizeMode:'contain'}} source={imageUrl} />
                    </TouchableOpacity>)
                  })}
                </ScrollView>
                <Text ref={this.handleTextRef} style={{fontSize: 20, fontWeight: '700', margin: 5}}>{this.state.currentCrypto.name}</Text>
                <View style={{width: 5, height: 20}}/>
                <View style={styles.inputAndButton}>
                  <Input placeholder="Send to..." onChangeText={this._resolveAddress} autoCapitalize="none" value={inputAddress}/>
                  <TouchableOpacity onPress={() => this.setState({cameraModalVisible: !cameraModalVisible})} style={styles.squareButton}>
                    <Image src={require('../../AliceAssets/cam-icon-grey.png')} style={{resizeMode: 'contain', width: 20}}/>
                  </TouchableOpacity>
                </View>
                <View style={{padding: 5, marginTop: 5, marginBottom: 5, justifyContent: 'center', height: 30, width: width-60, backgroundColor: this.state.addressChecked ? (ensAvailable ? '#ccffca' : '#ee9c9d') : '#bedfff', borderRadius: 8}}>
                  <Text style={{marginTop: 10, height: 25,color: this.state.addressChecked ? (ensAvailable ? 'green' : 'red') : 'blue',}} numberOfLines={1}>
                    {ensMessage}
                  </Text>
                </View>
                <View style={[styles.inputAndButton]}>
                  <Input placeholder="Amount" keyboardType={"numeric"} onChangeText={(amount) => this.setState({amount})} autoCapitalize="none" value={amount}/>
                </View>
                <View style={{width: 5, height: 15}}/>
                <View style={[styles.inputAndButton, {marginTop: 5}]}>
                  <Input placeholder="Reward" keyboardType={"numeric"} onChangeText={(reward) => this.setState({reward})} autoCapitalize="none" value={reward}/>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          <CameraModal isVisible={cameraModalVisible} modalControl={() => this.setState({cameraModalVisible: false})} addressScan={this._addressScan}/>
        </Modal>
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.component,
    borderRadius: 10,
    height: 160,
    padding: 20,
    width: width - 40,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: width-50,
    height: 60,
  },
  button: {
    height: 40,
    width: 40,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d3e4ee',
  },
  cryptoBox: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 120,
    borderRadius: 15,
    backgroundColor: 'white',
    marginLeft: 10,
    ...shadow
  },
  header: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputAndButton: {
    flexDirection: 'row',
    width: 265,
  },
  sendButton: {
    marginLeft: 10,
    borderRadius: 10,
    height: 40,
    width: 80,
    backgroundColor: '#a25cee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareButton: {
    marginLeft: 10,
    borderRadius: 10,
    height: 40,
    width: 40,
    backgroundColor: '#3f69ee',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow
  },
  transactionBox: {
    width: width - 40,
    height: 410,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    ...shadow
  },
});
