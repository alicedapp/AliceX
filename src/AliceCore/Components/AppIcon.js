import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Settings} from "../../AliceSDK/Web3";

import { navigate } from "../Utils/navigationWrapper";

export default class AppIcon extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
  };

  _navigate = () => {
    if (this.props.browserRoute) {
      Settings.openBrowser(this.props.browserRoute);
    }
    navigate(this.props.homeRoute);
  };

  render() {
    return (
      <View key={this.props.iterator} style={styles.appIcon}>
        <TouchableOpacity style={{...styles.appCircle, backgroundColor: this.props.backgroundColor}} onPress={this._navigate}>
          <Image source={this.props.icon} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
        </TouchableOpacity>
        <Text style={[styles.appText, {color: this.props.darkMode ? 'white' : 'black'}]}>{this.props.appName}</Text>
      </View>
    )
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
  appCircle: {
    alignItems: 'center',
    backgroundColor: '#fff',
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
    fontSize: 10,
    // fontFamily: 'Graphik',
  },
});
