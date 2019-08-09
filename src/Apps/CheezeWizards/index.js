import { createBottomTabNavigator } from 'react-navigation';
import Home from './Screens/Home'
import CheezeMap from './Screens/CheezeMap'

export default createBottomTabNavigator({
  CheezeWizards: Home,
  CheezeMap: CheezeMap,
});
