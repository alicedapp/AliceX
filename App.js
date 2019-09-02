/**
 * @format
 * This is the ExampleMaps Registrar for Alice
 */

import React, { Component } from 'react';
import {
  Image,
} from 'react-native';

import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import Apps from './src/Apps'
const {...MiniDapps} = require('./src/Apps/AppRegistry');
import Tokens from './src/AliceCore/Screens/Tokens';
import MapboxGL from '@react-native-mapbox-gl/maps';
import env from './env.json';
MapboxGL.setAccessToken(env.mapbox);

import NavigatorService, {navigate} from './src/AliceUtils/navigationWrapper';
import Activity from "./src/AliceCore/Screens/Activity";
import {Settings, Wallet} from './src/AliceSDK/Web3'
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import CodePush from "react-native-code-push";

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

const AppTabNavigator = createMaterialTopTabNavigator({
  Apps: {
    screen: Apps,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused }) => (
        focused ? <Image source={require('./src/AliceAssets/dapps-icon-black.png')} style={{resizeMode: 'contain', width: 40}}/>
          : <Image source={require('./src/AliceAssets/dapps-icon-grey.png')} style={{resizeMode: 'contain', width: 40}}/>
      )
    }
  },
  Tokens: {
    screen: Tokens,
    navigationOptions: {
      tabBarLabel: 'Tokens',
      tabBarIcon: ({ focused }) => (
        focused ? <Image source={require('./src/AliceAssets/tokens-icon-black.png')} style={{resizeMode: 'contain', width: 40}}/>
        : <Image source={require('./src/AliceAssets/tokens-icon-grey.png')} style={{resizeMode: 'contain', width: 40}}/>
      )
    }
  },
  Activity: {
    screen: Activity,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ focused }) => (
        focused ? <Image source={require('./src/AliceAssets/activity-icon-black.png')} style={{resizeMode: 'contain', width: 40}}/>
          : <Image source={require('./src/AliceAssets/activity-icon-grey.png')} style={{resizeMode: 'contain', width: 40}}/>
      )

    }
  }
}, {
  initialRouteName: 'Tokens',
  order: ['Apps', 'Tokens', 'Activity'],
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    showLabel: false,
    backgroundColor: 'white',
    indicatorStyle: {
      backgroundColor: 'transparent',
    },
    labelStyle: {},
    allowFontScaling: true,
    activeTintColor: '#000',
    inactiveTintColor: '#fff',
    style: {
      backgroundColor: 'transparent',
      borderTopWidth: 0,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 40,
    },

    showIcon: true
  },
});

const MainApp = createStackNavigator({
  Apps: { screen: AppTabNavigator },
  // Apps: { screen: MiniDapps.Foam },
  ...MiniDapps,
}, {
  headerMode: 'none',
});

export const AliceMain = createAppContainer(MainApp);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: '',
      network: '',
      rotation: '',
    };

    OneSignal.init(env.onesignal);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure();
  }


  componentDidMount() {
    this.getAddress();
    this.getOrientation();
    const aliceEventEmitter = Wallet.aliceEvent()
    aliceEventEmitter.addListener(
      "aliceEvent",
      (event) => {
        console.log('EVENT TRIGGERED: ')
        if (event.address) {
          console.log('WALLET INFO: ', event, event.address);
          this.setState({ wallet: event.address});
        }
        if (event.network) {
          console.log('NETWORK CHANGED: ', event, event.network);
          this.setState({ network: event.network});
        }
        if (event.orientation) {
          console.log('ROTATION CHANGED: ', event, event.orientation);
          this.setState({ orientation: event.orientation});
        }
      }
    );
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    if (openResult.notification.payload.title === "FOAM") {
      navigate('FoamMap', {poi: challengedPOI});
    }

    if (openResult.notification.payload.title === "E2E") {
      navigate('E2E');
    }
    if (openResult.notification.payload.title === "VotezUp") {
      navigate('BridgeWater');
    }

  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  getOrientation = async () => {
    try {
      console.log('ORIENTATION: ', await Settings.getOrientation());
    } catch(e) {
      console.log(e);
    }

  };

  render() {
    return (
      <AliceMain
        ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}
      />
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.ON_NEXT_RESUME,
})(App);
