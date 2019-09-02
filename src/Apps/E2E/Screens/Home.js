import React from "react";
import {Text, ScrollView, TouchableOpacity, View, Image, TextInput, StyleSheet} from "react-native";
import {Wallet, Contract, ENS} from "../../../AliceSDK/Web3";
import {E2EABI} from "../ABI";
import {NavigationBar} from "../../../AliceCore/Components/NavigationBar";
import { ethers } from 'ethers';
import { GiftedChat } from 'react-native-gifted-chat'
import Modal from "react-native-modal";
import {AppRegistry} from "../../index";
import Camera from "../../../AliceCore/Components/Camera";

const ROPSTEN = { address: "0xF5D9E79FA73BF0ff34c5EC16Ca4BbC7eee5c69a0", startBlockNumber: '0x36d224' };
const infuraProviderRopsten = new ethers.providers.InfuraProvider('ropsten');
let contracts =  new ethers.Contract(ROPSTEN.address, E2EABI, infuraProviderRopsten);

export default class E2EHome extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Home',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      walletAddress: '',
      addressModalVisible: false,
      cameraMode: false,
      inputAddress: '',
      addressStatus: 'invalid',
      addressChecked: false,
      validAddress: '',
      messageList: [],
      logs: [],
      messages: [],
    };

    this.child = React.createRef();
  }

  async componentDidMount() {
    contracts.on("Message", async(from, to, newValue, event) => {
      this.onReceivedMessage(event);
    });
    this.getLogs();
  }

  onReceivedMessage = async (message) => {

    let timestamp = await this.getBlockData(message.blockHash);

    const messages = [
      {
        _id: message.transactionHash,
        text: ethers.utils.toUtf8String(message.data),
        createdAt: timestamp,
        user: {
          _id: message._sender,
          name: message._sender,
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ];

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))

  };

  getLogs = async () => {
    let logInfo = {
      address: ROPSTEN.address,
      topics: [ '0xb3dbe9e9894ca2c11cb6c80bd0b0bccb9f5b41d612dbeeda0d5474de40b874fe', ethers.utils.hexZeroPad(await Wallet.getAddress(), 32)],
      fromBlock: ROPSTEN.startBlockNumber,
      toBlock: 'latest'
    };

    try {
      const logs = await infuraProviderRopsten.getLogs(logInfo);
      const messageList = this.sortMessageList(logs);
      const messages = await this.sortMessages(logs);
      // messages.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      this.setState({messages});
    } catch (e) {
      console.log('errors: ', e);
    }
  };

  sortMessages =  async (messages) => {

    await Promise.all(messages.map( async (message, i) => {
      try {
        let timestamp = await this.getBlockData(message.blockHash);
        let user = ethers.utils.hexStripZeros(message.topics[2]);
        return {
          _id: message.transactionHash,
          text: ethers.utils.toUtf8String(message.data),
          createdAt: timestamp,
          user: {
            _id: user,
            name: user,
            avatar: 'https://placeimg.com/140/140/any',
          },
        }

      } catch(e) {
        console.log('sort messages error: ', e)
      }
    }));
  };

  sortMessageList = (messages) => {
    let messageList = [];
    messages.map((message, i) => {
      if(messageList.indexOf(ethers.utils.hexStripZeros(message.topics[2])) === -1) {
        messageList.push(ethers.utils.hexStripZeros(message.topics[2]));
      }
    });
    this.setState({messageList});
  }

  // sortMessages =  async (messages) => {
  //
  //     await Promise.all(messages.map( async (message, i) => {
  //       // if(messageList.indexOf(ethers.Utils.hexStripZeros(message.topics[2])) === -1) {
  //       //   messageList.push(ethers.Utils.hexStripZeros(message.topics[2]));
  //       // }
  //       // return messageList;
  //       //
  //       try {
  //         let timestamp = await this.getBlockData(message.blockHash);
  //         let user = ethers.Utils.hexStripZeros(message.topics[2]);
  //         let newObj = {};
  //         newObj["_id"] = message.transactionHash;
  //         newObj["text"] = ethers.Utils.toUtf8String(message.data);
  //         newObj["createdAt"] = timestamp;
  //         newObj["user"] = {};
  //         newObj["user"]["_id"] = user;
  //         newObj["user"]["name"] = user;
  //         newObj["user"]["avatar"] = this.state.gravatarURL;
  //         return newObj;
  //
  //       } catch(e) {
  //         console.log('sort messages error: ', e)
  //       }
  //     }));
  // };

  getBlockData = async (blockHash) => {
    const {timestamp} = await infuraProviderRopsten.getBlock(blockHash);
    return new Date(timestamp*1000);
  };

  _addressScan = (address) => {
    this.resolveAddress(address.data);
    this.setState({cameraMode: false});
  }

  resolveAddress = async (ensUsername) => {
    if (!ensUsername) {
      this.setState({addressStatus: 'unresolved', inputAddress: ensUsername});
      return;
    }
    this.setState({inputAddress: ensUsername});
    const address = await ENS.resolve(ensUsername);
    console.log('ADDRESS RETURNED FROM ENS: ', address);
    if (address === "0x0000000000000000000000000000000000000000") {
      this.setState({addressStatus: 'invalid', addressChecked: true});
    } else if (ENS.isPublicAddress(address)) {
      console.log('returning verifies', address);
      this.setState({addressStatus: 'valid', addressChecked: true, validAddress: address});
    }
  };


  newChat = async () => {
    this.setState({ addressModalVisible: !this.state.addressModalVisible});
  };

  closeAddressModal = async () => {
    this.setState({ addressModalVisible: !this.state.addressModalVisible});
  };

  startChat = async () => {
    this.setState({ addressModalVisible: !this.state.addressModalVisible, });
    this.props.navigation.navigate('E2EChat', {sender: this.state.validAddress});
  };

  renderVerification = () => {
    if (this.state.addressStatus === 'valid') {
      return <Image style={{resizeMode: 'contain', width: 30, height: 30}} source={require('../../../AliceCore/Assets/green-verify.png')} />
    } else if (this.state.addressStatus === 'invalid') {
      return <Image style={{resizeMode: 'contain', width: 30, height: 30}} source={require('../../../AliceCore/Assets/grey-verify.png')} />
    } else if (this.state.addressStatus === 'unresolved'){
      return <Image style={{resizeMode: 'contain', width: 30, height: 30}} source={require('../../../AliceCore/Assets/grey-verify.png')} />
    }
  };

  render() {
    const { navigation } = this.props;
    console.log('mappable addresses: ', this.state.messages)
    return (
      <View style={{flex: 1}}>
        <NavigationBar/>
        {this.state.cameraMode === false ? <>
            <View style={{height: 100, paddingTop: 50, padding: 20, alignItems: 'flex-start', justifyContent: 'center'}}>
              <Text style={{fontSize: 25, fontWeight: '600'}}>Messages</Text>
            </View>
            <ScrollView>
              {this.state.messageList.map((message, i) => {
                return (
                  <TouchableOpacity key={i} onPress={() => navigation.navigate('E2EChat', {sender: message})} style={{padding: 10, paddingTop: 20, paddingBottom: 20, borderBottomWidth: 1, borderColor: 'grey'}}>
                    <Text>{message}</Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
            <TouchableOpacity onPress={this.newChat} style={{...styles.buttonContainer, position: 'absolute', bottom: 30, right: 12, zIndex: 1000 }}>
              <Image style={{resizeMode: 'contain', width: 17, height: 17}} source={require('../Assets/plus.png')} />
            </TouchableOpacity>
            <Modal
              isVisible={this.state.addressModalVisible}
              onBackdropPress={this.closeAddressModal}
              style={styles.modal}
            >
              <View style={{width: '100%', backgroundColor: 'white', padding: 5, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{width: '100%', height: 50, marginBottom: 10, backgroundColor: 'rgba(0,0,0,0.1)', padding: 5, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <TouchableOpacity onPress={() => this.setState({cameraMode: true})}>
                    <Image source={require('../../../AliceCore/Assets/cam-icon-black.png')} style={{width: 30, resizeMode: 'contain', marginRight: 5}}/>
                  </TouchableOpacity>
                  <TextInput autoCorrect={false} autoCapitalize={'none'} style={{flex: 1, paddingRight: 5}} placeholder="Enter address or ENS" onChangeText={this.resolveAddress} value={this.state.inputAddress}/>
                  {this.renderVerification()}
                </View>
                <View style={{width: '100%', height: 50, padding: 5, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity onPress={this.startChat} style={{backgroundColor: '#333333', padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 12}} >
                    <Text style={{color: 'white', fontSize: 14, fontWeight: '700'}}>SEND</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </Modal>
          </>
          : <Camera close={() => this.setState({cameraMode: false})} onBarCodeRead={this._addressScan}/>}
      </View>
  );
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
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  tokenBox: {
    flexDirection: 'row',
    width: '100%',
    margin: 8,

  },
  buttonContainer: {
    backgroundColor: '#000000',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.4,

  },
  tokenImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});
