import React from "react";
import {Image, Text, NativeModules, TouchableOpacity, View} from "react-native";
import Modalize from "react-native-modalize";
import {getAddress, sendTransaction} from "../../../SDK/Web3";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
  };

  constructor(props) {
    super(props);
    this.state = {
      txHash: 'TX HASH',
      address: '',
    };

  }

  componentDidMount() {

  }

  getAddress = () => {
    getAddress((address) => {
      this.setState({address})
    });
  }

  sendTransaction = () => {
    sendTransaction({to: '0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB', value: '0.01'}, (txHash) => {
      this.setState({txHash})
    })
  }

  signTransaction = () => {

  }

  modalRef = React.createRef();

  onOpen = () => {

    const modal = this.modalRef.current;
    console.log('modal: ', this.modalRef.current);

    if (modal) {
      modal.open();
    }
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
      </View>
    );
  }
}
