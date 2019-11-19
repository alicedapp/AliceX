import React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {BasicTournament} from "../Addresses";
import ABIs from "../ABIs";
import colors from "../Utils/colors";
import WizardCard from "../Components/WizardCard";
import {switchcase} from "../Utils";
import Button from '../Components/Button'
import db from '../../../AliceSDK/Socket'
import {Wallet, Contract} from "../../../AliceSDK/Web3";
import { StackActions, NavigationActions } from 'react-navigation';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

export default class BattleScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null,
      tabBarVisible: false,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      scannedWizard: null,
      users: '',
      wizard: {},
      instantiated: false,
      receivedChallenge: null,
      footerColor: '#ffffff',
      challengedWizard: {}
    };
  }

  componentDidMount() {
    const { wizard, challengedWizard } = this.props.navigation.state.params;
    this.getColor(wizard);
    this.getBattleStatus();
    const aliceEventEmitter = Wallet.aliceEvent()
    aliceEventEmitter.addListener(
      "aliceEvent",
      (event) => {
        console.log('EVENT TRIGGERED: ', event);
        if (event.pendingTxComplete.isSuccess === true) {
          console.log('PENDING TX: ', event.pendingTxComplete);
          this.continue();
        }

      }
    )
  }

  continue = () => {
    ReactNativeHapticFeedback.trigger('selection', options);
    const resetAction = StackActions.pop({
      n: 3,
    });
    this.props.navigation.dispatch(resetAction);
  };

  getBattleStatus = async () => {
    db.collection('users').doc(await Wallet.getAddress()).onSnapshot(snapshot => {
      this.setState({challengedWizard: snapshot.data()})
    })
  };

  getColor = wizard => {
    const color = switchcase({
      1: () => this.setState({footerColor: colors.neutralMainColor}),
      2: () => this.setState({footerColor: colors.fireMainColor}),
      3: () => this.setState({footerColor: colors.waterMainColor}),
      4: () => this.setState({footerColor: colors.windMainColor}),
    });
    return color(wizard.affinity)();
  };

  // committingWizardId (uint256)
  // commit (bytes32)
  // moveSet (bytes32)
  // salt (bytes32)
  // otherWizardId (uint256)
  // otherCommit (bytes32)

  reveal = async () => {
    const { wizard } = this.props.navigation.state.params;
    const { challengedWizard } = this.state;
    try {
      const txHash = await Contract.write({contractAddress: BasicTournament.rinkeby, abi: ABIs.BasicTournament, functionName: 'oneSidedReveal', parameters: [parseInt(wizard.id), wizard.commitmentHash, wizard.moveSet, wizard.salt, parseInt(challengedWizard.id), challengedWizard.otherCommit], value: '0', data: '0x0'})
      console.log('txHash: ', txHash);
    } catch(e) {
      console.log(e);
    }

  }

  render() {
    const { wizard, challengedWizard } = this.props.navigation.state.params;
    return (
      <View style={{flex: 1, backgroundColor: this.state.footerColor, alignItems: 'center', justifyContent: 'flex-start'}}>
        <ImageBackground source={require('../Assets/battle-background.png')} style={{ flex: 1, width, alignItems: 'center',}}>
          <View style={{ marginTop: 100, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <WizardCard style={{width: 175, height: 260}} wizard={wizard}/>
            <Image source={require('../Assets/vs-ribbon.png')} style={{ width: 50, height: 50, resizeMode: 'contain', position: 'absolute', zIndex: 100}}/>
            <WizardCard style={{width: 175, height: 260}} wizard={challengedWizard}/>
          </View>
          {challengedWizard.otherCommit ? <Button onPress={this.reveal} style={{marginTop: 100, height: 50,  alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
            <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>BATTLE</Text>
          </Button> : <View style={{height: 50, alignItems: 'center', marginTop: 100, justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
            <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>WAITING ON OTHER WIZARD</Text>
          </View>
          }
        </ImageBackground>

      </View>)
  }
}

const styles = StyleSheet.create({
  sharpShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
  }
});

