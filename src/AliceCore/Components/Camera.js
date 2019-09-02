import {Component} from "react";
import Camera from "../../AliceSDK/Camera/index";
import {StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from "react-native";
import React from "react";
import {goBack} from "../Utils/navigationWrapper";
const { height, width } = Dimensions.get('window');


export default class CameraScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flash: false,
      cameraType: 'back',
      backgroundColor: 'transparent'
    };

  }

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
      <Camera style={styles.container} type={this.state.cameraType} flashMode={this.state.flash && this.state.cameraType === 'back' ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}>
        <View style={{flex:  1, backgroundColor: this.state.backgroundColor, borderRadius: 15, marginTop: 20, }}>
          <View style={{
            width: '100%', padding: 20, marginTop: -10, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'
          }}>
            <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center'}} onPress={() => goBack()}>
              <Image source={require('../Assets/back-arrow-camera.png')} style={{ resizeMode: 'contain', width: 17, height: 17 }}/>
            </TouchableOpacity>
          </View>
          <View style={{width: width-20, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
            <View style={{ alignItems: 'center', justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={this.toggleCamera} style={styles.cameraButtonsContainer}>
                <Image source={require('../Assets/rotate-camera.png')} style={styles.buttonIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cameraButtonsContainer}>
                <Image source={require('../Assets/wallet-connect.png')} style={styles.buttonIcon}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggleTorch} style={styles.cameraButtonsContainer}>
                <Image source={require('../Assets/camera-flash.png')} style={styles.buttonIcon}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Camera>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
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
