/**
 * @format
 * This is the App Registrar for Alice
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import Apps, {Foam, Fork, Test} from './src/Apps'

import MapboxGL from '@mapbox/react-native-mapbox-gl';
MapboxGL.setAccessToken('pk.eyJ1IjoibWFya3BlcmVpciIsImEiOiJjancwNDg4eWswNzk1NGJ0Z3V5OGtxZWltIn0.gZ7ev6fQETAFa4J9kao10w');

import NavigatorService from './src/utils/navigationWrapper';
import Icon from "./src/Components/IconComponent";


class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Screen 1</Text>
      </View>
    );
  }
}
class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Screen 2</Text>
      </View>
    );
  }
}

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

const AppTabNavigator = createMaterialTopTabNavigator({
  Home: {
    screen: HomeScreen,
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
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon icon="AvatarGrey" color={tintColor} size={40} />
      )
    }
  }
}, {
  initialRouteName: 'Apps',
  order: ['Home', 'Apps', 'Settings'],
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
}, {
  headerMode: 'none',
});

export const AliceMain = createAppContainer(MainApp);

export default class App extends Component {

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
    backgroundColor: '#F5FCFF',
    padding: 20
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

