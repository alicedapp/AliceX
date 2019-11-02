import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './Screens/Home'
import Zaps from './Screens/Zaps'

const App = createStackNavigator({
  "DeFiZap": Home,
  "DeFiZap/Zaps": Zaps,
});

App.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};


export default createAppContainer(App)
