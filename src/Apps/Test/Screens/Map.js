/**
 * @format
 * This is the App Registrar for Alice
 */

import React, { Component } from 'react';
import {
  Image
} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import { navigate } from "../../../utils/navigationWrapper";
import Icon from "../../../Components/IconComponent";

export default class Map extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Image source={require('../Assets/map.png')} style={{height: 30, width: 30, resizeMode: 'contain'}}/>
    };
  };
  render() {
    return (
      <MapboxGL.MapView styl={{flex: 1}}  />
    );
  }
}
