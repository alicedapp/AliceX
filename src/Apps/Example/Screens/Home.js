import React from "react";
import {Image, Text, NativeModules, TouchableOpacity, View} from "react-native";
import {Wallet, Contract} from "../../../AliceSDK/Web3";
import Modalize from '../Components/Modalize'
import {FoodContractABI} from "../ABI";
import {NavigationBar} from "../../../AliceComponents/NavigationBar";

export default class ExampleHome extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
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
      balance: ''
    };

    this.child = React.createRef();

  }

  componentDidMount() {

  }

  onClick = () => {
    this.child.current.openModal();
  };

  getAddress = async () => {
    try {
      const address = await Wallet.getAddress();
      this.setState({ address })
    } catch(e) {
      console.log(e);
    }

  };

  getBalance = async () => {
    Wallet.getAddress((address) => {
      this.setState({address}, async () => {
        const balance = await Wallet.getBalance(this.state.address);
        this.setState({balance})
      });
      console.log('ADDRESS: ', address);
    })


  };

  sendTransaction = () => {
    Wallet.sendTransaction({to: '0xE115012aA32a46F53b09e0A71CD0afa0658Da55F', value: '0.01'}, (txHash) => {
      console.log('txHash: ', txHash)
      this.setState({txHash})
    })
  };

  signTransaction = () => {

  };

  signMessage = () => {
    Wallet.signMessage('Hello World', (signedMessage) => {
      console.log('signedMessage: ', signedMessage)
      this.setState({signedMessage})
    })
  };

  sendToken = () => {

  };

  contractSend = () => {
    Contract.write({contractAddress: '0x68F7202dcb25360FA6042F6739B7F6526AfcA66E', abi: FoodContractABI, functionName: 'setOrder', parameters: ['Mark', 'HotDog'], value: '0.001', data: ''}, (contractTxHash) => {
      this.setState({contractTxHash})
    })
  };

  contractRead = async () => {
    const result = await Contract.read({contractAddress: '0x68F7202dcb25360FA6042F6739B7F6526AfcA66E', abi: FoodContractABI, functionName: 'getOrder', parameters: [] });
    console.log('RESULT: ', result);
    this.setState({contractInfo: result});
  };


  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <NavigationBar/>
        <Text>Address: {this.state.address}</Text>
        <TouchableOpacity onPress={this.getAddress} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
          <Text>Get Address</Text>
        </TouchableOpacity>
        <Text>TransactionHash: {this.state.txHash}</Text>
        <TouchableOpacity onPress={this.sendTransaction} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
          <Text>Send Transaction</Text>
        </TouchableOpacity>
        <Text>Signed Transaction: {this.state.signedTransaction}</Text>
        <TouchableOpacity onPress={this.signTransaction} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
          <Text>Sign Transaction</Text>
        </TouchableOpacity>
        <Text>Signed Message: {this.state.signedMessage}</Text>
        <TouchableOpacity onPress={this.signMessage} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
          <Text>Sign Message</Text>
        </TouchableOpacity>
        <Text>TransactionHash: {this.state.tokenTxHash}</Text>
        <TouchableOpacity onPress={this.sendToken} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
          <Text>Send Token</Text>
        </TouchableOpacity>
        <Text>TransactionHash: {this.state.contractTxHash}</Text>
        <TouchableOpacity onPress={this.contractSend} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
          <Text>Send To Contract</Text>
        </TouchableOpacity>
        <Text>Result: {this.state.contractInfo}</Text>
        <TouchableOpacity onPress={this.contractRead} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
          <Text>Read From Contract</Text>
        </TouchableOpacity>
        <Text>Render Modal</Text>
        <TouchableOpacity onPress={this.onClick} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
          <Text>Pop Up</Text>
        </TouchableOpacity>
        <Text>Get Balance: {this.state.balance}</Text>
        <TouchableOpacity onPress={this.getBalance} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
          <Text>Get Balance</Text>
        </TouchableOpacity>
        <Modalize ref={this.child}>

        </Modalize>
      </View>
    );
  }
}
