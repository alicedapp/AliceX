'use strict';

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import Modal from "react-native-modal";
import Camera from "../../AliceSDK/Camera";
import ReactNativeHaptic from 'react-native-haptic-feedback';
import _ from "lodash";
// const Web3 = require('web3');
// const web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/rqmgop6P5BDFqz6yfGla'));
// const privKey = 'cf06f0b35515af10b5dfef470e3a1e743470bf9033d06f198b4e829cb2e7ef05';

export default class CameraModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    modalControl: PropTypes.func
  };

  static defaultProps = {
    screen: false
  };

  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      exchangeRate: 0,
      account: 'alpha',
      visibleModal: null,
      publicAddress: '',
      txCount: 0,
      balance: 0,
      privKey: false,
      pubKey: false,
      mode: 'loading',
      transaction: null,
      result: null,
      signedTx: null,
      phoneUid: '',
      showInput: false,
      socketId: '',
      cameraType: 'back',
      flash: false,
    };
  }

  // _signKey = async (msg, socketId) => {
  //   // ReactNativeHaptic.generate('selection');
  //   const account = await web3.eth.accounts.privateKeyToAccount(privKey)
  //     .sign(msg);
  //
  //   console.log('PHONE ID: ', this.state.phoneUid);
  //   fetch(`https://login.tenzorum.app/login/${socketId}/${this.state.phoneUid}/${msg}/${account.signature}`)
  //     .then((res) => {
  //       console.log('RES: ', res)
  //     })
  // };
  //
  _onBarcodeRead = (read) => {
    if (read) {
      console.log('READ PUBLIC ADDRESS', read.data)
      this.props.addressScan(read.data)
      this.props.modalControl();
      // const dataArray = read.data.split('.');
      // TouchID.authenticate('verify user')
      //   .then(success => {
      //     this._signKey(dataArray[0], dataArray[1]);
      //     this.setState({socketId: dataArray[1]})
      //   })
      //   .catch(error => {
      //     console.log('ERROR: ', error);
      //   });
    }
  };

  render () {
    return (
      <Modal style={{marginLeft: 90,width: 200, height: 200, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}} isVisible={this.props.isVisible}>
        <Camera style={{width: 200, height: 200, borderRadius: 15}}  type={this.state.cameraType} flashMode={this.state.flash ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
          // onBarCodeRead={_.debounce(this._onBarcodeRead, 2000, {
          //   'leading': true,
          //   'trailing': false
          // })}
          />
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
      height: 250,
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


