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

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Redemptions from './Screens/Redemptions'
import Home from './Screens/Home'
import Holders from './Screens/Holders'
import History from './Screens/History'
import DAOstack from './Screens'

const DAOHomePage =  createBottomTabNavigator({
  // Your ExampleMaps's Tab Navigator's names are defined here as a default
  DAOstackHome: Home,
  DAOstackRedemptions: Redemptions,
  DAOstackHolders: Holders,
  DAOstackHistory: History
},
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#3078CA',
        borderTopColor: 'transparent',
      },
      showLabel: false,
    }
  });


export default createStackNavigator({
  DAOstack: DAOstack,
	DAOHomePage: DAOHomePage
})

