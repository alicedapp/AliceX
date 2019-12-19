import axios from 'axios';
import {ethers} from "ethers";
import {db, messaging} from '../../../AliceSDK/Firebase/index';
import Accounts from '../../../AliceSDK/Firebase/Accounts'
import KittiesService from '../Services/Firebase/CryptoKitties/KittiesService';

// messaging.usePublicVapidKey(env.messaging.publicVapidKey);

import React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View, RefreshControl, AppState
} from "react-native";
import Button from '../Components/Button'
import WizardCard from '../Components/WizardCard'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { Settings, Wallet, WalletConnect } from "../../../AliceSDK/Web3";
import { initializeAppServices } from '../../../AliceSDK/AppServices';
import FirebaseService from '../Services/Firebase/FirebaseService';
import WizardsService from '../Services/Firebase/WizardsService';

import { isIphoneX } from "react-native-iphone-x-helper";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');



export default class Matches extends React.Component {



  constructor(props) {
    super(props);

    this.state = {
      // loading: false,
      loading: true,
      pressed: false,
      actionList: [],
      wizards: [],
      network: '',
      fetching: false,
      balance: null,
      appState: AppState.currentState,
      appServices: null,
      kitties: null,
      myKitties: null,
      user: null,
      userSelected: null,

    };
  }

  componentDidMount() {
    this.getKitties();
    this.getUser();
    this.getNetwork();
    this.mounted();
    this.getTinderKitties();

    AppState.addEventListener('change', this._handleAppStateChange);
    const aliceEventEmitter = Wallet.aliceEvent();
    aliceEventEmitter.addListener(
      "aliceEvent",
      async (event) => {
        if (event.network) {
          const parsedEvent = JSON.parse(event.network);

          const network = parsedEvent.name;
          const networkColor = parsedEvent.color;
          const appServices = await initializeAppServices();

          this.setState({network, networkColor, appServices});
        }
      }
    );
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log('APPSTATE: ', nextAppState);
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      // online status is true
      console.log('ONLINE CALLED with appstate', this.state.appState, 'and next app state: ', nextAppState)
      this.onlineStatus(this.state.network, true);
    }
    if (this.state.appState.match(/active/) && nextAppState === "inactive" || nextAppState === "background") {
      console.log('OFFLINE CALLED with appstate', this.state.appState, 'and next app state: ', nextAppState);

      //offline status is false
      this.onlineStatus(this.state.network, false);

    }
    this.setState({appState: nextAppState});
  };

  getKitties = async () => {
    try {
      const response = await fetch(`https://api.cryptokitties.co/v2/kitties?offset=0&limit=12&owner_wallet_address=${await Wallet.getAddress()}&parents=false&authenticated=true&include=sale,sire,other&orderBy=id&orderDirection=desc`);
      if (response) {
        const data = await response.json();
        console.log('res', data);
        this.setState({ kitties: data.kitties, loading: false });
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  // twitterLink = () => {
  //   let twitterUrl = `https://twitter.com/intent/tweet?text=${Wallet.getAddress()} Requesting Rinkeby ETH to play CheezeWizards at devcon 🧀🧙‍♂️`;
  //   Linking.openURL(twitterUrl).catch((err) => console.error('An error occurred with twitter link: ', err));
  // };
  //
  // faucetLink = () => {
  //   let faucetUrl = "https://faucet.rinkeby.io/";
  //   Settings.openBrowser("https://faucet.rinkeby.io/");
  //   // Linking.openURL(faucetUrl).catch((err) => console.error('An error occurred with faucet link: ', err));
  // };

  _refresh = () => {
    this.setState({fetching: true})
  };

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

  finishedLoading = async (network, wizards) => {
    FirebaseService.upsertWizards(network, wizards);
    this.setState({loading: false, fetching: false});
  };

  onlineStatus = (network, onlineStatus) => {
    console.log('ONLINE STATUS: ', onlineStatus, network);
    const wizards = this.state.wizards;
    wizards.forEach(wizard => {
      wizard.online = onlineStatus;
    });
    console.log('WIZARDS : ', wizards);
    FirebaseService.upsertWizards(network, wizards);
  };



  render() {
    const { navigation } = this.props;
    console.log('Kitties: ', this.state.kitties);
    const randomColor = [
      '#faf4d1',
      '#cef5d6',
      '#d4e7fe',
      '#dfdff9',
      '#f9e0f3',
      '#fee0e5',
      '#f9e1cb',
      '#eee9e8',
      '#c6eef9',
      '#eee1da',
      '#c6eef9',
    ];
    const breedTime = ['Snappy', 'Swift', 'Prodding', 'Slow'];

    return (
      <View style={{flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'flex-start'}}>
        {this.state.loading === true ? <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
          <Image source={require('../Assets/Kitties-Background.png')} style={{
            width,
            resizeMode: 'contain',
          }}/>
        </View> : <View style={{flex: 1}}>
          <View style={{margin: 20, marginTop: 50, marginBottom: 0, backgroundColor: 'transparent'}}>
            <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10 }}>My Kitties</Text>
          </View>
          <ScrollView style={{
            flex: 1,
          }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', flex: 1, width }}>
              {this.state.kitties.map((kitty, count )=> {
                const randomBreed = Math.floor(Math.random()*4);
                let randomNumber = Math.floor(Math.random() * 11);
                if (count < 5) {
                  return(
                    <TouchableOpacity key={count} onPress={() => navigation.navigate('CryptoKitties/KittySwipe', { kitty, randomNumber, randomBreed, backgroundColor: randomColor[randomNumber], breedTime: breedTime[randomBreed] })} style={styles.kittyContainer}>
                      <View style={{ alignItems: 'center' }}>
                        <View style={{
                          width: 150, height: 150, borderRadius: 20, backgroundColor: randomColor[randomNumber],
                        }}>
                          <Image source={{ uri: kitty.image_url_png }} style={{ resizeMode: 'contain', width: 170, height: 170 }}/>
                        </View>
                        <View style={{width: 150, alignItems: 'flex-start', paddingLeft: 5}}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{
                              color: 'black', fontFamily: 'Avenir-Black', fontSize: 15, fontWeight: 'bold',
                            }}>#</Text>
                            <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 12 }}>{kitty.id}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../Assets/dna.png')} style={{
                              resizeMode: 'contain', width: 12, height: 12, marginRight: 5,
                            }}/>
                            <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 12 }}>Gen {kitty.generation}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../Assets/clock-circular-outline.png')} style={{
                              resizeMode: 'contain', width: 12, height: 12, marginRight: 5,
                            }}/>
                            <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 12 }} numberOfLines={1}>{breedTime[randomBreed]}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          </ScrollView>

        </View> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  kittyContainer: {
    margin: 10,
    maxWidth: 150,
    backgroundColor: 'white',
    shadowColor: '#cecece',
  },
});
