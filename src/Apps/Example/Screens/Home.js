import React from "react";
import {Image, NativeModules, Text, TouchableOpacity, View} from "react-native";
import Modalize from "react-native-modalize";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
  };

  constructor(props) {
    super(props);
    this.state = {
      txHash: 'TX HASH',
    };

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
    NativeModules.PaymentNativeModule.payment('0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB', '0.01', (txHash) => {
      this.setState({txHash})
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <TouchableOpacity onPress={this.onOpen} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
          <Text>Send</Text>
        </TouchableOpacity>
        <Modalize ref={this.modalRef} handlePosition="outside" >

        </Modalize>
      </View>
    );
  }
}
