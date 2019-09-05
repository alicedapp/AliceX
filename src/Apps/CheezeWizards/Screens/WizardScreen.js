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


const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

export default class MapComponent extends React.Component {

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
      scannedWizard: null
    };

  }

  componentDidMount() {
    this.fetchWizards();
  }

  startDuel = (myWizard, challengedWizard) => {
    this.props.navigation.navigate('CheezeWizards/Duel', {wizard: myWizard, challengedWizard})
  };

  bounce = () => this.view.bounceIn(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

  onWizardScan = (wizard) => {
    this.setState({scannedWizard: wizard, qrModalVisible: false, arrowModalVisible: true}, this.bounce)
  };

  scan = (barcode) => {
    if (JSON.parse(barcode.data).id) {
      const debouncedScan = _.debounce(() => this.onWizardScan(JSON.parse(barcode.data)), 5000, {
        'leading': true,
        'trailing': false
      });
      debouncedScan();
    }
  };

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
  }

  fetchWizards = async () => {
    let data = null;
    var xhr = new XMLHttpRequest();
    const onData = (data) => {
      if (data.assets) {
        this.setState({nftInfo: data, nfts: data.assets});
      }
    };
    xhr.addEventListener("readystatechange",  function()  {
      if (this.readyState === this.DONE) {
        if (this.responseText){
          onData(JSON.parse(this.responseText));
        }
      }
    });
    xhr.open("GET", "https://cheezewizards-rinkeby.alchemyapi.io/wizards?owner="+await Wallet.getAddress());
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.setRequestHeader("x-api-token", env.cheezeWizard);
    xhr.setRequestHeader("x-email","mark@alicedapp.com");


    xhr.send(data);
    setTimeout(() => this.setState({loading: false}), 2000);
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
    const {wizard} = this.props.navigation.state.params;
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
          {this.state.scannedWizard && <Animatable.View animation="bounceIn" delay={1000} style={{alignSelf: 'center', justifySelf: 'center', marginTop: 200}} ref={this.handleViewRef}>
            <WizardCard style={{height: width - 10, width: width-80}} wizard={this.state.scannedWizard}/>
            <Button onPress={() => this.startDuel(wizard, this.state.wizard)} style={{height: 50,  alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
                <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>SEND CHALLENGE</Text>
            </Button>
            <Button onPress={() => this.view.bounceOut()} style={{height: 50,  alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
              <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>X</Text>
            </Button>
          </Animatable.View>}
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

