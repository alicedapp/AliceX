import React from "react";
import { Text, ScrollView, View} from "react-native";
import {Wallet, Contract} from "../../../AliceSDK/Web3";
import {E2EABI} from "../ABI";
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import {ethers} from 'ethers';
import { GiftedChat } from 'react-native-gifted-chat'
import {FoodContractABI} from "../../Example/ABI";
import Icon from "../../../AliceComponents/IconComponent";
const gravatarApi = require('gravatar-api');
import _ from 'lodash'

const ROPSTEN = { address: "0xF5D9E79FA73BF0ff34c5EC16Ca4BbC7eee5c69a0", startBlockNumber: '0x36d224' };
const infuraProviderRopsten = new ethers.providers.InfuraProvider('ropsten');
let contracts =  new ethers.Contract(ROPSTEN.address, E2EABI, infuraProviderRopsten);

export default class E2EChat extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon icon={require('../Assets/chat.png')} size={30}/>,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      walletAddress: '',
      contractTxHash: '',
      logs: [],
      messages: [],
    };
    this.child = React.createRef();
  }

  async componentWillMount() {
    this.setState({walletAddress: await Wallet.getAddress()})
  }

  async componentDidMount() {
    contracts.on("Message", async(from, to, newValue, event) => {
      this.onReceivedMessage(event);
      console.log('EVENT = ', event);
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
      console.log(logs);
      let messages =  await this.sortMessages(logs);
      console.log('messages: ', messages);
      messages = messages.filter(n => n);
      messages.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      this.setState({messages});
    } catch (e) {
      console.log('errors: ', e);
    }
  };

  sortMessages =  async (messages) => {
    return await Promise.all(messages.map( async (message, i) => {
      try {
        let timestamp = await this.getBlockData(message.blockHash);
        let user = ethers.utils.hexStripZeros(message.topics[2]);
        let receiver = ethers.utils.hexStripZeros(message.topics[1]);
        console.log("USER: ", user);
        console.log("RECEIVER: ", receiver);
        console.log("USER COMPARE: ", this.props.navigation.state.params.sender);
        console.log('is it true? ', user === this.props.navigation.state.params.sender);
        console.log('well then this must be the opposite: ', user === this.state.walletAddress);
        let newObj;
        if (user === this.props.navigation.state.params.sender || user === this.state.walletAddress) {
          newObj = {
            _id: message.transactionHash,
            text: ethers.utils.toUtf8String(message.data),
            createdAt: timestamp,
            user: {
              _id: user === this.props.navigation.state.params.sender ? 1 : 2,
              name: user,
              avatar: 'https://placeimg.com/140/140/any',
            },
          }
        }
        if (newObj) {
          return newObj;
        }
      } catch(e) {
        console.log('sort messages error: ', e)
      }


    }));
  };

  onSend(messages = []) {
    console.log('msg : ', messages);
    this.sendMessage(this.props.navigation.state.params.sender, messages[0].text)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  sendMessage = async (recipient, message) => {
    try {
      const contractTxHash = await Contract.write({contractAddress: ROPSTEN.address, abi: E2EABI, functionName: 'send', parameters: [recipient, message]});
      console.log('contractTxHash: ', contractTxHash);
      this.setState({contractTxHash});
    } catch(e) {
      console.log(e);
    }
  };

  getBlockData = async (blockHash) => {
    const {timestamp} = await infuraProviderRopsten.getBlock(blockHash);
    return new Date(timestamp*1000);
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1}}>
        <NavigationBar/>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.walletAddress,
          }}
        />
      </View>
    );
  }
}
