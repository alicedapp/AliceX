/**
 * @format
 * This is the ExampleMaps Registrar for Alice
 */

import React, { Component } from 'react';
import {
  AppState,
  Dimensions,
  Image,
  Linking,
  View,
  SafeAreaView,
} from 'react-native';
import {
  createAppContainer,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation';
import OneSignal from 'react-native-onesignal';
import CodePush from "react-native-code-push";
import MapboxGL from '@react-native-mapbox-gl/maps';
import { isIphoneX } from 'react-native-iphone-x-helper'

import env from './env.json';
const {AppRegistry, ...MiniDapps} = require('./src/Apps/AppRegistry'); // AppRegistry is required
import {Settings, Wallet} from './src/AliceSDK/Web3'
import DappsScreen from './src/AliceCore/Screens/DappsScreen';
import Dashboard from './src/AliceCore/Screens/Dashboard';
import NavigatorService, {navigate} from './src/AliceCore/Utils/navigationWrapper';
import {NavigationBar} from "./src/AliceCore/Components";
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
        focused ? <Image source={require('./src/AliceCore/Assets/dapps-tab-selected.png')} style={{resizeMode: 'contain', width: 42}}/>
          : <Image source={require('./src/AliceCore/Assets/dapps-tab.png')} style={{resizeMode: 'contain', width: 42}}/>
      )
    }
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: 'Dashboard',
      tabBarIcon: ({ focused }) => (
        focused ? <Image source={require('./src/AliceCore/Assets/dashboard-selected.png')} style={{resizeMode: 'contain', width: 42}}/>
        : <Image source={require('./src/AliceCore/Assets/dashboard-tab.png')} style={{resizeMode: 'contain', width: 42}}/>
      )
    }
  }
}, {
  initialRouteName: 'Dashboard',
  order: ['DappsScreen', 'Dashboard',],
  tabBarPosition: 'bottom',
  animationEnabled: true,
  header: {
    style: {
      elevation: 0,
      shadowOpacity: 0,
    }
  },
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
      elevation: 0,
      shadowOpacity: 0,
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
  DappsScreen: { screen: DappsScreen },
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
      networkColor: '',
      darkMode: '',
      walletconnect: '',
      orientation: '',
      deeplink: '',
      currentRoute: 'DappsScreen',
      appState: AppState.currentState,
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
    if (this.props.navigationRoute) {
      navigate(this.props.navigationRoute);
    };
    AppState.addEventListener('change', this._handleAppStateChange);
    const aliceEventEmitter = Wallet.aliceEvent()
    aliceEventEmitter.addListener(
      "aliceEvent",
      (event) => {
        console.log('EVENT TRIGGERED: ', event)
        if (event.address) {
          console.log('WALLET INFO: ', event, event.address);
          this.setState({ wallet: event.address});
        }
        if (event.network) {
          const parsedEvent = JSON.parse(event.network);
          console.log('NETWORK CHANGED: ', parsedEvent);
          this.setState({network: parsedEvent.name, networkColor: parsedEvent.color});
        }
        if (event.orientation) {
          console.log('ROTATION CHANGED: ', event, event.orientation);
          this.setState({ orientation: event.orientation});
        }
        if (event.deeplink) {
          console.log('DEEP LINK: ', event, event.deeplink);
          this.handleOpenURL(event.deeplink);
          this.setState({ deeplink: event.deeplink});
        }
        if (event.walletconnect) {
          console.log('WALLET CONNECT: ', event, event.walletconnect);
          this.setState({ walletconnect: event.walletconnect});
        }
        if (event.isDarkMode) {
          console.log('DARK MODE: ', event, event.isDarkMode);
          this.setState({ darkMode: event.isDarkMode});
        }
      }
    );
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log('APPSTATE: ', nextAppState)
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }

  handleOpenURL(event) {
    const route = event.replace(/.*?:\/\//g, '');
    const {dapp, data} = JSON.parse(decodeURIComponent(route.substring(3)));
    navigate(dapp, {data});
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
    if (openResult.notification.payload.title === "CheezeWizards") {
      navigate('CheezeWizards/WizardScreen', {
        notificationChallenge: {
          affinity: 3,
          ascending: false,
          ascensionOpponent: 0,
          challengeId: "_71eemyysk",
          currentDuel: "0x0000000000000000000000000000000000000000000000000000000000000000",
          id: "6144",
          maxPower: 117022711285813,
          molded: false,
          nonce: 4,
          owner: "0xB45B74aDE7973AD25eC91F64c64aEC07d26F386C",
          power: 56340035804596,
          ready: true,
        },
        wizard: {
          affinity: 1,
          ascending: false,
          ascensionOpponent: 0,
          challengeId: "_m9ol8etji",
          currentDuel: "0x0000000000000000000000000000000000000000000000000000000000000000",
          id: "6090",
          maxPower: 70000000000000,
          molded: false,
          nonce: 2,
          owner: "0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB",
          power: 70000000000000,
          ready: true,
        }
      });
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

  getActiveRouteName = (navigationState) => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return this.getActiveRouteName(route);
    }
    return route.routeName;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.network !== 'main' && <View style={{ backgroundColor: this.state.networkColor, position: 'absolute', width, top:0, height: isIphoneX() ? 32 : 20, zIndex: 1}}/>}
        {this.state.currentRoute !== "DappsScreen" && <NavigationBar/>}
        <AliceMain
          ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef);
          }}
          onNavigationStateChange={(prevState, currentState, action) => {
            const currentRouteName = this.getActiveRouteName(currentState);
            const previousRouteName = this.getActiveRouteName(prevState);
            console.log('CURRENT ROUTE: ', currentRouteName);
            console.log('CURRENT ROUTE: ', previousRouteName);
            console.log('CURRENT ROUTE STATE: ', this.state.currentRoute);
            if (previousRouteName !== currentRouteName) {
              this.setState({ currentRoute: currentRouteName });
              // the line below uses the @react-native-firebase/analytics tracker
              // change the tracker here to use other Mobile analytics SDK.
              // analytics().setCurrentScreen(currentRouteName, currentRouteName);
            }
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
