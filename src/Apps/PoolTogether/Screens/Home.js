import React from "react";
import { Text, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, View, Dimensions, Image, StyleSheet } from "react-native";
import { Wallet, Contract, Settings } from "../../../AliceSDK/Web3";
import {FoodContractABI} from "../ABI";
import {Modal} from "../../PoolTogether/Components";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
const { height, width } = Dimensions.get('window');
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default class ExampleHome extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      network: '',
      balance: '',
      adModalVisible: true,
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

  toggleModal = () => {
    ReactNativeHapticFeedback.trigger('selection', options);
    this.setState({ adModalVisible: !this.state.adModalVisible });
  };

  openBrowser = () => {
    console.log('pressed');
    Settings.openBrowser("https://knownorigin.io/edition/57100");
  }

  sendToken = async () => {

    try {
      const tokenHash = await Wallet.sendToken({tokenAddress: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359', to: '0x56519083C3cfeAE833B93a93c843C993bE1D74EA', value: '1.0', data:"0x0"})
      console.log('txHash: ', tokenHash);
      this.setState({tokenHash})

    } catch(e) {
      console.log(e)
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#13010F'}}>
        <View style={{margin: 20, padding: 20, width: width - 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(256,256,256,0.2)'}}>
          <Text style={{color: '#F485FB'}}>Next prize estimate:</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 40, marginRight: 5}}>213</Text>
            <Text style={{color: '#F485FB'}}>Dai</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 80}}>
            <View style={{height: 100, width: 20, borderRadius: 10, backgroundColor: '#E851F0',  justifyContent: 'flex-end', marginRight: 20}}>
              <View style={{width: '100%', height: 100/4, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor:'#FDD8F5'}}/>
            </View>
            <View>
              <Text style={{color: '#FDD8F5'}}>prize so far</Text>
              <Text style={{color: '#943a9B'}}>(interest accrued)</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: 'white',}}>55.6256  </Text>
                <Text style={{color: '#F485FB'}}>Dai</Text>
              </View>
            </View>
          </View>
          <Text style={{color: '#a445a3'}}>Prize in: </Text>
          <Text style={{color: '#F485FB', marginBottom: 10}}>5 Days, 6 hours, 25 minutes, 54s</Text>
          <TouchableWithoutFeedback onPress={this.openBrowser}>
            <View style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, borderRadius: 20, borderBottomColor: '#bee3f8', borderBottomWidth: 4, backgroundColor: '#3182ce'}}>
              <Text style={{fontSize: 17, color: 'white', fontWeight: '800'}}>Join the Pool</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 100}}>
          <TouchableOpacity style={{ flex:1, alignItems: 'center', justifyContent: 'center', height: 40, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderBottomColor: '#4299e1', borderBottomWidth: 4, backgroundColor: '#000000'}}>
            <Text style={{fontSize: 15, color: '#63b3ed', fontWeight: '800'}}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: 40, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderBottomColor: '#e9d8fd', borderBottomWidth: 4, backgroundColor: 'rgba(256,256,256,0.2)'}}>
            <Text style={{fontSize: 15, color: '#805ad5', fontWeight: '800'}}>Pool</Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={this.state.adModalVisible}
          backdropOpacity={0.3}
          onBackdropPress={this.toggleModal}
          style={{alignItems: 'center', justifyContent: 'center', margin: 20}}
        >
          <View
            style={{
              width: width - 50,
              backgroundColor: 'white',
              padding: 20,
              alignItems: 'center',
              borderRadius: 20,
            }}
          >
            <TouchableOpacity onPress={this.sendToken} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, borderRadius: 20, borderBottomColor: '#bee3f8', borderBottomWidth: 4, backgroundColor: '#3182ce'}}>
              <Text style={{fontSize: 17, color: 'white', fontWeight: '800'}}>Claim 2 DAI</Text>
            </TouchableOpacity>
            <Text style={{marginVertical: 15}}>OR</Text>
            <TouchableOpacity onPress={this.toggleModal} style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 10,...styles.shadow}} >
              <Text>Claim 5 DAI by viewing this digital artwork</Text>
              <Image style={{width: 200, height: 200, resizeMode: 'contain'}} source={{uri: 'https://knownorigin.imgix.net/https%3A%2F%2Fipfs.infura.io%2Fipfs%2FQmXXvHfH6GVRKGVQ17eSKXUoMW4ykzCSQm6quWckV7i8Bi?auto=format%2Ccompress&q=75&gif-q=90&fit=max&w=1100&h=1100&ixlib=js-1.4.1&s=37bed65772bc79e0c5dd2ee4a52e6153.gif'}} />
              <View style={{flexDirection: 'row', alignItems: 'center' }}>
                <Text>Sponsored by: </Text>
                <Text style={{fontFamily:'Georgia'}}>Know Origin </Text>
                <Image style={{width: 15, resizeMode: 'contain'}} source={require('../Assets/known-origin-logo.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});
