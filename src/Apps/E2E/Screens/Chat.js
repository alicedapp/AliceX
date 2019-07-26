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
      address: '',
      contractInfo: '',
      contractTxHash: '',
      signedMessage: '',
      signedTransaction: '',
      tokenTxHash: '',
      txHash: '',
      balance: '',
      logs: [],
      messages: [],
      recipientAddress: '0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB'
    };

    this.child = React.createRef();
  }

  onSend(messages = []) {
    console.log('msg : ', messages)
    this.sendMessage(this.props.navigation.state.params.sender, messages[0].text)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  sendMessage = async (recipient, message) => {
    try {
      const contractTxHash = await Contract.write({contractAddress: ROPSTEN.address, abi: E2EABI, functionName: 'send', parameters: [recipient, message]})
      console.log('contractTxHash: ', contractTxHash);
      this.setState({contractTxHash})

    } catch(e) {
      console.log(e)
    }
  };

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

  componentWillMount() {
    this.getAddress();
  }

  async componentDidMount() {
    contracts.on("Message", async(from, to, newValue, event) => {
      this.onReceivedMessage(event);
      console.log('EVENT = ', event);
    });
    this.contractRead();
    this.getLogs();
    this.getBlockData()

  }

  getBlockData = async (blockHash) => {
    const {timestamp} = await infuraProviderRopsten.getBlock(blockHash);
    return new Date(timestamp*1000);
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
        let user = ethers.utils.hexStripZeros(message.topics[2]);
        let newObj = {};
        if (user === this.props.navigation.state.params.sender) {
          let timestamp = await this.getBlockData(message.blockHash);
          newObj["_id"] = message.transactionHash;
          newObj["text"] = ethers.utils.toUtf8String(message.data);
          newObj["createdAt"] = timestamp;
          newObj["user"] = {};
          newObj["user"]["_id"] = user;
          newObj["user"]["name"] = user;
          newObj["user"]["avatar"] = this.state.gravatarURL;
        }
        if (!_.isEmpty(newObj)) {
          return newObj;
        }
      } catch(e) {
        console.log('sort messages error: ', e)
      }


    }));
  };

  getAddress = async () => {
    try {

      const address = await Wallet.getAddress();
      let options = {
        address: 'mark@email.com',
        parameters: { "size": "200", "d": "mm" },
        secure: true
      };
      const gravatarURL = await gravatarApi.imageUrl(options);
      console.log('address: ', address);
      this.setState({ address, gravatarURL })
    } catch(e) {
      console.log(e);
    }

  };

  contractRead = async () => {
    try {
      const result = await Contract.read({contractAddress: ROPSTEN.address, abi: E2EABI, functionName: 'balanceOf', parameters: ['0x0eA61087d2e37260c936185B21b10aeA96bE7fd8'], network: 'ropsten' });
      console.log('RESULT: ', result.toString());
      this.setState({contractInfo: JSON.stringify(result.toString())});
    } catch(e) {
      console.log(e)
    }
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
            _id: this.state.address,
          }}
        />
      </View>
    );
  }
}
