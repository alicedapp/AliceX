import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './Screens/Home'
import Camera from './Screens/Camera'
import CompetitorSearch from './Screens/CompetitorSearch'
import Duel from './Screens/Duel'
import CheezeMap from './Screens/CheezeMap'
import WizardScreen from './Screens/WizardScreen'

const App = createStackNavigator({
  CheezeWizards: Home,
  "CheezeWizards/Duel": Duel,
  CheezeMap: CheezeMap,
  "CheezeWizards/Camera": Camera,
  "CheezeWizards/WizardScreen": WizardScreen,
});

App.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};


export default createAppContainer(App)
