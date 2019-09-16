import {Component} from "react";
import {
  Clipboard,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  RefreshControl
} from "react-native";
import React from "react";
const { height, width } = Dimensions.get('window');
const cols = 2, rows = 2;
import NFT from '../Components/NFT'
import Token from '../Components/Token'
import Modal from "react-native-modal";
import QRCode from 'react-native-qrcode-svg';
import {ENS, Wallet} from '../../AliceSDK/Web3'
import AppIcon from "../Components/AppIcon";
import {AppRegistry} from "../../Apps/AppRegistry";
import Camera from "../Components/Camera";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import env from '../../../env.json';



const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

export default class Tokens extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenInfo: [],
      addressStart: '',
      token: '',
      tokens: [],
      ethereum: {},
      nfts: [],
      transferHash: '',
      fetching: true,
      profileModalVisible: false,
      tokenModalVisible: false,
      transactionModalVisible: false,
      cameraModalVisible: false,
      cameraMode: false,
      address: '',
      addressArray: [],
      addressEnd: '',
      walletAddress: '',
      addressStatus: 'unresolved',
      inputAddress: '',
      ethBalance: 0,
      animatePress: new Animated.Value(1),
      amount: '',
      network: '',
      tokenAmount: '',
      canSend: false,
      revealAddress: false
    };

  }

  async componentWillMount() {
    const address = await Wallet.getAddress();
    const addressEnd = address.slice(-4);
    const addressStart = address.substr(0,8);
    const addressArray = address.slice(8).match(/.{6}/g);

    this.setState({address, addressEnd, addressStart, addressArray})
  }

  async componentDidMount() {
    this.getNetwork();
    this.getTokenList();
    this.amberFetch();
    this.getNFTInfo();
    this.getBalance();

  }

  getNetwork = async () => {
    const network = await Wallet.getNetwork();
    console.log('NETWORK: ', network);
    this.setState({network})
  };


  getBalance = async () => {
    try {
      const ethBalance = await Wallet.getBalance();
      this.setState({ethBalance})
    } catch(e) {
      console.log('GET BALANCE ERROR: ', e)
    }
  }

  _refresh = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.getTokenList();
    this.getNFTInfo();
    this.getBalance()
  };

  getTokenMetaData = async (address) => {
    try {
      const metadata = await fetch("https://eth-mainnet.alchemyapi.io/jsonrpc/J5dtZ15uh9UBfyGUwicNlNbjXvN-aog0", {
        body: JSON.stringify({ "jsonrpc":"2.0", "method":"alchemy_getTokenMetadata", "params": [address.toString()], "id": 1}),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      return await metadata.json()

    } catch(e) {
      console.log('metadata error: ', e)
    }

  }

  getTokenInfo = async (tokenList) => {
    let tokens = [];
    tokenList.forEach( async (token) => {
      let tokenObject = token;
      let metadata = await this.getTokenMetaData(token.tokenInfo.address);
      tokenObject.tokenInfo.image = metadata.result.logo;
      tokens.push(tokenObject);
    });
    return tokens;
  };

  getTokenList = async () => {
    this.setState({fetching: true});
    var xhr = new XMLHttpRequest();
    const data = "";
    const onData = async (result) => {
      if (result.tokens && result.tokens.length > 0) {
        const tokens = await this.getTokenInfo(result.tokens);
        this.setState({tokens});
      }
    };

    const finishedFetching = () => this.setState({fetching: false});

    xhr.addEventListener("readystatechange",  function()  {
      if (this.readyState === this.DONE) {
        if (this.responseText){
          console.log('TOKENS: ', JSON.parse(this.responseText))
          onData(JSON.parse(this.responseText));
          finishedFetching();
        }
        finishedFetching();
      }
    });
    xhr.open("GET", "https://web3api.io/api/v1/addresses/"+await Wallet.getAddress()+"/balances");
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.setRequestHeader("access-control-allow-credentials", "*");
    xhr.setRequestHeader("x-api-key", env.amberdata);
    xhr.send(data);

  };

  amberFetch = async () => {
    try {
      let response = await fetch('"https://web3api.io/api/v1/addresses/"+await Wallet.getAddress()+"/balances"', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'x-api-key': env.amberdata
        }
      })
      console.log('AMBER RES: ', response);

    } catch(e) {
      console.log('AMBER ERR: ', e);

    }


  };

  toggleModal = () => {
    this.setState({profileModalVisible: !this.state.profileModalVisible})
  };

  openTokenModal = (tokenInfo, token) => {
    // this.setState({transactionModalVisible: !this.state.transactionModalVisible, tokenInfo, token})

    this.setState({ tokenModalVisible: !this.state.tokenModalVisible, tokenInfo, token, tokenAmount: (parseInt(token.balance)/Math.pow(10, parseInt(tokenInfo.decimals))).toFixed(4)});
  };

  closeTokenModal = () => {
    this.setState({tokenModalVisible: !this.state.tokenModalVisible, amount: '', inputAddress: '', addressStatus: 'invalid'})
  };

  setTokenAmount = (amount) => {
    if (parseInt(amount) > this.state.tokenAmount) {
      this.setState({amountColor: '#cc2538', canSend: false})
    } else {
      this.setState({amountColor: '#000000', canSend: true})
    }
    this.setState({amount})
  };

  copyAddress = async () => {
    return await Clipboard.setString(this.state.address)
  };

  getNFTInfo = async () => {
    let data = null;
    var xhr = new XMLHttpRequest();
    const onData = (data) => {
      console.log('NFT DATA: ', data);
      if (data.assets) {
        this.setState({nftInfo: data, nfts: data.assets});
      }
    };
    xhr.addEventListener("readystatechange",  function()  {
      if (this.readyState === this.DONE) {
        if (this.responseText){
          onData(JSON.parse(this.responseText));
        }
      }
    });
    xhr.open("GET", "https://api.opensea.io/api/v1/assets?owner="+await Wallet.getAddress());
    xhr.setRequestHeader("x-api-key", env.opensea);
    xhr.send(data);

  };

  resolveAddress = async (ensUsername) => {
    if (!ensUsername) {
      this.setState({addressStatus: 'unresolved', inputAddress: ensUsername});
      return;
    }
    this.setState({inputAddress: ensUsername});
    const address = await ENS.resolve(ensUsername);
    if (address === "0x0000000000000000000000000000000000000000") {
      this.setState({addressStatus: 'invalid', addressChecked: true});
    } else if (ENS.isPublicAddress(address)) {
      this.setState({addressStatus: 'valid', addressChecked: true, walletAddress: address});
    }
  };

  _addressScan =  async (address) => {
    const resolve = await this.resolveAddress(address);
    if (resolve) this.setState({ inputAddress: address });
  }

  renderVerification = () => {
    if (this.state.addressStatus === 'valid') {
      return <Image style={{resizeMode: 'contain', width: 30, height: 30}} source={require('../Assets/green-verify.png')} />
    } else if (this.state.addressStatus === 'invalid') {
      return <Image style={{resizeMode: 'contain', width: 30, height: 30}} source={require('../Assets/grey-verify.png')} />
    } else if (this.state.addressStatus === 'unresolved'){
      return <Image style={{resizeMode: 'contain', width: 30, height: 30}} source={require('../Assets/grey-verify.png')} />
    }
  };

  sendEther = async () => {
    try {
      const result = await Wallet.transfer({to: '', value: '0.0'})
      this.setState({transferHash: result})
    } catch(e) {
      console.log(e)
    }
  };

  render() {
    const { transactionModalVisible, cameraModalVisible, cameraMode } = this.state;
    return (
      <View style={{flex: 1}}>
        {cameraMode === false ? <View style={styles.container}>
          <View style={{
            width: '100%', padding: 20, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'
          }}>
            <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: '#EAEDEF', alignItems: 'center', justifyContent: 'center'}} onPress={this.toggleModal}>
              <Image source={require('../Assets/avatar.png')} style={{ resizeMode: 'contain', width: 17, height: 17 }}/>
            </TouchableOpacity>

          </View>
          <ScrollView style={{flex: 1, width: '100%', paddingLeft: 10, backgroundColor: 'transparent'}} refreshControl={
            <RefreshControl
              refreshing={this.state.fetching}
              onRefresh={this._refresh}
            />
          }>
            <Text style={{fontWeight: '600', fontSize: 25, marginLeft: 8}}>Tokens</Text>
            <TouchableWithoutFeedback onPress={this.sendEther}>
              <Animated.View  style={{...styles.tokenBox, transform: [
                  {
                    scale: this.state.animatePress
                  }
                ]}}>
                <View style={styles.tokenContainer}>
                  <Image source={require('../Assets/ethereum.png')} style={styles.tokenImage}/>
                </View>

                <View style={{alignItems: 'flex-start', justifyContent: 'space-around'}}>
                  <Text>Ethereum</Text>
                  <Text>{parseFloat(this.state.ethBalance).toFixed(4)} ETH</Text>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
            {this.state.tokens && this.state.tokens.map((token, i) => {
              const {tokenInfo} = token;
              if (tokenInfo.name === "") return;
              return (
                <Token onPress={() => this.openTokenModal(tokenInfo, token)} key={i} iterator={i} tokenInfo={tokenInfo} token={token}/>
              )
            })}
            {/*<Text style={{fontWeight: '600', fontSize: 25, marginLeft: 8, marginBottom: 10, marginTop: 10}}>Unique Tokens</Text>*/}
            {/*<View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', width: width - 50, justifyContent: 'flex-start'}}>*/}
              {/*{this.state.nfts.length > 0 ? this.state.nfts.map((nft, i) => {*/}
                {/*if (nft.collection) {*/}
                  {/*return (*/}
                    {/*<NFT iterator={i} key={i} nft={nft}/>*/}
                  {/*)*/}
                {/*}*/}
              {/*}) : <View style={{width: '100%', marginLeft: 15, alignItems: 'flex-start', justifyContent: 'center'}}>*/}
                {/*<View onPress={this.closeCallback} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>*/}
                  {/*<View style={{...styles.nftContainer, backgroundColor: '#d9d9d9'}}>*/}
                    {/*<View style={{width: 100, height: 100, backgroundColor: 'transparent'}}>*/}
                      {/*<Text>No Unique Tokens</Text>*/}
                    {/*</View>*/}
                  {/*</View>*/}
                  {/*<View style={{width: 140, backgroundColor: 'transparent', padding: 5}}>*/}
                    {/*<View style={{marginBottom: 3, height: 15, width: '100%', borderRadius: 7,  backgroundColor: '#e0e0e0' }}/>*/}
                    {/*<View style={{ height: 14, width: '100%', borderRadius: 7, backgroundColor: '#eaeaea'}}/>*/}
                  {/*</View>*/}
                {/*</View>*/}
              {/*</View>*/}
              {/*}*/}
            {/*</View>*/}
          </ScrollView>
          {/*      ---------       Transaction Modal         ---------------           */}
          <Modal
            isVisible={this.state.tokenModalVisible}
            onBackdropPress={this.closeTokenModal}
            style={styles.modal}
          >
            <View style={{width: '100%', backgroundColor: 'white', padding: 5, borderRadius: 25, alignItems: 'center', justifyContent: 'center'}}>
              <Token tokenInfo={this.state.tokenInfo} token={this.state.token} />
            </View>
            <View style={{height: 100, width: '100%'}}>
              <ScrollView horizontal>
                {AppRegistry.map((app, i) => {
                  return (<AppIcon key={i} appName={app.appName} backgroundColor={app.backgroundColor} homeRoute={app.homeRoute} icon={app.icon} iterator={i} />)
                })
                }
              </ScrollView>
            </View>
            <View style={{width: '100%', backgroundColor: 'white', padding: 5, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{width: '100%', height: 50, marginBottom: 10, backgroundColor: 'rgba(0,0,0,0.1)', padding: 5, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => this.setState({cameraMode: true})}>
                  <Image source={require('../Assets/cam-icon-black.png')} style={{width: 30, resizeMode: 'contain', marginRight: 5}}/>
                </TouchableOpacity>
                <TextInput autoCorrect={false} autoCapitalize={'none'} style={{flex: 1, paddingRight: 5}} placeholder="Enter address or ENS" onChangeText={this.resolveAddress} value={this.state.inputAddress}/>
                {this.renderVerification()}
              </View>
              <View style={{width: '100%', height: 50, backgroundColor: 'rgba(0,0,0,0.1)', padding: 5, paddingLeft: 10, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <TextInput keyboardType={'numeric'} autoCorrect={false} autoCapitalize={'none'} style={{flex: 1, paddingRight: 5, color: this.state.amountColor}} placeholder="Enter amount to send" onChangeText={this.setTokenAmount} value={this.state.amount.toString()}/>
                <TouchableOpacity style={{backgroundColor: '#26a1ff', padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 12}} onPress={() => this.setState({amount: this.state.tokenAmount})}>
                  <Text style={{color: 'white', fontSize: 14, fontWeight: '700'}}>Max</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '100%', height: 50, padding: 5, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Text numberOfLines={1} style={{color: 'grey', fontSize: 14, fontWeight: '700'}}>Price: {this.state.tokenInfo.price ? (this.state.amount * this.state.tokenInfo.price.rate).toFixed(2) : 0.00} USD</Text>
              </View>
              <View style={{width: '100%', height: 50, padding: 5, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={{backgroundColor: '#333333', padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 12}}>
                  <Text onPress={() => this.state.canSend && this.state.addressStatus === 'valid' &&  Wallet.sendToken({tokenAddress: this.state.tokenInfo.address ,to: this.state.walletAddress, value: this.state.amount })} style={{color: 'white', fontSize: 14, fontWeight: '700'}}>SEND</Text>
                </TouchableOpacity>
              </View>
            </View>

          </Modal>
          {/*      ---------       Transaction Modal         ---------------           */}
          <Modal
            isVisible={this.state.profileModalVisible}
            onBackdropPress={this.toggleModal}
            style={styles.modal}
          >
            <View style={styles.modalBox}>
              <View style={{margin: 20}}>
                <QRCode
                  size={200}
                  value={`${this.state.address}`}
                />
              </View>
              <TouchableOpacity onPress={() => this.setState({revealAddress: !this.state.revealAddress})}>
                {!this.state.revealAddress ? <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: '#b2c1c1', marginRight: 5}}>{this.state.addressStart}</Text>
                  <View style={{ flex:1, flexDirection: 'row', height: 20, borderRadius:  5}}>
                    {this.state.addressArray.map((hex, i) => {
                      return (<View key={i} style={{backgroundColor: '#' + hex, flex: 1, borderTopLeftRadius: i === 0 ? 5 : 0, borderBottomLeftRadius: i === 0 ? 5 : 0, borderTopRightRadius: i === 4  ? 5 : 0, borderBottomRightRadius: i === 4 ? 5 : 0, }}/>)
                    })}
                  </View>
                  <Text style={{color: '#b2c1c1', marginLeft: 5}}>{this.state.addressEnd}</Text>
                </View> : <Text style={{color: 'black'}}>{this.state.address}</Text>}
              </TouchableOpacity>


            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity onPress={this.copyAddress} style={{ ...styles.buttons, marginRight: 7, borderTopRightRadius: 7, borderTopLeftRadius: 20, borderBottomRightRadius: 7, borderBottomLeftRadius: 20 }}>
                <Image style={{width: 20, resizeMode: 'contain'}} source={require('../Assets/copy.png')}/>
                <Text style={{fontSize: 17, fontWeight: '700', color: 'white'}}>Copy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.buttons, borderTopRightRadius: 20, borderTopLeftRadius: 7, borderBottomRightRadius: 20, borderBottomLeftRadius: 7 }}>
                <Image style={{width: 20, resizeMode: 'contain'}} source={require('../Assets/share.png')}/>
                <Text style={{fontSize: 17, fontWeight: '700', color: 'white'}}>Share</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View> : <Camera close={() => this.setState({cameraMode: false})} onBarCodeRead={this._addressScan}/> }
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'transparent'
  },
  buttons: {
    backgroundColor: 'rgba(256,256,256,0.5)',
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBox: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nftContainer: {
    marginBottom: 5,
    borderRadius: 15,
    height: 140,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tokenBox: {
    flexDirection: 'row',
    width: '100%',
    margin: 8,

  },
  tokenContainer: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,

  },
  tokenImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});
