import React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NavigationBar} from "../../../AliceCore/Components/NavigationBar";
import Button from '../Components/Button'
import WizardCard from '../Components/WizardCard'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {Settings, Wallet, Contract} from "../../../AliceSDK/Web3";
import env from '../../../../env'
import { SvgUri } from 'react-native-svg';
import ABIs from '../ABIs';
import {GateKeeper} from '../Addresses/index'
import {FoodContractABI} from '../../Example/ABI'
import {switchcase} from "../Utils";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

export default class MapComponent extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null,
      tabBarVisible: false,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      // loading: true,
      pressed: false,
      actionList: [],
      wizards: []
    };

  }

  componentDidMount() {
    this.fetchWizards();
    this.getNFTInfo();
  }

  animate = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.setState({pressed: !this.state.pressed});
  }

  fetchWizards = async () => {
    let data = null;
    var xhr = new XMLHttpRequest();
    const onData = (data) => {
      console.log('WIZARDS:  ', data);
      if (data.wizards) {
        this.setState({wizards: data.wizards});
      }
    };
    xhr.addEventListener("readystatechange",  function()  {
      if (this.readyState === this.DONE) {
        if (this.responseText){
          onData(JSON.parse(this.responseText));
        }
      }
    });
    xhr.open("GET", "https://cheezewizards-rinkeby.alchemyapi.io/wizards?owner="+await Wallet.getAddress());
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.setRequestHeader("x-api-token", env.cheezeWizard);
    xhr.setRequestHeader("x-email","mark@alicedapp.com");


    xhr.send(data);
    setTimeout(() => this.setState({loading: false}), 2000);
  };

  getNFTInfo = async () => {
    let data = null;
    var xhr = new XMLHttpRequest();
    const onData = (data) => {
      console.log('NFT DATA: ', data);
      if (data.assets) {
        this.setState({nftInfo: data, nfts: data.assets});
      }
    };
    xhr.addEventListener("readystatechange",  function()  {
      if (this.readyState === this.DONE) {
        if (this.responseText){
          onData(JSON.parse(this.responseText));
        }
      }
    });
    xhr.open("GET", "https://rinkeby-api.opensea.io/api/v1/assets?owner="+await Wallet.getAddress()+"&asset_contract_addresses=0xd3d2Cc1a89307358DB3e81Ca6894442b2DB36CE8");
    xhr.setRequestHeader("x-api-key", env.opensea);
    xhr.send(data);

  };

  openMap = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.props.navigation.navigate('CheezeMap');
  };

  actionPress = async (_affinity) => {
    ReactNativeHapticFeedback.trigger("selection", options);
    const getAffinity = switchcase({
      "neutral": 1,
      "fire": 2,
      "water": 3,
      "wind": 4,
    });
    const affinity = getAffinity(_affinity);
    console.log('AFFINITY: ', affinity)
    try {
      const txHash = await Contract.write({contractAddress: GateKeeper.rinkeby, abi: ABIs.InauguralGateKeeper.abi, functionName: 'conjureWizard', parameters: [affinity], value: '0.5', data: '0x0'})
      console.log("TX HASH: ", txHash);
    } catch(e) {
      console.log('WIZARD PURCHASE ERROR: ', e);
    }

  };

  enterDuelMode = wizard => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.props.navigation.navigate('CheezeWizards/WizardScreen', {wizard})
  };


  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#fef064', alignItems: 'center', justifyContent: 'flex-start'}}>
        <NavigationBar/>
          {this.state.loading === true ? <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
            <Image source={require('../Assets/landing.png')} style={{
              width,
              resizeMode: 'contain',
            }}/>
          </View> : <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', }}>
            <Image source={require('../Assets/melting-cheese.png')} style={{
              resizeMode: 'contain',
              height: 250
            }}/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around', marginTop: -150, marginBottom: 30}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Button onPress={this.openMap} style={{flex: 1}}>
                  <Image source={require('../Assets/location.png')} style={{
                    resizeMode: 'contain',
                    width: 40,
                    height: 45
                  }}/>
                </Button>
                <View style={{flex: 5, height: 50, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
                  <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>WIZARDS</Text>
                </View>
                <Button onPress={Settings.settingsPopUp} style={{flex: 1}}>
                  <Image source={require('../Assets/settings-icon.png')} style={{
                    resizeMode: 'contain',
                    width: 50,
                    height: 50
                  }}/>
                </Button>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <Button onPress={() => this.actionPress('fire')}>
                  <Image source={require('../Assets/fire-button.png')} style={{
                    resizeMode: 'contain',
                    width: 55,
                    height: 55
                  }}/>
                </Button>
                <Button onPress={() => this.actionPress('water')}>
                  <Image source={require('../Assets/water-button.png')} style={{
                    resizeMode: 'contain',
                    width: 55,
                    height: 55
                  }}/>
                </Button>
                <Button onPress={() => this.actionPress('wind')}>
                  <Image source={require('../Assets/earth-button.png')} style={{
                    resizeMode: 'contain',
                    width: 55,
                    height: 55
                  }}/>
                </Button>
                <Button onPress={() => this.actionPress('neutral')}>
                  <Image source={require('../Assets/neutral-button.png')} style={{
                    resizeMode: 'contain',
                    width: 55,
                    height: 55
                  }}/>
                </Button>
              </View>
              <ScrollView contentContainerStyle={{width: width -40, justifyContent: 'space-between', alignItems: 'center'}}>
                {this.state.wizards.map((wizard, i) => {
                  return (
                    <WizardCard key={i} wizard={wizard} onPress={() => this.enterDuelMode(wizard)}/>
                  )
                })}
              </ScrollView>
            </View>
          </View>}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  sharpShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 0,
    shadowOpacity: 1,

  }
});

