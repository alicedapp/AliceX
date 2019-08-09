import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  YellowBox,
} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

// Styles
import sheet from './styles/sheet';
import colors from './styles/colors';
// Utils
import {IS_ANDROID} from './utils/index';

// screens
import Home from './scenes/Home';
import Demo from './scenes/Demo';

// :(
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

const styles = StyleSheet.create({
  noPermissionsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

MapboxGL.setAccessToken('pk.eyJ1IjoibWFya3BlcmVpciIsImEiOiJjancwNDg4eWswNzk1NGJ0Z3V5OGtxZWltIn0.gZ7ev6fQETAFa4J9kao10w');

const AppStackNavigator = createStackNavigator(
  {
    Home: {screen: Home},
    Demo: {screen: Demo},
  },
  {
    initialRouteName: 'Home',

    navigationOptions: {
      header: null,
    },
  },
);


export default createAppContainer(AppStackNavigator);
