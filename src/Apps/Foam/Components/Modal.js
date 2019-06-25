import Modal from "react-native-modal";
import React, {Component} from "react";

export default class ModalComponent extends Component<Props> {
  render() {
    return (
      <Modal {...this.props}>
        {this.props.children}
      </Modal>
    )
  }

}
