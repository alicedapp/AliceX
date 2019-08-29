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

import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import Map from './Screens/Map'
import Home from './Screens/Home'
import Cities from "./Screens/Cities";
import City from "./Screens/City";



const App = createStackNavigator({
  CryptoHub: Home,
  Cities,
  City,
  Home,
  CryptoHubMaps: Map,
});

App.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};


export default createAppContainer(App)
