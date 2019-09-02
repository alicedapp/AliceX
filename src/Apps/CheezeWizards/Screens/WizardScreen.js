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
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {Settings, Wallet} from "../../../AliceSDK/Web3";
import env from '../../../../env';
import WizardCard from '../Components/WizardCard'
import QRCode from 'react-native-qrcode-svg'
import {FoodContractABI} from "../../Example/ABI";
import {BasicTournament} from '../ABIs/BasicTournament';
import Modal from "../Components/Modal";

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

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      // loading: true,
      pressed: false,
      actionList: [],
    };

  }

  componentDidMount() {
    this.fetchWizards();
  }

  animate = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.setState({pressed: !this.state.pressed});
  }

  fetchWizards = async () => {
    let data = null;
    var xhr = new XMLHttpRequest();
    const onData = (data) => {
      console.log('NFT DATA: ', data);
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
    xhr.setRequestHeader("Content-Type","application/json")
    xhr.setRequestHeader("x-api-token", env.cheezeWizard)
    xhr.setRequestHeader("x-email","mark@alicedapp.com")


    xhr.send(data);
    setTimeout(() => this.setState({loading: false}), 2000);
  };

  openMap = () => {
    this.props.navigation.navigate('CheezeMap');
  };

  toggleModal = () => {
    this.setState({qrModalVisible: !this.state.qrModalVisible})
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
      console.log('txHash: ', txHash);
      this.setState({txHash})
    } catch(e) {
      console.log(e);
    }
  };


  render() {
    const { navigate } = this.props.navigation;
    const {wizard} = this.props.navigation.state.params;
    return (
      <View style={{flex: 1, backgroundColor: '#fef064', alignItems: 'center', justifyContent: 'flex-start'}}>
        <NavigationBar/>
        {this.state.loading === true ? <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
          <Image source={require('../Assets/landing.png')} style={{
            width,
            resizeMode: 'contain',
          }}/>
        </View> : <View style={{flex: 1, backgroundColor: '#000', alignItems: 'center',}}>
          <Image source={require('../Assets/melting-cheese.png')} style={{
            resizeMode: 'contain',
            height: 250,
            width
          }}/>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'space-around', marginTop: -150, marginBottom: 30}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Button onPress={this.openMap} style={{flex: 1}}>
                <Image source={require('../Assets/location.png')} style={{
                  resizeMode: 'contain',
                  width: 40,
                  height: 45
                }}/>
              </Button>
              <View style={{
                flex: 5,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: 'white', ...styles.sharpShadow
              }}>
                <Text style={{fontSize: 20, fontFamily: 'Exocet'}}></Text>
              </View>
              <Button onPress={Settings.settingsPopUp} style={{flex: 1}}>
                <Image source={require('../Assets/settings-icon.png')} style={{
                  resizeMode: 'contain',
                  width: 50,
                  height: 50
                }}/>
              </Button>
            </View>
            <View
              style={{width: width - 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View>
                <WizardCard wizard={wizard}/>
                <Text style={{color: 'white', fontSize: 30, fontFamily: 'Exocet'}}>WINS 0</Text>
                <Text style={{color: 'white', fontSize: 30, fontFamily: 'Exocet'}}>LOSSES 0</Text>
              </View>
              <View>
                <Button onPress={() => navigate('CheezeMap')}>
                  <Image source={require('../Assets/location.png')} style={{
                    resizeMode: 'contain',
                    width: 55,
                    height: 55
                  }}/>
                </Button>
                <Button onPress={this.toggleModal}>
                  <Image source={require('../Assets/qr-code-button.png')} style={{
                    resizeMode: 'contain',
                    width: 55,
                    height: 55
                  }}/>
                </Button>
                <Button onPress={() => navigate('CheezeWizards/Camera')}>
                  <Image source={require('../Assets/cheeze-eye.png')} style={{
                    resizeMode: 'contain',
                    width: 55,
                    height: 55
                  }}/>
                </Button>

              </View>
            </View>
          </View>
        </View>
        }
        <Modal isVisible={this.state.qrModalVisible} backdropOpacity={0.3} onBackdropPress={this.toggleModal} style={{alignSelf: 'center', paddingTop: 200}}>
          <View style={{height: width - 10, width: width-80, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'black', ...styles.sharpShadow}}>
            <QRCode
              size={200}
              value={JSON.stringify(wizard)}
            />
          </View>
          <Button onPress={this.toggleModal} style={{flex: 1}}>
            <View style={{ height: 50, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
              <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>x</Text>
            </View>
          </Button>
        </Modal>
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

