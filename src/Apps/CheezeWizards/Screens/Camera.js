import {Component} from "react";
import Camera from "../../../AliceSDK/Camera";
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, Dimensions} from "react-native";
import React from "react";
import {goBack} from "../../../AliceUtils/navigationWrapper";
const { height, width } = Dimensions.get('window');
import _ from 'lodash';


export default class CameraScreen extends Component {
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
      flash: false,
      cameraType: 'back',
      backgroundColor: 'transparent'
    };

  }

  startDuel = (data) => {
    let wizard = JSON.parse(data);
    this.props.navigation.navigate('CheezeWizards/Duel', {wizard})
  }

  scan = (barcode) => {
    const debouncedScan = _.debounce(() => this.startDuel(barcode.data), 2000, {
      'leading': true,
      'trailing': false
    });
    debouncedScan();
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

  render() {
    return (
      <Camera onBarCodeRead={this.scan} style={styles.container} type={this.state.cameraType} flashMode={this.state.flash && this.state.cameraType === 'back' ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}>
        <ImageBackground source={require('../Assets/duel-block.png')} style={{flex: 1, width, resizeMode: 'contain'}}>
          <View style={{flex:  1, backgroundColor: this.state.backgroundColor, borderRadius: 15, marginTop: 20, }}>
            <View style={{
              width: '100%', padding: 20, marginTop: -10, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'
            }}>
              <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center'}} onPress={() => goBack()}>
                <Image source={require('../Assets/back-arrow-left.png')} style={{ resizeMode: 'contain', width: 17, height: 17, marginRight: 2 }}/>
              </TouchableOpacity>
            </View>
            <View style={{width: width-20, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
              <View style={{ alignItems: 'center', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={this.toggleCamera} style={styles.cameraButtonsContainer}>
                  <Image source={require('../../../AliceAssets/rotate-camera.png')} style={styles.buttonIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButtonsContainer}>
                  <Image source={require('../../../AliceAssets/wallet-connect.png')} style={styles.buttonIcon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleTorch} style={styles.cameraButtonsContainer}>
                  <Image source={require('../../../AliceAssets/camera-flash.png')} style={styles.buttonIcon}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Camera>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  cameraButtonsContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: 40,
    height: 40,
    borderRadius: 20
  }
});
