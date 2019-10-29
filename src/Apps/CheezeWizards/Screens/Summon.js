import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationBar} from "../../../AliceCore/Components/NavigationBar";
import Button from '../Components/Button'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {Contract} from "../../../AliceSDK/Web3";
import { SvgUri } from 'react-native-svg';
import ABIs from '../ABIs';
import {GateKeeper} from '../Addresses/index'
import {switchcase} from "../Utils";
import { BasicTournament } from "../Addresses";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

export default class SummonScreen extends React.Component {

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
      loading: false,
      pressed: false,
      actionList: [],
      wizards: [],
      wizardCosts: {},
    };

  }

  async componentDidMount() {
    try {
      let wizardCosts = await Contract.read({contractAddress: GateKeeper.rinkeby, abi: ABIs.GateKeeper, functionName: 'wizardCosts', parameters: [], network: 'rinkeby'});
      Object.keys(wizardCosts).forEach(function(key){ if (typeof wizardCosts[key] === "object") {
        console.log('WIZARD KEY: ', wizardCosts[key]);
        console.log('PARSED WIZARD KEY: ', parseInt(wizardCosts[key]._hex));
        wizardCosts[key] = parseInt(wizardCosts[key]._hex)
      }});
      console.log('WIZARD COSTS: ', wizardCosts);
      this.setState({wizardCosts});

    } catch(e) {
      console.log('fetch costs error: ', e)
    }
  }

  actionPress = async (_affinity) => {
    ReactNativeHapticFeedback.trigger("selection", options);
    const getAffinity = switchcase({
      "neutral": 1,
      "fire": 2,
      "water": 3,
      "wind": 4,
    });
    const affinity = getAffinity(_affinity);
    console.log('AFFINITY: ', affinity);
    const {wizardCosts} = this.state;
    try {
      if (affinity === 1) {
        const txHash = await Contract.write({contractAddress: GateKeeper.rinkeby, abi: ABIs.GateKeeper, functionName: 'conjureWizard', parameters: [affinity], value: wizardCosts.neutralWizardCost/10e17, data: '0x0'})

      } else {
        const txHash = await Contract.write({contractAddress: GateKeeper.rinkeby, abi: ABIs.GateKeeper, functionName: 'conjureWizard', parameters: [affinity], value: wizardCosts.elementalWizardCost/10e17, data: '0x0'})
      }
      console.log("TX HASH: ", txHash);
    } catch(e) {
      console.log('WIZARD PURCHASE ERROR: ', e);
    }

  };


  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#fef064', alignItems: 'center', justifyContent: 'flex-start'}}>
        <NavigationBar/>
        <View style={{ flex: 1, width, backgroundColor: '#000', alignItems: 'center', }}>
          <Image source={require('../Assets/cheeze-udder.gif')} style={{
            resizeMode: 'contain',
            height: height/2.5,
            width: width*1.5,
            position: 'absolute', top: 0
          }}/>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around',}}>
            <View style={{flexDirection: 'row', position: 'absolute', top: 70, zIndex: 9999, flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
              <View style={{flex: 5, height: 50, maxWidth: width/1.5, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
                <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>SUMMON</Text>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around', marginTop: -150, marginBottom: 30}}>
              <Text style={{color: 'white', fontSize: 20, fontFamily: 'Menlo-Regular', padding: 20, marginTop: 40}}>Choose a fire, water, wind or neutral wizard</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', position: 'absolute', bottom: 70, zIndex: 9999,}}>
                <Button onPress={() => this.actionPress('fire')}>
                  <Image source={require('../Assets/fire-button.png')} style={{
                    resizeMode: 'contain',
                    width: 55,
                    height: 55,
                    margin: 10,
                  }}/>
                </Button>
                <Button onPress={() => this.actionPress('water')}>
                  <Image source={require('../Assets/water-button.png')} style={{
                    resizeMode: 'contain',
                    width: 55,
                    height: 55,
                    margin: 10,
                  }}/>
                </Button>
                <Button onPress={() => this.actionPress('wind')}>
                  <Image source={require('../Assets/earth-button.png')} style={{
                    resizeMode: 'contain',
                    width: 55,
                    height: 55,
                    margin: 10,
                  }}/>
                </Button>
                <Button onPress={() => this.actionPress('neutral')}>
                  <Image source={require('../Assets/neutral-button.png')} style={{
                    resizeMode: 'contain',
                    width: 55,
                    height: 55,
                    margin: 10,
                  }}/>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>

    );
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


