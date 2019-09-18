import React from 'react';
import {
  AsyncStorage,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  View,
} from 'react-native';
import t from 'prop-types';
import {Contract} from "../../../AliceSDK/Web3";
import {ditCoordinatorABI} from "../ABI";


class MyModal extends React.Component {
  static propTypes = {
    children: t.node.isRequired,
    visible: t.bool.isRequired,
    dismiss: t.func.isRequired,
    transparent: t.bool,
    animationType: t.string,
  };

  static defaultProps = {
    animationType: 'fade',
    transparent: true,
  };

  voteUp = async () => {
    try {
      //generate rand
      await AsyncStorage.setItem('@ditCraft:key', 'I like to save it.');

      const txHash = await Contract.write({
        contractAddress: '0x9A65c773A216a4F4748B1D65C0fB039d9F2b223D',
        abi: ditCoordinatorABI,
        functionName: 'voteOnProposal',
        parameters: ['', '', '']
      });

      console.log('txHash: ', txHash);

    } catch(e) {
      console.log('error: ', e)
    }
  };

  voteDown = () => {

  };

  render() {
    const { props } = this;
    return (
      <View>
        <Modal
          visible={props.visible}
          transparent={props.transparent}
          onRequestClose={props.dismiss}
          animationType={props.animationType}
        >
        <TouchableWithoutFeedback onPress={props.dismiss}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          {props.children}
          <View style={{flexDirection: 'row',}}>
            <TouchableOpacity onPress={this.voteUp} style={{backgroundColor: 'white', width: 100, height: 50, marginRight: 10}}>
              <Text>Vote Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.voteDown} style={{backgroundColor: 'white', width: 100, height: 50}}>
              <Text>Vote Down</Text>
            </TouchableOpacity>

          </View>
        </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: '5%',
    backgroundColor: '#2f3f6d',
    color: 'white'
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
});


export default MyModal;
