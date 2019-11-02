import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  View,
  Dimensions, Text
} from "react-native";
import AppIcon from "../Components/AppIcon";
import { Settings, Wallet } from "../../AliceSDK/Web3";
import {AppRegistry} from "../../Apps/AppRegistry";

import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Button from "../../Apps/CheezeWizards/Components/Button";


const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

// var sdk = require("matrix-js-sdk");
// var client = sdk.createClient({
//   baseUrl: "https://matrix.org",
//   accessToken: "",
//   userId: "@markpereir:matrix.org"
// });
// client.publicRooms(function(err, data) {
//   console.log("Public Rooms: %s", JSON.stringify(data));
//   var content = {
//     "body": "Test message from React Native app 🎉",
//     "msgtype": "m.text"
//   };
//   // client.sendEvent("!QtykxKocfZaZOUrTwp:matrix.org", "m.room.message", content, "", (err, res) => {
//   //   console.log(err);
//   //   console.log('SMOETHING HAPPENED: ', res)
//   // });
// });

//!QtykxKocfZaZOUrTwp:matrix.org

type Props = {};
export default class AppsScreen extends Component<Props> {
  state = {
    modalVisible: false,
    darkMode: false
  };

  async componentDidMount() {
    const aliceEventEmitter = Wallet.aliceEvent()
    aliceEventEmitter.addListener(
      "aliceEvent",
      (event) => {
        if (event.isDarkMode === false || event.isDarkMode === true) {
          console.log('DARK MODE: ', event, event.isDarkMode);
          this.setState({ darkMode: event.isDarkMode});
        }
      });
        // Settings.openBrowser('twitter.com')
    // await client.startClient({initialSyncLimit: 10});
    // client.once('sync', function(state, prevState, res) {
    //   if(state === 'PREPARED') {
    //     console.log("prepared");
    //     this.sendMessage()
    //   } else {
    //     console.log('STATE: ', state);
    //     process.exit(1);
    //   }
    // });
  }

  sendMessage = async () => {
    // var content = {
    //   "body": "Test message from React Native app 🎉",
    //   "msgtype": "m.text"
    // };
    // client.sendEvent("!QtykxKocfZaZOUrTwp:matrix.org", "m.room.message", content, "", (err, res) => {
    //   console.log(err);
    //   console.log('SOMETHING HAPPENED: ', res)
    // });
  };

  openBrowser = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options);
    Settings.openBrowser()
  };

  openSettings = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options);
    Settings.settingsPopUp()
  };

  qrScanner = async () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    try {
      const scannedCode = await Settings.qrScanner();
      console.log('scannedCode: ', scannedCode);
    } catch(e) {
      console.log(e)
    }
  };

  render() {
    console.log('darkmode state: ', this.state.darkMode)
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{backgroundColor: 'black', flex: 1}}>
          <View style={{flexDirection: 'row', width: '100%', position: 'absolute', top: 44, paddingHorizontal: 20, zIndex: 9999, flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity style={{width: 40, height: 40, borderRadius: 17, backgroundColor: 'rgba(255,255,255, 0.2)', alignItems: 'center', justifyContent: 'center'}} onPress={this.qrScanner}>
              <Image source={require('../Assets/camera-icon.png')} style={{ resizeMode: 'contain', tintColor: 'rgba(255,255,255, 0.8)', width: 22, height: 30 }}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{width: 40, marginRight: 10, height: 40, borderRadius: 17, backgroundColor: 'rgba(255,255,255, 0.2)', alignItems: 'center', justifyContent: 'center'}} onPress={this.openBrowser}>
                <Image source={require('../Assets/browser-icon.png')} style={{ resizeMode: 'contain', tintColor: 'rgba(255,255,255, 0.8)', width: 22, height: 30 }}/>
              </TouchableOpacity>
              <TouchableOpacity style={{width: 40, height: 40, borderRadius: 17, backgroundColor: 'rgba(255,255,255, 0.2)', alignItems: 'center', justifyContent: 'center'}} onPress={this.openSettings}>
                <Image source={require('../Assets/settings-gear.png')} style={{ resizeMode: 'contain', tintColor: 'rgba(255,255,255, 0.6)', width: 22, height: 30 }}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.container, {backgroundColor: this.state.darkMode ? 'rgba(255,255,255, 0.15)' : 'white',}]}>
            <View style={styles.appsContainer}>
              {AppRegistry.map((app, i) => {
                return (<AppIcon darkMode={this.state.darkMode} key={i} appName={app.appName} backgroundColor={app.backgroundColor} homeRoute={app.homeRoute} browserRoute={app.browserRoute} icon={app.icon} iterator={i} />)
              })
              }
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  appIcon: {
    alignItems: 'center',
    height: 84,
    margin: 10,
    maxWidth: 84,
    justifyContent: 'space-between',
  },
  appsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  appSquare: {
    alignItems: 'center',
    backgroundColor: '#43fd9c',
    borderRadius: 32.5,
    height: 65,
    justifyContent: 'center',
    width: 65,
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  appText: {
    color: 'black',
    fontSize: 10,
    // fontFamily: 'Graphik',
  },
  container: {
    flex: 1,
    marginTop: 100,
    padding: 10,
    borderRadius: 40,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

  },
  headingText: {
    color: 'black',
    fontSize: 20,
    // fontFamily: 'Graphik',
    fontWeight: '500'
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
});
