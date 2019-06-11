import Modal from "react-native-modal";
import {Component} from "react";
import Icon from "./IconComponent";
import {View, Text, Dimensions, StyleSheet, Image, TouchableHighlight, TouchableOpacity} from "react-native";
import React from "react";

let {height, width} = Dimensions.get('window');

export default class AppsScreen extends Component<Props> {
  state = {
    isVisible: false
  };

  navigate = () => console.log('hello');

  render() {
    return (
      <Modal isVisible={this.props.isVisible} onBackdropPress={this.props.onBackdropPress} style={styles.modal}>
        <View style={styles.modalBox}>
          <View style={{width: '100%', height: 20, alignItems: 'flex-end', justifyContent: 'center'}}>
            <TouchableOpacity onPress={this.props.closeModal}>
              <Image source={require('../Assets/close.png')} style={{resizeMode: 'contain', height: 30, width: 30}}/>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10}}>
            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 15}}>
              <Text style={{fontFamily: 'Menlo-Bold', fontSize: 20}}>Signature Request</Text>
            </View>
            <View style={{width: '100%', alignItems: 'flex-start', justifyContent: 'center', marginBottom: 8}}>
              <Text style={{fontFamily: 'Menlo-Regular', fontSize: 17}}>App</Text>
            </View>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15}}>
              {this.props.app === "ethereum" ?
                <Image source={require('../Assets/localethereum.png')} style={{resizeMode: 'contain', height: 20, width: 20}}/> :
                <Image source={require('../Assets/radar-black.png')} style={{resizeMode: 'contain', height: 20, width: 20}}/>
              }
              {this.props.app === "ethereum" ?
                <Text style={{fontFamily: 'Menlo-Regular', fontSize: 17}}> LocalEthereum</Text> :
                <Text style={{fontFamily: 'Menlo-Regular', fontSize: 17}}> RELAY</Text>
              }
            </View>
            <View style={{width: '100%', alignItems: 'flex-start', justifyContent: 'center', marginBottom: 8}}>
              <Text style={{fontFamily: 'Menlo-Regular', fontSize: 17}}>Asset</Text>
            </View>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15}}>
              {this.props.app === "ethereum" ?
                <Image source={require('../Assets/ethereum.png')} style={{resizeMode: 'contain', height: 20, width: 20, marginRight: 5}}/> :
                <Image source={require('../Assets/status-logo.png')} style={{resizeMode: 'contain', height: 20, width: 20, marginRight: 5}}/>
              }
              {this.props.app === "ethereum" ?
                <Text style={{fontFamily: 'Menlo-Regular', fontSize: 17}}>Ethereum</Text> :
                <Text style={{fontFamily: 'Menlo-Regular', fontSize: 17}}>Status Tokens</Text>
              }
            </View>
            <View style={{width: '100%', alignItems: 'flex-start', justifyContent: 'center', marginBottom: 8}}>
              <Text style={{fontFamily: 'Menlo-Regular', fontSize: 17}}>Amount</Text>
            </View>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 20}}>
              {this.props.app === "ethereum" ?
                <Text style={{fontFamily: 'Menlo-Regular', fontSize: 17}}>1 ETH</Text> :
                <Text style={{fontFamily: 'Menlo-Regular', fontSize: 17}}>10000 SNT</Text>
              }
            </View>
            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={this.props.closeModal} style={{ width: width - 40, height: 50, backgroundColor: '#0077eb', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15}}>
                <Text style={{color: 'white', fontSize: 20, alignItems: 'center', justifyContent: 'center', fontFamily: 'Menlo-Regular'}}>Approve</Text>
              </TouchableOpacity>
            </View>
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
  modalBox: {
    width,
    padding: 15,
    height: 350,
    backgroundColor: 'white',
    borderRadius: 25,
    position: 'absolute',
    bottom: 0
  }
});
