import React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NavigationBar} from "../../../AliceCore/Components/NavigationBar";
import Button from '../Components/Button'
import WizardCard from '../Components/WizardCard'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { Settings, Wallet, Contract, WalletConnect } from "../../../AliceSDK/Web3";
import env from '../../../../env'
import { SvgUri } from 'react-native-svg';
import ABIs from '../ABIs';
import {GateKeeper, BasicTournament, ThreeAffinityDuelResolver} from '../Addresses/index'
import {switchcase} from "../Utils";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

import db from '../../../AliceSDK/Socket'

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
      // loading: false,
      loading: true,
      pressed: false,
      actionList: [],
      wizards: [],
      network: ''
    };
  }

  componentDidMount() {
    this.fetchWizards();
    this.getNFTInfo();
    this.getUser();
    this.getNetwork();
    const aliceEventEmitter = Wallet.aliceEvent()
    aliceEventEmitter.addListener(
      "aliceEvent",
      (event) => {
        if (event.network) {
          const parsedEvent = JSON.parse(event.network);
          console.log('NETWORK CHANGED: ', parsedEvent, parsedEvent);
          this.setState({network: parsedEvent.name, networkColor: parsedEvent.color});
          console.log('parsedEvent network: ', parsedEvent.network)
        }
      }
    );
  }

  getNetwork = async () => {
    const networkInfo = await Wallet.getNetwork();
    this.setState({ network: networkInfo.name });
  };

  getUser = async () => {
    db.collection("users")
      .onSnapshot((snapshot) => {
        let orders = [];
        console.log('USERS: ', snapshot);
        snapshot.forEach((doc) => {
          console.log('user: ', doc.id)
        });
      });
    db.collection('users').doc(await Wallet.getAddress()).onSnapshot(snapshot => {
      console.log('snapshot right: ', snapshot.data());
    })
  };

  animate = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.setState({pressed: !this.state.pressed});
  };

  createWizardObject = () => {
    const wizardFormat = {
      affinity: 4,
      createdBlockNumber: 5008913,
      eliminatedBlockNumber: null,
      id: "5982",
      // initialPower: "70364710415359",
      // owner: "0xB45B74aDE7973AD25eC91F64c64aEC07d26F386C",
      power: "70364710415359"
    };

    const wizardFormat2 = {
      affinity: "0x01",
      ascending: false,
      ascensionOpponent: "0x00",
      currentDuel: "0x0000000000000000000000000000000000000000000000000000000000000000",
      maxPower: "0x3faa25226000",
      molded: false,
      nonce: "0x01",
      power: "0x3faa25226000",
      ready: true
    };

    const wizardObject = {

    }

  }

  fetchWizards = async () => {

    const wizardFormat = {
      affinity: 4,
      createdBlockNumber: 5008913,
      eliminatedBlockNumber: null,
      id: "5982",
      // initialPower: "70364710415359",
      // owner: "0xB45B74aDE7973AD25eC91F64c64aEC07d26F386C",
      power: "70364710415359"
    };

    const wizardFormat2 = {
      affinity: "0x01",
      ascending: false,
      ascensionOpponent: "0x00",
      currentDuel: "0x0000000000000000000000000000000000000000000000000000000000000000",
      maxPower: "0x3faa25226000",
      molded: false,
      nonce: "0x01",
      power: "0x3faa25226000",
      ready: true
    };

    let data = null;
    var xhr = new XMLHttpRequest();
    const wizard = await Contract.read({contractAddress: BasicTournament.rinkeby, abi: ABIs.BasicTournament, functionName: 'getWizard', parameters: [6090], network: 'rinkeby'});
    const isvalidMoveSet = await Contract.read({contractAddress: ThreeAffinityDuelResolver.rinkeby, abi: ABIs.ThreeAffinityDuelResolver, functionName: 'isValidMoveSet', parameters: ['0x0203030303000000000000000000000000000000000000000000000000000000'], network: 'rinkeby'});
    console.log('WIZARD: ', wizard);
    console.log('MOVESET: ', isvalidMoveSet);
    const onData = (data) => {
      if (data.wizards) {
        console.log('WIZARDS: ', data.wizards);

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
    xhr.open("GET", "https://rinkeby-api.opensea.io/api/v1/assets?owner="+await Wallet.getAddress()+"&asset_contract_addresses=0x51b08285adbd35225444b56c1888c49a6bb2f664");
    xhr.setRequestHeader("x-api-key", env.opensea);
    xhr.send(data);

  };


  openMap = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.props.navigation.navigate('CheezeWizards/Map');
  };

  enterDuelMode = wizard => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.props.navigation.navigate('CheezeWizards/WizardScreen', {wizard})
  };


  render() {
    const { navigation } = this.props;
    console.log('network: ', this.state.network);

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
          </View> : <View style={{ flex: 1, width, backgroundColor: '#000', alignItems: 'center', }}>
            <Image source={require('../Assets/melting-cheese.png')} style={{
              resizeMode: 'contain',
              height: 250,
              position: 'absolute', top: 0
            }}/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around',}}>
              <View style={{flexDirection: 'row', position: 'absolute', top: 70, zIndex: 9999, flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
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
              <TouchableOpacity onPress={() => WalletConnect.createConnection()} style={{backgroundColor: 'white', padding: 20}}><Text>WalletConnect</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => WalletConnect.sendDataObject({"bob": "trap"})} style={{backgroundColor: 'white', padding: 20}}><Text>SendDataObject</Text></TouchableOpacity>
              <ScrollView contentContainerStyle={{width: width -40, justifyContent: 'space-between', alignItems: 'center', paddingTop: 150}}>
                {this.state.network === 'Rinkeby' && this.state.wizards.length === 0 && <View style={{marginTop: 100}}>
                  <Text style={{color: 'white', fontSize: 20, fontFamily: 'Menlo-Regular'}}>You're seriously lacking some cheeze steeze. Click on the cow's udder to summon yoself a wizard from another gizzard</Text>
                  <Button onPress={() => this.props.navigation.navigate("CheezeWizards/Summon")} style={{width: 40, height: 45, marginBottom: 20}}>
                    <Image source={require('../Assets/udder.png')} style={{
                      resizeMode: 'contain',
                      width: 40,
                      height: 45
                    }}/>
                  </Button>
                </View>}
                {this.state.network !== 'Rinkeby' && <View style={{marginTop: 100}}>
                  <Text style={{color: 'white', fontSize: 20, fontFamily: 'Menlo-Regular'}}>You're on the {this.state.network} Ethereum Network right now, unless you want to drain your wallet of some real cheddar then I suggest you tap on the Settings button, Click on Switch Network, and then tap Rinkeby.</Text>
                  <Button onPress={Settings.settingsPopUp} style={{width: 40, height: 45, marginBottom: 20}}>
                    <Image source={require('../Assets/settings-icon.png')} style={{
                      resizeMode: 'contain',
                      width: 50,
                      height: 50
                    }}/>
                  </Button>
                </View>}
                {this.state.wizards.map((wizard, i) => {
                  return (
                    <TouchableOpacity style={{marginVertical: 10}} key={i} onPress={() => this.enterDuelMode(wizard)}>
                      <WizardCard style={{height: width - 10, width: width-80}} wizard={wizard}/>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
              <Button onPress={() => this.props.navigation.navigate("CheezeWizards/Summon")} style={{flex: 1, position: 'absolute', bottom: 20, right: 5, zIndex: 9999,}}>
                <Image source={require('../Assets/udder.png')} style={{
                  resizeMode: 'contain',
                  width: 40,
                  height: 45
                }}/>
              </Button>
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

