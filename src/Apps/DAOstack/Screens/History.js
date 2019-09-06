/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { RNCamera as Camera } from 'react-native-camera';
import { Modal } from '../Components';

export default class CameraComponent extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      cameraType: 'back',
    };
  }

  read = e => {
    this.setState({ isVisible: true, text: JSON.stringify(e) });
  };

  closeModal = () => {
    this.setState({ isVisible: false });
  };

  switchCamera = () => {
    const { cameraType } = this.state;
    if (cameraType === 'back') {
      this.setState({ cameraType: 'front' });
    } else {
      this.setState({ cameraType: 'back' });
    }
  };

  render() {
    const { cameraType } = this.state;
    return (
      <Camera
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onBarCodeRead={this.read}
        type={cameraType}
      >
        <TouchableOpacity onPress={this.switchCamera}>
          <Text style={{ color: 'white' }}>Switch Camera</Text>
        </TouchableOpacity>
        <Modal>
          <Text>Hello</Text>
        </Modal>
      </Camera>
    );
  }
}
