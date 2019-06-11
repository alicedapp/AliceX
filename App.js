import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  NativeModules
} from 'react-native';

export default class TakeAway extends React.Component {
  state = {
    txHash: 'Tx Hash',
  };

  componentDidMount() {
    console.log('hello')
  }

  send = async () => {
//    this.setState({txHash: 'txSent'});
//    alert('sending');
    try { 
      const txHash = await NativeModules.PaymentNativeModule.payment('0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB', '0.07', (e) => { alert(e)} );
      this.setState({txHash});
      } catch(e) {
        alert('Error', e)
      }

  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{marginBottom: 100}}>{this.state.txHash}</Text>
        <TouchableOpacity onPress={this.send} style={{backgroundColor: 'grey', borderRadius: 10, height: 50, width: 200, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}