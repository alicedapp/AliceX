import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './Screens/Home'

const App = createStackNavigator({
  "PoolTogether": Home,
});

App.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

export default createAppContainer(App)
