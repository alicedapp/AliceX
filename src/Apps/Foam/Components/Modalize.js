import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modalize from 'react-native-modalize';

export default class ModalizeModal extends React.PureComponent {
  modal = React.createRef();

  onClosed = () => {
    const { onClosed } = this.props;

    if (onClosed) {
      onClosed();
    }
  };

  openModal = () => {
    if (this.modal.current) {
      this.modal.current.open();
    }
  };

  render() {
    return (
      <Modalize
        ref={this.modal}
        onClosed={this.onClosed}
        handlePosition="outside"
        adjustToContentHeight
      >
        {this.props.children}
      </Modalize>
    );
  }
}
