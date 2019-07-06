/**
 * @format
 * This is the ExampleMaps Registrar for Alice
 */

import React, { Component } from 'react';
import {
  NativeModules,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import Apps, {Foam, Fork, Mintbase, Test} from './src/Apps'
import CameraScreen from './src/AliceCore/Screens/Camera';
import Profile from './src/AliceCore/Screens/Profile';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
MapboxGL.setAccessToken('pk.eyJ1IjoibWFya3BlcmVpciIsImEiOiJjancwNDg4eWswNzk1NGJ0Z3V5OGtxZWltIn0.gZ7ev6fQETAFa4J9kao10w');
//TODO: change API key on release to TestFlight

import NavigatorService, {navigate} from './src/AliceUtils/navigationWrapper';
import Icon from "./src/AliceComponents/IconComponent";
import Activity from "./src/AliceCore/Screens/Activity";
import {Wallet} from './src/AliceSDK/Web3'
import OneSignal from 'react-native-onesignal'; // Import package from node modules

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

const AppTabNavigator = createMaterialTopTabNavigator({
  Home: {
    screen: CameraScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon icon="ChatGrey" color={tintColor} size={40} />
      )
    }
  },
  Apps: {
    screen: Apps,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon icon="HomeGrey" color={tintColor} size={40} />
      )
    }
  },
  Settings: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon icon="AvatarGrey" color={tintColor} size={40} />
      )
    }
  },
  Activity: {
    screen: Activity,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({tintColor}) => (
        <Icon icon="ActivityGrey" color={tintColor} size={25}/>
      )
    }
  }
}, {
  initialRouteName: 'Activity',
  order: ['Home', 'Apps', 'Settings', 'Activity'],
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
})

const MainApp = createStackNavigator({
  Apps: { screen: AppTabNavigator },
  Fork: { screen: Fork },
  Foam: { screen: Foam },
  Test: { screen: Test },
  Mintbase: { screen: Mintbase },
}, {
  headerMode: 'none',
});

export const AliceMain = createAppContainer(MainApp);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: ''
    }
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
    navigate('FoamExamples');
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  componentDidMount() {
    this.getAddress();

    const walletChangedEventEmitter = Wallet.walletChangeEvent()
    walletChangedEventEmitter.addListener(
      "walletChangedEvent",
      (walletInfo) => {
        console.log('walletINFO: ', walletInfo, walletInfo.address);
        this.setState({ wallet: walletInfo.address});
      }
    );
  }

  getAddress = async () => {
    try {
      const address = await Wallet.getAddress();
      console.log('ADDRESS: ', address)
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

