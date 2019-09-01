'use strict';

import React, { Component } from 'react'
import {
  Clipboard,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import Modal from 'react-native-modal'
import PropTypes from 'prop-types'

export default class QrModal extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    isVisible: PropTypes.bool,
  };

  static defaultProps = {
    screen: false
  };

  render () {
    return (
      <Modal isVisible={this.props.isVisible} style={{marginLeft: 90, width: 200, height: 200, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => Clipboard.setString(this.props.value)} style={styles.modal}>
          <QRCode value={this.props.value || 'none'} style={{margin: 10}}/>
          <Text style={{fontSize: 25, fontFamily: 'Menlo'}}>{this.props.value}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.modalControl} style={{width: 40, height: 40, marginTop: 10, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white'}}>x</Text>
        </TouchableOpacity>
      </Modal>

    )
  }
}

const styles = StyleSheet.create({
  modal: {
    width: 250,
    height: 350,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
})
