import Modal from "react-native-modal";
import React, {Component} from "react";
import {View, Text, Dimensions, StyleSheet, Image, TouchableHighlight, TouchableOpacity, TextInput} from "react-native";

let {height, width} = Dimensions.get('window');


export default class ModalComponent extends Component<Props> {
  state = {
    isVisible: false,
    pin: ''
  };

  render() {
    return (
      <Modal isVisible={this.props.isVisible} onBackdropPress={this.props.onBackdropPress} style={styles.modal} animationIn={'slideInUp'} animationOut={'slideOutDown'}>
        {this.props.children}
      </Modal>
    )
  }

}
const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalBox: {
    width,
    marginBottom: 50,
    padding: 15,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 25,
    position: 'absolute',
    top: 0
  },
  modalBox2: {
    width,
    marginBottom: 50,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 25,
  }
});
