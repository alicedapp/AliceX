import React from "react";
import {Image, Text, NativeModules, TouchableOpacity, View} from "react-native";
import {Wallet, Contract} from "../../../AliceSDK/Web3";
import Modalize from '../Components/Modalize'

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
    };

    this.child = React.createRef();

  }

  componentDidMount() {

  }

  onClick = () => {
    this.child.current.openModal();
  };

  getAddress = () => {
    Wallet.getAddress((address) => {
      this.setState({address})
    });
  };

  sendTransaction = () => {
    Wallet.sendTransaction({to: '0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB', value: '0.01'}, (txHash) => {
      this.setState({txHash})
    })
  };

  signTransaction = () => {

  };

  signMessage = () => {

  };

  sendToken = () => {

  };

  contractSend = () => {

  };

  contractRead = () => {

  };

  send = () => {

  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
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
        <Modalize ref={this.child}>

        </Modalize>
      </View>
    );
  }
}
