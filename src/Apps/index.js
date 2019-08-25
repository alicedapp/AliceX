import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, View, Modal, Dimensions, WebView,
} from 'react-native';
import Icon from '../AliceComponents/IconComponent';
import AppIcon from "../AliceComponents/AppIcon";
import {Settings} from "../AliceSDK/Web3";
import {AppRegistry} from "./AppRegistry";

import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};


const { height, width } = Dimensions.get('window');

type Props = {};
export default class AppsScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon="HomeGrey" size={45}/>,
    };
  };

  state = {
    modalVisible: false,
  };

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
            <Image source={require('../AliceAssets/camera-icon.png')} style={{ resizeMode: 'contain', width: 17, height: 17 }}/>
          </TouchableOpacity>
          <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: '#EAEDEF', alignItems: 'center', justifyContent: 'center'}} onPress={this.openBrowser}>
            <Image source={require('../AliceAssets/browser-icon.png')} style={{ resizeMode: 'contain', width: 17, height: 17 }}/>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.appsContainer}>
            {AppRegistry.map((app, i) => {
              return (<AppIcon key={i} appName={app.appName} backgroundColor={app.backgroundColor} homeRoute={app.homeRoute} icon={app.icon} iterator={i} />)
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
