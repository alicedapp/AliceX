import React from "react";
import { View } from "react-native";
import {Wallet, Contract} from "../../../AliceSDK/Web3";
import {E2EABI} from "../ABI";
import {NavigationBar} from "../../../AliceCore/Components/NavigationBar";
import {ethers} from 'ethers';
import { GiftedChat } from 'react-native-gifted-chat'

export default class E2EChat extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Home',
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
