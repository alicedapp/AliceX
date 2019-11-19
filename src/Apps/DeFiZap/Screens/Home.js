import React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View, RefreshControl,
} from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { Settings, Wallet, Contract, WalletConnect } from "../../../AliceSDK/Web3";
import env from '../../../../env';
import Swiper from 'react-native-swiper'
import Button from '../Components/Button'

import ABIs from '../ABIs';
import {GateKeeper, BasicTournament} from '../Addresses/index'

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

import db from '../../../AliceSDK/Socket';

export default class CheezeWizardsHome extends React.Component {

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
      // loading: false,
      loading: true,
      pressed: false,
      actionList: [],
      wizards: [],
      network: '',
      fetching: false,
      balance: null
    };
  }

  componentDidMount() {
    const aliceEventEmitter = Wallet.aliceEvent();
    aliceEventEmitter.addListener(
      "aliceEvent",
      (event) => {
        if (event.network) {
          const parsedEvent = JSON.parse(event.network);
          this.setState({network: parsedEvent.name, networkColor: parsedEvent.color}, this.fetchWizards);
        }
      }
    );
  }



  render() {
    const { navigation } = this.props;

    return (
      <View style={{flex: 1, backgroundColor: '#fef064', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Swiper style={styles.wrapper}>
          <View style={styles.slide1}>
            <Image style={styles.image} source={require('../Assets/zaps.png')}/>
            <Text style={styles.headingDark}>Save Time</Text>
            <Text style={styles.subtextDark}>Zap is a smart contract that auto-spreads incoming deposits across multiple DeFi protocols based on pre-set allocations, bypassing many manual steps.
            </Text>
          </View>
          <View style={styles.slide2}>
            <Image style={styles.image} source={require('../Assets/gas.png')}/>
            <Text style={styles.headingLight}>Save Gas</Text>
            <Text style={styles.subtextLight}>Access all your favorite DeFi protocols and save up to 40% on transaction fees.</Text>

          </View>
          <View style={styles.slide3}>
            <Image style={styles.image} source={require('../Assets/lock.png')}/>
            <Text style={styles.headingLight}>Non Custodial</Text>
            <Text style={styles.subtextLight}>Zaps never hold your assets - you will instantly receive allocated DeFi tokens.</Text>
            <Button onPress={() => this.props.navigation.navigate('DeFiZap/Zaps')} style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 250,
              paddingVertical: 15,
              position: 'absolute',
              bottom: 100
            }}>
              <Text style={styles.subtextDark}>Get Started</Text>
            </Button>
          </View>
        </Swiper>
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

  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 50
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6EE1FF',
    padding: 50

  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7191F8',
    padding: 50

  },
  image: {
    resizeMode: 'contain',
    height: 100,
    marginBottom: 20
  },
  headingDark: {
    color: '#333',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15
  },
  subtextDark: {
    color: '#333',
    fontSize: 18,
  },
  headingLight: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15
  },
  subtextLight: {
    color: '#fff',
    fontSize: 18,
  },
  wrapper: {}
});

