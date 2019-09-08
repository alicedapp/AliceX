/**
 * @format
 * This is the ExampleMaps Registrar for Alice
 */

import React, { Component } from 'react';
import {
  Dimensions,
  Image, View,
} from 'react-native';
import {
  createAppContainer,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation';
import OneSignal from 'react-native-onesignal';
import CodePush from "react-native-code-push";
import MapboxGL from '@react-native-mapbox-gl/maps';

import env from './env.json';
const {AppRegistry, ...MiniDapps} = require('./src/Apps/AppRegistry'); // AppRegistry is required
import {Settings, Wallet} from './src/AliceSDK/Web3'
import Tokens from './src/AliceCore/Screens/Tokens';
import DappsScreen from './src/AliceCore/Screens/DappsScreen';
import Dashboard from './src/AliceCore/Screens/Dashboard';
import Activity from "./src/AliceCore/Screens/Activity";
import NavigatorService, {navigate} from './src/AliceCore/Utils/navigationWrapper';
import {switchcase} from "./src/AliceCore/Utils";
import {challengedPOI} from "./src/Apps/Foam/utils";

const { height, width } = Dimensions.get('window');
MapboxGL.setAccessToken(env.mapbox);
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

const AppTabNavigator = createMaterialTopTabNavigator({
  DappsScreen: {
    screen: DappsScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused }) => (
        focused ? <Image source={require('./src/AliceCore/Assets/dapps-icon-black.png')} style={{resizeMode: 'contain', width: 40}}/>
          : <Image source={require('./src/AliceCore/Assets/dapps-icon-grey.png')} style={{resizeMode: 'contain', width: 40}}/>
      )
    }
  },
  Tokens: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: 'Tokens',
      tabBarIcon: ({ focused }) => (
        focused ? <Image source={require('./src/AliceCore/Assets/tokens-icon-black.png')} style={{resizeMode: 'contain', width: 40}}/>
        : <Image source={require('./src/AliceCore/Assets/tokens-icon-grey.png')} style={{resizeMode: 'contain', width: 40}}/>
      )
    }
  },
  Activity: {
    screen: Activity,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ focused }) => (
        focused ? <Image source={require('./src/AliceCore/Assets/activity-icon-black.png')} style={{resizeMode: 'contain', width: 40}}/>
          : <Image source={require('./src/AliceCore/Assets/activity-icon-grey.png')} style={{resizeMode: 'contain', width: 40}}/>
      )

    }
  }
}, {
  initialRouteName: 'DappsScreen',
  order: ['DappsScreen', 'Tokens', 'Activity'],
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
  DappsScreen: { screen: AppTabNavigator },
  // DappsScreen: { screen: MiniDapps.CheezeWizards },
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
    this.getOrientation();
    this.getNetwork();
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
          this.setState({network: event.network.name, networkColor: event.network.color});
        }
        if (event.orientation) {
          console.log('ROTATION CHANGED: ', event, event.orientation);
          this.setState({ orientation: event.orientation});
        }
      }
    );
  }

  getNetwork = async () => {
    const networkInfo = await Wallet.getNetwork();
    this.setState({network: networkInfo.name, networkColor: networkInfo.color});
  };

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
      <View style={{flex: 1}}>
        {this.state.network !== 'main' && <View style={{ backgroundColor: this.state.networkColor, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignSelf: 'center', position: 'absolute', top:0, width:215, height: 35, zIndex: 9999}}/>}
        <AliceMain
          ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef);
          }}
        >
        </AliceMain>
      </View>
    );
  }
}




export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.ON_NEXT_RESUME,
})(App);
