/**
 * @format
 * This is the ExampleMaps Registrar for Alice
 */

import React, { Component } from 'react';
import {
  Image,
  NativeModules,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import Apps from './src/Apps'
import {Foam, Fork, Mintbase, Test, DAOstack, E2E} from './src/Apps/AppRegistry'

import CameraScreen from './src/AliceCore/Screens/Camera';
import Tokens from './src/AliceCore/Screens/Tokens';
import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken('pk.eyJ1IjoibWFya3BlcmVpciIsImEiOiJjancwNDg4eWswNzk1NGJ0Z3V5OGtxZWltIn0.gZ7ev6fQETAFa4J9kao10w');
//TODO: change API key on release to TestFlight

import NavigatorService, {navigate} from './src/AliceUtils/navigationWrapper';
import Icon from "./src/AliceComponents/IconComponent";
import Activity from "./src/AliceCore/Screens/Activity";
import {Wallet} from './src/AliceSDK/Web3'
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import CodePush from "react-native-code-push";

const challengedPOI = {
  "name":"Cape Cod National Seashore Visitor Center",
  "stake":"0x0",
  "address":"400 Nauset Road, Eastham, Massachusetts 02642, United States",
  "longitude":-69.97270938009024,
  "latitude":41.8372811190784,
  "description":"National Park Office and National Seashore Museum with trailheads leading to the marshlands of the national seashore.  ",
  "tags":["Government", "Attraction"],
  "phone":"(508) 255-3421",
  "web":"nps.gov",
  "owner":"0x09527e337f3cccc1bd688037a66b8516b319e31d",
  "loading":false
};

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

const AppTabNavigator = createMaterialTopTabNavigator({
  // Home: {
  //   screen: CameraScreen,
  //   navigationOptions: {
  //     tabBarLabel: 'Home',
  //     tabBarIcon: ({ focused }) => (
  //       focused ? <Image source={require('./src/AliceAssets/cam-icon-black.png')} style={{resizeMode: 'contain', width: 40}}/>
  //         : <Image source={require('./src/AliceAssets/cam-icon-grey.png')} style={{resizeMode: 'contain', width: 40}}/>
  //     )
  //   }
  // },
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
  // order: ['Home', 'Apps', 'Tokens', 'Activity'],
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
  E2E: { screen: E2E },
  Fork: { screen: Fork },
  Foam: { screen: Foam },
  DAOstack: { screen: DAOstack },
  Test: { screen: Test },
  Mintbase: { screen: Mintbase },
}, {
  headerMode: 'none',
});

export const AliceMain = createAppContainer(MainApp);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: ''
    };

    OneSignal.init("04726983-9720-41b1-894a-eff5aec84c17");
    //TODO: change API key on release to TestFlight

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure(); 	// triggers the ids event
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
    console.log('Data: ', openResult.notification.payload.title);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  componentDidMount() {
    // navigate('FoamMap', {poi: challengedPOI});

    this.getAddress();

    const walletChangedEventEmitter = Wallet.walletChangeEvent()
    walletChangedEventEmitter.addListener(
      "walletChangedEvent",
      (walletInfo) => {
        console.log('EVENT TRIGGERED: ')
        if (walletInfo.address) {
          console.log('walletINFO: ', walletInfo, walletInfo.address);
          this.setState({ wallet: walletInfo.address});
        }

        if (walletInfo.network) {
          console.log('NETWORK CHANGED: ', walletInfo, walletInfo.network);
          this.setState({ wallet: walletInfo.network});
        }
      }
    );
  }

  getAddress = async () => {
    try {
      const address = await Wallet.getAddress();
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 400,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    height: 140,
    width: 140,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    color: 'white',

  }
});

