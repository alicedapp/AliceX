import React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity
} from "react-native";
import { Button, Modal } from "../../DAOstack/Components";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Contract } from "../../../AliceSDK/Web3";
import { DeFiZap } from "../Addresses";
import ABIs from "../../CheezeWizards/ABIs";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

export default class Zaps extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null,
      tabBarVisible: false,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }

  componentDidMount() {

  }

  zap = async () => {
    const txHash = await Contract.write({contractAddress: DeFiZap.kovan, abi: ABIs.DeFiZapABI, functionName: 'SafeNotSorryZapInvestment', value: 0.01})
  };

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible})
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: this.state.footerColor, alignItems: 'center', justifyContent: 'flex-start'}}>
        <View style={{flex: 1, marginTop: 50}}>
          <View style={{ width: '100%', height: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <Image style={styles.image} source={require('../Assets/download.png')}/>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}> Pick a Zap</Text>
          </View>
          <TouchableOpacity
            onPress={this.toggleModal}
            style={styles.zapBox}
          >
            <Image style={{
              resizeMode: 'contain',
              height:20,
              width: 20,
              marginLeft: 10,
              marginTop: 10,

            }} source={require('../Assets/logo.png')}/>
            <View style={{alignItems: 'center', justifyContent: 'center', padding: 25, paddingTop: -25}}>

              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'rgb(19, 20, 173)', marginBottom: 20}}>
                Conservative Bull
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                  <AnimatedCircularProgress
                    style={{ marginRight: 15, marginBottom: 10}}
                    size={50}
                    width={4}
                    fill={70}
                    tintColor="rgb(19, 20, 173)"
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor="#D8D8D8"
                  >
                    {fill => (
                      <View style={{alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>70</Text>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>%</Text>
                      </View>
                    )}
                  </AnimatedCircularProgress>
                  <Text style={{fontSize: 15, fontWeight: '600'}}>cDai</Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                  <AnimatedCircularProgress
                    style={{marginBottom: 10}}
                    size={50}
                    width={4}
                    fill={30}
                    tintColor="rgb(19, 20, 173)"
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor="#D8D8D8"
                  >
                    {fill => (
                      <View style={{alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>30</Text>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>%</Text>
                      </View>
                    )}
                  </AnimatedCircularProgress>
                  <Text style={{fontSize: 15, fontWeight: '600'}}>ETHMINVOL</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.toggleModal}
            style={styles.zapBox}
          >
            <Image style={{
              resizeMode: 'contain',
              height:20,
              width: 20,
              marginLeft: 10,
              marginTop: 10,

            }} source={require('../Assets/logo.png')}/>
            <View style={{alignItems: 'center', justifyContent: 'center', padding: 25, paddingTop: -25}}>

              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'rgb(19, 20, 173)', marginBottom: 20}}>
                Lender
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                  <AnimatedCircularProgress
                    style={{ marginRight: 15, marginBottom: 10}}
                    size={50}
                    width={4}
                    fill={90}
                    tintColor="rgb(19, 20, 173)"
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor="#D8D8D8"
                  >
                    {fill => (
                      <View style={{alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>90</Text>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>%</Text>
                      </View>
                    )}
                  </AnimatedCircularProgress>
                  <Text style={{fontSize: 15, fontWeight: '600'}}>cDai</Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                  <AnimatedCircularProgress
                    style={{marginBottom: 10}}
                    size={50}
                    width={4}
                    fill={10}
                    tintColor="rgb(19, 20, 173)"
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor="#D8D8D8"
                  >
                    {fill => (
                      <View style={{alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>10</Text>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>%</Text>
                      </View>
                    )}
                  </AnimatedCircularProgress>
                  <Text style={{fontSize: 15, fontWeight: '600'}}>dLETH2x</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={this.state.modalVisible}
          backdropOpacity={0.3}
          onBackdropPress={this.toggleModal}
          style={{ alignSelf: 'center' }}
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
              source={require('../Assets/download-1.png')}
              style={{
                height: width - 300,
                resizeMode: 'contain',
                margin: 20
              }}
            />
            <Text style={{ fontWeight: '800', fontSize: 17, marginTop: 5, marginBottom: 15 }}>
              Send Investment Amount
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                ...styles.input,
                paddingHorizontal: 14,
                height: 50,
                alignItems: 'center',
              }}
            >
              <TextInput
                keyboardType="numeric"
                style={{ flex: 1, fontWeight: '600', fontSize: 15 }}
                placeholder="Investment Amount"
              />
              <Text style={{ fontWeight: '600', fontSize: 15 }}>ETH</Text>
            </View>
            <View style={{ marginVertical: 20 }}>
              <Button
                onPress={this.zap}
                style={{
                  alignItems: 'center',
                  width: 250,
                  paddingVertical: 15,
                }}
              >
                <View />
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 17 }}>
                  Invest
                </Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>)
  }
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    height:50,
    width: 50,
    marginBottom: 20
  },
  zapBox: {
    width: width - 20,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});

