import React, {Component} from 'react';
import {RNCamera} from 'react-native-camera';
import Modal from './Modal';
import {Text} from 'react-native';

export default class CameraComponent extends Component {

  state = {
    isVisible: false
  };

  reader = (e) => {
    this.setState({isVisible: true, text: JSON.stringify(e)});
    console.log('Event: ', e)
  }

  closeModal = () => {
    console.log('closing');
    this.setState({ isVisible: false });
  };

  render() {
    return (
      <RNCamera style={{flex: 1}} onBarCodeRead={this.reader} type={'front'}>
        <Modal navigation={this.props.navigation} isVisible={this.state.isVisible} onBackdropPress={this.closeModal} closeModal={this.closeModal}/>
      </RNCamera>
    )
  }

}
