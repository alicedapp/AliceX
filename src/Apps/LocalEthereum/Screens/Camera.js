import React, {Component} from 'react';
import {RNCamera as Camera} from 'react-native-camera';
import Modal from '../Components/Modal';
import {Text, TouchableOpacity} from 'react-native';

export default class CameraComponent extends Component {

  state = {
    isVisible: false,
    cameraType: 'back'
  };

  read = (e) => {
    this.setState({isVisible: true, text: JSON.stringify(e)});
  };

  closeModal = () => {
    this.setState({ isVisible: false });
  };

  switchCamera = () => {
    this.state.cameraType === 'back' ? this.setState({cameraType: 'front'}) : this.setState({cameraType: 'back'});
  };

  render() {
    return (
      <Camera style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onBarCodeRead={this.read} type={this.state.cameraType}>
        <TouchableOpacity onPress={this.switchCamera}>
          <Text style={{color: 'white'}}>Switch Camera</Text>
        </TouchableOpacity>
        <Modal>
          <Text>Hello</Text>
        </Modal>
      </Camera>
    )
  }

}
