import { createBottomTabNavigator } from 'react-navigation';
import Map from './Screens/Map'
import FoamMap from './Screens/FoamMap'

export default createBottomTabNavigator({
  FoamMap: Map,
  // FoamMap: FoamMap,
});
