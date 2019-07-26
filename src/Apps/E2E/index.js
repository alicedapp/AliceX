/*
* This is a boilerplate structure to get you through the process of building your first app with Alice
* We've included all the necessary features for you to build out your entire application using the
* Camera,
* Push Notifications,
* Maps,
* Payments,
*
* And all the navigation necessary for you to build a full feature app.
*
* Please see the documentation for more info on how to build out more features into Alice.
* */
import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Map from './Screens/Map'
import Home from './Screens/Home'
import Camera from './Screens/Camera'
import Chat from './Screens/Chat'
import Icon from "../../AliceComponents/IconComponent";

const E2EHome = createStackNavigator({
    Home: {
      screen: Home,
    },
    E2EChat: {
      screen: Chat,
    },
  },
  {

    headerMode: 'none',
    navigationOptions: {
      tabBarOptions: {
        style: {
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
        },
        showLabel: false,
      },
      tabBarIcon: ({ tintColor }) => <Icon icon={require('./Assets/messages.png')} size={25}/>,
    },
  });

export default createBottomTabNavigator({
  // Your ExampleMaps's Tab Navigator's names are defined here as a default
  E2EHome: E2EHome,
  Maps: Map,
  E2ECamera: Camera
});
