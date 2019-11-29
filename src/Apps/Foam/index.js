import { createBottomTabNavigator } from 'react-navigation';
import Map from './Screens/Map'
import NewPoi from './Screens/NewPoi';
import FoamMap from './Screens/FoamMap';

import {createStackNavigator, createAppContainer} from 'react-navigation';

const App = createStackNavigator({
  "Foam/Map": Map,
  "Foam/NewPoi": NewPoi,
});

App.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};


export default createAppContainer(App)
