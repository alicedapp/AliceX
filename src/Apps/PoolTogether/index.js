import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './Screens/Home'
import Test from './Screens/Test'

const App = createStackNavigator({
  "PoolTogether": Test,
  // "PoolTogether": Home,
});

App.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

export default createAppContainer(App)
