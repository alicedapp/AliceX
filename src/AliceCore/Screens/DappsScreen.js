import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  View,
  Dimensions,
} from 'react-native';
import AppIcon from "../Components/AppIcon";
import {Settings} from "../../AliceSDK/Web3";
import {AppRegistry} from "../../Apps/AppRegistry";

import ReactNativeHapticFeedback from "react-native-haptic-feedback";


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
  };

  async componentDidMount() {
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
    //   console.log('SMOETHING HAPPENED: ', res)
    // });
  }

  openBrowser = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options);
    Settings.openBrowser()
  };

  qrScanner = async () => {
    try {
      const scannedCode = await Settings.qrScanner();
      console.log('scannedCode: ', scannedCode);
    } catch(e) {
      console.log(e)
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View style={{
            width: '100%', padding: 20, marginTop: 20, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: '#EAEDEF', alignItems: 'center', justifyContent: 'center'}} onPress={this.qrScanner}>
              <Image source={require('../Assets/camera-icon.png')} style={{ resizeMode: 'contain', width: 17, height: 17 }}/>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: '#EAEDEF', alignItems: 'center', justifyContent: 'center'}} onPress={this.openBrowser}>
              <Image source={require('../Assets/browser-icon.png')} style={{ resizeMode: 'contain', width: 17, height: 17 }}/>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.appsContainer}>
              {AppRegistry.map((app, i) => {
                return (<AppIcon key={i} appName={app.appName} backgroundColor={app.backgroundColor} homeRoute={app.homeRoute} browserRoute={app.browserRoute} icon={app.icon} iterator={i} />)
              })
              }
            </View>
          </View>
        </>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 10,
    paddingTop: 10,
    width: width - 20,
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
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
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
