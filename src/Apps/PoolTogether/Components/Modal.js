import Modal from "react-native-modal";
import React, {Component} from "react";
import { StyleSheet } from "react-native";

export default class ModalComponent extends Component<Props> {
  state = {
    isVisible: false,
    pin: ''
  };

  render() {
    return (
      <Modal {...this.props} isVisible={this.props.isVisible} onBackdropPress={this.props.onBackdropPress} style={this.props.style} animationIn={'slideInUp'} animationOut={'slideOutDown'}>
        {this.props.children}
      </Modal>
    )
  }

}
