import {Component} from "react";
import {RNCamera as Camera} from "react-native-camera";
import {StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from "react-native";
import React from "react";
import {onSortOptions} from "../../Apps/Foam/utils";
const { height, width } = Dimensions.get('window');


export default class CameraScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flash: false,
      cameraType: 'back'
    };

  }

  toggleTorch = () => this.setState({flash: !this.state.flash});

  toggleCamera = () => {
    this.state.cameraType === 'back' ? this.setState({cameraType: 'front'}) : this.setState({cameraType: 'back'});
  };

  render() {
    return (
      <Camera style={styles.container} type={this.state.cameraType} flashMode={this.state.flash ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}>
        <View style={{width: width-20, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
          <View style={{ alignItems: 'center', justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={this.toggleCamera} style={styles.cameraButtonsContainer}>
              <Image source={require('../../AliceAssets/rotate-camera.png')} style={styles.buttonIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButtonsContainer}>
              <Image source={require('../../AliceAssets/wallet-connect.png')} style={styles.buttonIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleTorch} style={styles.cameraButtonsContainer}>
              <Image source={require('../../AliceAssets/camera-flash.png')} style={styles.buttonIcon}/>
            </TouchableOpacity>
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
