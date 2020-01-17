/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

export default class ModalComponent extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      pin: '',
    };
  }

  render() {
    const { style, children } = this.props;
    return (
      <Modal
        {...this.props}
        style={{ ...style, ...styles.modal }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        {children}
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
});
