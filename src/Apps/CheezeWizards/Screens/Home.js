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
  View, RefreshControl,
} from 'react-native';
import {NavigationBar} from "../../../AliceCore/Components/NavigationBar";
import Button from '../Components/Button'
import WizardCard from '../Components/WizardCard'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { Settings, Wallet, Contract, WalletConnect } from "../../../AliceSDK/Web3";
import env from '../../../../env'

import ABIs from '../ABIs';
import {GateKeeper, BasicTournament} from '../Addresses/index'

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

import {db} from '../../../AliceSDK/Socket'

export default class CheezeWizardsHome extends React.Component {

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
      network: '',
      fetching: false
    };
  }

  componentDidMount() {
    this.fetchWizards();
    this.getUser();
    this.getNetwork();
    const aliceEventEmitter = Wallet.aliceEvent()
    aliceEventEmitter.addListener(
      "aliceEvent",
      (event) => {
        if (event.network) {
          const parsedEvent = JSON.parse(event.network);
          this.setState({network: parsedEvent.name, networkColor: parsedEvent.color}, this.fetchWizards);
        }
      }
    );
  }

  _refresh = () => {
    this.setState({fetching: true})
    this.fetchWizards();
  }

  getNetwork = async () => {
    const networkInfo = await Wallet.getNetwork();
    this.setState({ network: networkInfo.name });
  };

  getUser = async () => {
    try {
      db.collection("users")
        .onSnapshot((snapshot) => {
          let orders = [];
          console.log('USERS: ', snapshot);
          snapshot.forEach((doc) => {
            console.log('user: ', doc.id)
          });
        });
    } catch(e) {
      console.log('FIREBASE ERROR HOME : ', e)
    }
  };

  animate = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.setState({pressed: !this.state.pressed});
  };

  fetchWizards = async () => {
    // const finishedLoading = () => setTimeout(() => this.setState({loading: false, fetching: false}), 1000);
    const finishedLoading = () => this.setState({loading: false, fetching: false});
    let data = null;
    var xhr = new XMLHttpRequest();
    const onData = async (data) => {
      if (data.assets.length > 0) {
        const getWizard = async id => {
          const wizard = await Contract.read({contractAddress: BasicTournament.rinkeby, abi: ABIs.BasicTournament, functionName: 'getWizard', parameters: [id], network: 'rinkeby'});
          Object.keys(wizard).forEach(function(key){ if (typeof wizard[key] === "object") {
            console.log('WIZARD KEY: ', wizard[key]);
            console.log('PARSED WIZARD KEY: ', parseInt(wizard[key]._hex));
            wizard[key] = parseInt(wizard[key]._hex)
          }});
          return wizard;
        };
        const getData = async () => {
          return await Promise.all(data.assets.map(async wizard => {
            let object = await getWizard(wizard.token_id);
            object.id = wizard.token_id;
            return object;
          }))
        };
        const wizards = await getData();
        console.log('WIZARDS FROM HOME REQUEST: ', wizards);
        this.setState({wizards}, finishedLoading);
      } else {
        this.setState({wizards: []});
      }
    };
    xhr.addEventListener("readystatechange",  function()  {
      if (this.readyState === this.DONE) {
        if (this.responseText){
          onData(JSON.parse(this.responseText));
        }
      }
    });
    // if (this.state.network === 'Rinkeby') {
      xhr.open("GET", "https://rinkeby-api.opensea.io/api/v1/assets?owner="+await Wallet.getAddress()+"&asset_contract_addresses=0x51b08285adbd35225444b56c1888c49a6bb2f664");
    // } else {
    //   xhr.open("GET", "https://api.opensea.io/api/v1/assets?owner="+await Wallet.getAddress()+"&asset_contract_addresses=0x2F4Bdafb22bd92AA7b7552d270376dE8eDccbc1E");
    // }
    xhr.setRequestHeader("x-api-key", env.opensea);
    xhr.send(data);
  };

  openMap = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.props.navigation.navigate('CheezeWizards/Map');
  };

  enterDuelMode = wizard => {
    console.log('WIZARD DATA ENTERING DUEL: ', wizard);
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
              {/*<TouchableOpacity onPress={() => WalletConnect.createConnection()} style={{backgroundColor: 'white', padding: 20}}><Text>WalletConnect</Text></TouchableOpacity>*/}
              {/*<TouchableOpacity onPress={() => WalletConnect.sendDataObject({"bob": "trap"})} style={{backgroundColor: 'white', padding: 20}}><Text>SendDataObject</Text></TouchableOpacity>*/}
              <ScrollView contentContainerStyle={{width: width -40, justifyContent: 'space-between', alignItems: 'center', paddingTop: 150}} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl
                  refreshing={this.state.fetching}
                  onRefresh={this._refresh}
                />}
              >
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

