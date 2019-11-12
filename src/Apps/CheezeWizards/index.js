import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './Screens/Home'
import Camera from './Screens/Camera'
import Duel from './Screens/Duel'
import CheezeMap from './Screens/CheezeMap'
import Summon from './Screens/Summon'
import WizardScreen from './Screens/WizardScreen'
import BattleScreen from './Screens/BattleScreen'
import FinalScreen from './Screens/FinalScreen'
import OnlineWizards from './Screens/OnlineWizards'

const App = createStackNavigator({
  "CheezeWizards": Home,
  "CheezeWizards/Duel": Duel,
  "CheezeWizards/Map": CheezeMap,
  "CheezeWizards/Camera": Camera,
  "CheezeWizards/Summon": Summon,
  "CheezeWizards/WizardScreen": WizardScreen,
  "CheezeWizards/OnlineWizards": OnlineWizards,
  "CheezeWizards/BattleScreen": BattleScreen,
  "CheezeWizards/FinalScreen": FinalScreen,
});

App.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};


export default createAppContainer(App)
