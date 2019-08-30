import React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import Button from '../Components/Button'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {Settings, Wallet} from "../../../AliceSDK/Web3";
import env from '../../../../env'
import { SvgUri } from 'react-native-svg';

import {FoodContractABI} from "../../Example/ABI";
import {BasicTournament} from '../ABIs/BasicTournament';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

export default class MapComponent extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
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
    this.props.navigation.navigate('CheezeMap');
  };

  actionPress = (action) => {
    ReactNativeHapticFeedback.trigger("selection", options);
    if (this.state.actionList.length < 3) {
      this.setState({ actionList: [...this.state.actionList, action] })
    }
  };

  fight = async () => {
    this.setState({pressed: !this.state.pressed});
    try {
      const txHash = await Wallet.sendTransactionWithDapplet({to: '0xE115012aA32a46F53b09e0A71CD0afa0658Da55F', value: '0.01'})
      console.log('txHash: ', txHash);
      this.setState({txHash})
    } catch(e) {
      console.log(e);
    }
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
              <View style={{width: width -40, justifyContent: 'space-between', alignItems: 'center'}}>
                {this.state.wizards.map((wizard, i) => {
                  return (
                    <View key={i} style={{flexDirection: 'column'}}>
                      <Image style={{resizeMode: 'contain', height: 100}} source={require('../Assets/mold-wizard-1.png')}/>
                      <Text style={{color: 'white', fontSize: 15, fontFamily: 'Exocet'}}>Affinity {wizard.affinity}</Text>
                      <Text style={{color: 'white', fontSize: 15, fontFamily: 'Exocet'}}>id {wizard.id}</Text>
                      <Text style={{color: 'white', fontSize: 15, fontFamily: 'Exocet'}}>Power {wizard.power}</Text>
                    </View>
                  )
                })}
              </View>
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

