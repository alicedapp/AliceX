import React from "react";
import {Text, TouchableOpacity, ScrollView, View, Dimensions, TextInput} from "react-native";
import {Wallet, Contract} from "../../../AliceSDK/Web3";
import {MessageContract} from "../ABI";
import { switchcase } from "../../../AliceCore/Utils";
const { height, width } = Dimensions.get('window');
const MessageContractAddress = {
  "Mainnet": "0x9330b5fC61fa17B1CCA51Cb7bc398871321A4BFB",
  "Ropsten": "0x824012FB45C37f905085F0D68E3f060f9b68fcb1",
  "Rinkeby": "0x2f21957c7147c3eE49235903D6471159a16c9ccd",
  "Kovan": "0x066b159eced604C62e05bb0869e9B65D3e271B8E",
  "Goerli": "0x066b159eced604C62e05bb0869e9B65D3e271B8E"
};


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
      network: '',
      signedMessage: '',
      signedTransaction: '',
      signedTransactionObject: '',
      tokenTxHash: '',
      transferHash: '',
      txHash: '',
      balance: '',
      inputValue: '',
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

  getNetwork = async () => {
    try {
      const network = JSON.stringify(await Wallet.getNetwork());
      console.log('network: ', network);
      this.setState({ network })

    } catch(e) {
      console.log(e)
    }
  };



  sendTransaction = async () => {
    try {
      const tokenTxHash = await Wallet.sendTransaction({to: '0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14', value: '0.001', data: '0x0'})
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

  signTransactionReturnObject = async () => {
    try {
      const signedTransactionObject = await Wallet.signTransaction({to: '0xE115012aA32a46F53b09e0A71CD0afa0658Da55F', value: '0.01', data: 'Hello', detailObject: true});
      console.log('signedMessage: ', signedTransactionObject);
      this.setState({signedTransactionObject})
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

  transfer = async () => {
    try {
      const result = await Wallet.transfer({to: '0x56519083C3cfeAE833B93a93c843C993bE1D74EA', value: '0.01'})
      this.setState({transferHash})
    } catch(e) {
      console.log(e)
    }
  };

  contractSend = async () => {
    try {
      const network = await Wallet.getNetwork();
      const contractAddress = switchcase({
        "main": MessageContractAddress.Mainnet,
        "ropsten": MessageContractAddress.Ropsten,
        "rinkeby": MessageContractAddress.Rinkeby,
        "kovan": MessageContractAddress.Kovan,
        "goerli": MessageContractAddress.Goerli,
      })(network.name);
      const contractTxHash = await Contract.write({contractAddress, abi: MessageContract, functionName: 'setMessage', parameters: [this.state.inputValue], value: '0.0', data: '0x0'});
      console.log('contractTxHash: ', contractTxHash);
      this.setState({contractTxHash})

    } catch(e) {
      console.log(e)
    }
  };

  contractRead = async () => {
    try {
      const network = await Wallet.getNetwork();
      const contractAddress = switchcase({
        "main": MessageContractAddress.Mainnet,
        "ropsten": MessageContractAddress.Ropsten,
        "rinkeby": MessageContractAddress.Rinkeby,
        "kovan": MessageContractAddress.Kovan,
        "goerli": MessageContractAddress.Goerli,
      })(network.name);
      console.log('contract address: ', contractAddress);
      const result = await Contract.read({contractAddress, abi: MessageContract, functionName: 'getMessage', parameters: []});
      console.log('RESULT: ', result);
      this.setState({contractInfo: result});

    } catch(e) {
      console.log(e)
    }
  };

  onChangeText = text => this.setState({inputValue: text});


  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
               <ScrollView contentContainerStyle={{width, marginTop:50, alignItems: 'center', justifyContent: 'center', paddingVertical: 100}}>
          <Text>Address: {this.state.address}</Text>
          <TouchableOpacity onPress={this.getAddress} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
            <Text>Get Address</Text>
          </TouchableOpacity>
                 <Text>Crash Test Button</Text>

                 <TouchableOpacity onPress={() => crash()} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
            <Text>Crash Test</Text>
          </TouchableOpacity>
          <Text>Transfer</Text>
          <TouchableOpacity onPress={this.transfer} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
            <Text>Transfer</Text>
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
          <Text>Signed Transaction Object: {this.state.signedTransactionObject}</Text>
          <TouchableOpacity onPress={this.signTransactionReturnObject} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
            <Text>Sign Transaction return Object</Text>
          </TouchableOpacity>
          <Text>Signed Message: {this.state.signedMessage}</Text>
          <TouchableOpacity onPress={this.signMessage} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
            <Text>Sign Message</Text>
          </TouchableOpacity>
          <Text>TransactionHash: {this.state.tokenTxHash}</Text>
          <TouchableOpacity onPress={this.sendToken} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
            <Text>Send Token</Text>
          </TouchableOpacity>
                 <Text>Send to Contract: {this.state.inputValue}</Text>
                 <TextInput onChangeText={text => this.onChangeText(text)}
                            value={this.state.inputValue}
                            style={{borderWidth: 1, borderColor: 'black', width: width / 2 , height: 30, marginBottom: 5}}/>
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
          <Text>Get Network: {this.state.network}</Text>
          <TouchableOpacity onPress={this.getNetwork} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
            <Text>Get Network</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
