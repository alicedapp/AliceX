
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
