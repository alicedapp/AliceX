import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {Wallet, Contract} from "../../../AliceSDK/Web3";
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

  getAddress = async () => {
    try {
      const address = await Wallet.getAddress();
      console.log('address: ', address);
      this.setState({ address })
    } catch(e) {
      console.log(e);
    }

  };

  getBalance = async () => {
    try {
      const balance = await Wallet.getBalance();
      console.log('balance: ', balance);
      this.setState({ balance })

    } catch(e) {
      console.log(e)
    }


  };

  sendTransaction = async () => {
    try {
      const tokenTxHash = await Wallet.sendTransaction({to: '0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14', value: '0.001', data: '0xf39b5b9b000000000000000000000000000000000000000000000000030f99456eb540f8000000000000000000000000000000000000000000000000000000005d356fb1'})
      console.log('tokenTxHash: ', tokenTxHash);
      this.setState({tokenTxHash})
    } catch(e) {
      console.log(e);
    }
  };

  openDapplet = async () => {
    try {
      const txHash = await Wallet.sendTransactionWithDapplet({to: '0xE115012aA32a46F53b09e0A71CD0afa0658Da55F', value: '0.01'})
      console.log('txHash: ', txHash);
      this.setState({txHash})
    } catch(e) {
      console.log(e);
    }
  };

  signTransaction = async () => {
    try {
      const signedTransaction = await Wallet.signTransaction({to: '0xE115012aA32a46F53b09e0A71CD0afa0658Da55F', value: '0.01', data: 'Hello'});
      console.log('signedMessage: ', signedTransaction);
      this.setState({signedTransaction})
    } catch(e) {
      console.log(e);
    }
  };

  signMessage = async () => {
    try {
      const signedMessage = await Wallet.signMessage('Hello World');
      console.log('signedMessage: ', signedMessage);
      this.setState({signedMessage})
    } catch(e) {
      console.log(e)
    }

  };

  sendToken = async () => {
    try {
      const tokenHash = await Wallet.sendToken({tokenAddress: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359', to: '0x56519083C3cfeAE833B93a93c843C993bE1D74EA', value: '1.0', data:"0x0"})
      console.log('txHash: ', tokenHash);
      this.setState({tokenHash})

    } catch(e) {
      console.log(e)
    }
  };

  contractSend = async () => {
    try {
      const contractTxHash = await Contract.write({contractAddress: '0x68F7202dcb25360FA6042F6739B7F6526AfcA66E', abi: FoodContractABI, functionName: 'setOrder', parameters: ['Mark', 'HotDog'], value: '0.0', data: '0x0'})
      console.log('contractTxHash: ', contractTxHash);
      this.setState({contractTxHash})

    } catch(e) {
      console.log(e)
    }
  };

  contractRead = async () => {
    try {
      const result = await Contract.read({contractAddress: '0x68F7202dcb25360FA6042F6739B7F6526AfcA66E', abi: FoodContractABI, functionName: 'getOrder', parameters: [] });
      console.log('RESULT: ', result);
      this.setState({contractInfo: result});

    } catch(e) {
      console.log(e)
    }
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
        <Text>TransactionHash: {this.state.txHash}</Text>
        <TouchableOpacity onPress={this.openDapplet} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
          <Text>Send Transaction with Dapplet</Text>
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
        <Text>Get Balance: {this.state.balance}</Text>
        <TouchableOpacity onPress={this.getBalance} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
          <Text>Get Balance</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
