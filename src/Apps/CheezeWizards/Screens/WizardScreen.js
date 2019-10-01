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
import {NavigationBar} from "../../../AliceCore/Components/NavigationBar";
import Button from '../Components/Button'
import Camera from "../../../AliceSDK/Camera";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {Settings, Wallet} from "../../../AliceSDK/Web3";
import env from '../../../../env';
import WizardCard from '../Components/WizardCard'
import QRCode from 'react-native-qrcode-svg'
import {FoodContractABI} from "../../Example/ABI";
import {BasicTournament} from '../ABIs/BasicTournament';
import Modal from "../Components/Modal";
import CardFlip from '../Components/CardFlip'
import * as Animatable from 'react-native-animatable';

import {goBack} from "../../../AliceCore/Utils/navigationWrapper";
import _ from 'lodash';

import db from '../../../AliceSDK/Socket'

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

export default class WizardScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null,
      tabBarVisible: false,
    };
  };

  handleViewRef = ref => this.view = ref;

  constructor(props) {
    super(props);

    this.state = {
      flash: false,
      cameraType: 'back',
      backgroundColor: 'transparent',
      pressed: false,
      actionList: [],
      qrModalVisible: true,
      arrowModalVisible: false,
      scannedWizard: null,
      users: '',
      wizard: {},
      instantiated: false,
      receivedChallenge: {}
    };

  }

  componentDidMount() {
    const {id, affinity, ascending, ascensionOpponent, currentDuel, maxPower, molded, nonce, power, ready} = this.props.navigation.state.params.wizard;
    // grabbing only these variables from the object to filter out the other key / values
    const wizard = {
      id,
      affinity,
      ascending,
      ascensionOpponent,
      currentDuel,
      maxPower,
      molded,
      nonce,
      power,
      ready
    };
    this.setState({wizard});
    this.getAccountInfo();
    if (this.props.navigation.state.params.notificationChallenge) {
      this.setState({receivedChallenge: this.props.navigation.state.params.notificationChallenge, qrModalVisible: false,});
    }
  }

  getAccountInfo = async () => {
    db.collection('users').doc(await Wallet.getAddress()).onSnapshot(snapshot => {
      !this.state.instantiated ? this.setState({instantiated: true}) : this.setState({receivedChallenge: snapshot.data()})
    })
  };

  startDuel = async (myWizard, challengedWizard) => {
    this.props.navigation.navigate('CheezeWizards/Duel', {wizard: myWizard, challengedWizard});
    db.collection("users").doc(challengedWizard.owner).set(myWizard);
  };

  bounce = () => this.view.bounceIn().then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

  onWizardScan = (wizard) => {
    Object.keys(wizard).forEach(function(key){ if (typeof wizard[key] === "object") {
      console.log('WIZARD KEY: ', wizard[key]);
      console.log('PARSED WIZARD KEY: ', parseInt(wizard[key]._hex));
      wizard[key] = parseInt(wizard[key]._hex)
    } });
    console.log('SCANNED WIZARD: ', wizard);
    this.setState({scannedWizard: wizard, qrModalVisible: false, arrowModalVisible: true}, this.bounce)
  };

  scan = (barcode) => {
    try {
      if (JSON.parse(barcode.data)) {
        this.debouncedScan(JSON.parse(barcode.data));
      }

    } catch(e) {
      console.log('scan error: ', e)
    }
  };

  debouncedScan = _.debounce((wizard) => this.onWizardScan(wizard), 2000, {'leading':true,'trailing':false});

  toggleTorch = () => {
    this.setState({flash: !this.state.flash});
    if (this.state.cameraType === 'front') {
      this.state.backgroundColor ===  'transparent' ? this.setState({backgroundColor: 'rgba(255,255,255,0.7)'}) : this.setState({backgroundColor: 'transparent'});
    }
  };

  toggleCamera = () => {
    this.state.cameraType === 'back' ? this.setState({cameraType: 'front', flash: false}) : this.setState({cameraType: 'back', flash: false});
  };

  animate = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.setState({pressed: !this.state.pressed});
  };

  openMap = () => {
    this.props.navigation.navigate('CheezeWizards/Map');
  };

  toggleModal = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.setState({qrModalVisible: !this.state.qrModalVisible, arrowModalVisible: !this.state.arrowModalVisible})
  }

  actionPress = (action) => {
    ReactNativeHapticFeedback.trigger("selection", options);
    if (this.state.actionList.length < 3) {
      this.setState({ actionList: [...this.state.actionList, action] })
    }
  };

  fight = async () => {
    this.setState({pressed: !this.state.pressed});
    try {
      const txHash = await Wallet.sendTransactionWithDapplet({to: '0xE115012aA32a46F53b09e0A71CD0afa0658Da55F', value: '0.01'})
      this.setState({txHash})
    } catch(e) {
      console.log(e);
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const {notificationChallenge} = this.props.navigation.state.params;
    const {wizard} = this.state;
    return (
      <Camera style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}} onBarCodeRead={this.scan} type={this.state.cameraType} flashMode={this.state.flash && this.state.cameraType === 'back' ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}>
        <NavigationBar/>
        <ImageBackground source={require('../Assets/wizards-screen.png')} style={{flex: 1, width, alignItems: 'center',}}>
            <View style={{flexDirection: 'row', position: 'absolute', top: 70, zIndex: 9999, flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
              <Button onPress={this.openMap} style={{flex: 1}}>
                <Image source={require('../Assets/location.png')} style={{
                  resizeMode: 'contain',
                  width: 40,
                  height: 45
                }}/>
              </Button>
              <View style={{flex: 5, height: 50, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
                <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>WIZARDS</Text>
              </View>
              <Button onPress={Settings.settingsPopUp} style={{flex: 1}}>
                <Image source={require('../Assets/settings-icon.png')} style={{
                  resizeMode: 'contain',
                  width: 50,
                  height: 50
                }}/>
              </Button>
            </View>
          <Modal swipeDirection='down' swipeThreshold={50} onSwipeComplete={this.toggleModal} isVisible={this.state.qrModalVisible} backdropOpacity={0} onBackdropPress={this.toggleModal} style={{alignSelf: 'center', marginLeft: -5, marginTop: -50}}>
            <CardFlip style={{height: width - 10, width: width-80}} ref={card => this.card = card}>
              <Button onPress={() => this.card.flip()} style={{flex: 1}}>
                <WizardCard style={{height: width - 10, width: width-80}} wizard={wizard}/>
              </Button>
              <Button onPress={() => this.card.flip()} style={{flex: 1}}>
                <View style={{height: width - 10, width: width-80, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'black', ...styles.sharpShadow}}>
                  <QRCode
                    size={200}
                    value={JSON.stringify(wizard)}
                  />
                </View>
              </Button>
            </CardFlip>
            {/*<Button onPress={this.toggleModal} style={{flex: 1}}>*/}
            {/*<View style={{ height: 50, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>*/}
            {/*<Text style={{fontSize: 20, fontFamily: 'Exocet'}}>x</Text>*/}
            {/*</View>*/}
            {/*</Button>*/}
          </Modal>
          {this.state.scannedWizard && <Animatable.View style={{alignSelf: 'center', justifySelf: 'center', marginTop: 200}} ref={this.handleViewRef}>
            <WizardCard style={{height: width - 10, width: width-80}} wizard={this.state.scannedWizard}/>
            <Button onPress={() => this.startDuel(wizard, this.state.scannedWizard)} style={{height: 50,  alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
              <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>SEND CHALLENGE</Text>
            </Button>
            <Button onPress={() => this.view.bounceOut()} style={{height: 50,  alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
              <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>X</Text>
            </Button>
          </Animatable.View>}
          {notificationChallenge && <Animatable.View style={{alignSelf: 'center', justifySelf: 'center', marginTop: 200}} ref={this.handleViewRef}>
            <WizardCard style={{height: width - 10, width: width-80}} wizard={notificationChallenge}/>
            <Button onPress={() => this.startDuel(wizard, notificationChallenge)} style={{height: 50,  alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
              <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>ACCEPT CHALLENGE</Text>
            </Button>
            <Button onPress={() => this.view.bounceOut()} style={{height: 50,  alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
              <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>X</Text>
            </Button>
          </Animatable.View>}
          {this.state.arrowModalVisible && <Button onPress={this.toggleModal} style={{position: 'absolute', bottom: 30}}>
            <Image source={require('../Assets/up-cheeze-arrow.png')} style={{
              resizeMode: 'contain',
              width: 65,
              height: 65
            }}/>
          </Button> }
        </ImageBackground>
      </Camera>)
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

