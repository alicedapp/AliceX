import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './Screens/Home'
import Camera from './Screens/Camera'
import Duel from './Screens/Duel'
import CheezeMap from './Screens/CheezeMap'
import Summon from './Screens/Summon'
import WizardScreen from './Screens/WizardScreen'

const App = createStackNavigator({
  "CheezeWizards": Home,
  "CheezeWizards/Duel": Duel,
  "CheezeWizards/Map": CheezeMap,
  "CheezeWizards/Camera": Camera,
  "CheezeWizards/Summon": Summon,
  "CheezeWizards/WizardScreen": WizardScreen,
});

App.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};


export default createAppContainer(App)
