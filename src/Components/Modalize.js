import React, {Component} from 'react';
import Modal from 'react-native-modalize';

export default class Modalize extends Component<Props> {
  render() {
    return (
      <Modal {...this.props}>
        {this.props.children}
      </Modal>
    );
  }
};
