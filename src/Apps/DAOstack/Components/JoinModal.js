/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Modal, Button } from '../Components';

const { height, width } = Dimensions.get('window');

export default class JoinModal extends Component {
  constructor(props) {
    super(props);
  }

  joinDAO = () => {
    console.log("Join")
    this.toggleModal()
  }

  render() {
    const { style } = this.props;
    return (
    <Modal
        {...this.props}
        style={{ ...style, ...styles.modal }}
        >
          <View
            style={{
              width: width - 50,
              backgroundColor: 'white',
              padding: 20,
              alignItems: 'center',
              borderRadius: 20,
            }}
          >
            <Image
              source={require('../Assets/community.png')}
              style={{
                height: width - 180,
                resizeMode: 'contain',
              }}
            />
            <Text style={{ fontWeight: '800', fontSize: 20, marginTop: 5, marginBottom: 15 }}>
              Join us!
            </Text>
            <Text style={{ paddingHorizontal: 25, color: 'grey', fontWeight: '700', fontSize: 15 }}>
              You are currently viewing proposals, you can also submit a proposal for reputation to
              participate in voting on proposals.
            </Text>
            <View style={{ marginVertical: 20 }}>
              <Button
                onPress={this.props.onJoinPress}
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: 250,
                  paddingVertical: 15,
                }}
              >
                <View />
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 15 }}>
                  Join DAO
                </Text>
              </Button>
            </View>
          </View>
        </Modal>
      )
  }
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
});
