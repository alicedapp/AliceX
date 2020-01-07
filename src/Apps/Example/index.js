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

import { createBottomTabNavigator } from 'react-navigation';
// import Map from './Screens/Map'
import Home from './Screens/Home'
import Camera from './Screens/Camera'

export default createBottomTabNavigator({
	// Your ExampleMaps's Tab Navigator's names are defined here as a default
	Home: Home,
	// Maps: Map,
	Camera: Camera
});
