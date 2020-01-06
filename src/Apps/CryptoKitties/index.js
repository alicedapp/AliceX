import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './Screens/Home'
import Camera from './Screens/Camera'
import Duel from './Screens/Duel'
import KittySwipe from './Screens/KittySwipe'
import Summon from './Screens/Summon'
import Matches from './Screens/Matches'
import WizardScreen from './Screens/WizardScreen'
import BattleScreen from './Screens/BattleScreen'
import FinalScreen from './Screens/FinalScreen'
import OnlineWizards from './Screens/OnlineWizards'

const App = createStackNavigator({
  "CryptoKitties/KittySwipe": KittySwipe,
  "CryptoKitties/Matches": Matches,
  "CryptoKitties": Home,
  "CryptoKitties/Duel": Duel,
  "CryptoKitties/Camera": Camera,
  "CryptoKitties/Summon": Summon,
  "CryptoKitties/WizardScreen": WizardScreen,
  "CryptoKitties/OnlineWizards": OnlineWizards,
  "CryptoKitties/BattleScreen": BattleScreen,
  "CryptoKitties/FinalScreen": FinalScreen,
});

App.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};


export default createAppContainer(App)
