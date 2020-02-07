/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-unused-state */
/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Button } from '../Components';
import { ContributionRewardSchemeABI } from "../ABI";
import { ethers } from 'ethers'
import {Wallet, Contract} from "../../../AliceSDK/Web3";
import {Ipfs as IpfsClient} from '../Config'

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const { height, width } = Dimensions.get('window');

export default class ReputationRequest extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;

    return {
      headerTitle: 'Reputation Request',
      headerTitleStyle: {
        color: 'white',
      },
      headerStyle: {
        backgroundColor: navigation.state.params.backgroundColor,
      },

      headerLeft: (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Image
            source={require('../Assets/back-button-white.png')}
            style={{
              height: 17,
              margin: 20,
              resizeMode: 'contain',
            }}
          />
        </TouchableWithoutFeedback>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      animatePress: new Animated.Value(1),
      reputationReward: '',
      reputationRewardIsValid: true
    };
  }

  submit = async () => {
    if (this.state.reputationReward > 0) {
      this.setState({ reputationRewardIsValid: true });
    } else {
      this.setState({ reputationRewardIsValid: false });
      return;
    }

    ReactNativeHapticFeedback.trigger('selection', options);
    const { dao, backgroundColor, title, description, link } = this.props.navigation.state.params;
    const descriptionHash = await IpfsClient.addAndPinString(JSON.stringify({title, description, url: link, tags: []}));

    this.props.navigation.goBack()
    const walletAddress = await Wallet.getAddress();
    const params = {
      contractAddress: dao.schemes.find(s => s.name === 'ContributionReward').address, 
      abi: ContributionRewardSchemeABI, 
      functionName: 'proposeContributionReward', 
      parameters: [dao.id, descriptionHash, ethers.utils.parseEther(this.state.reputationReward).toString(), [0, 0, 0, 0, 1], ethers.constants.AddressZero, walletAddress], 
      value: '0.0', 
      data: '0x0'
    }
    try {
    const txHash = await Contract.write(params);
    this.props.navigation.navigate('DAOstack/RequestComplete');
    } catch(e){
      console.error(e);
    }

  };

  render() {
    return (
      <View style={{ flex: 1, width: '100%' }}>
      <ScrollView contentContainerStyle={{ width: '100%', flexGrow: 1, paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, flexDirection: 'column', justifyContent: 'space-between'}}>
      <View style={{ alignItems: 'center' }}>
      <Image
        source={require('../Assets/road-ahead.png')}
        style={{
          height: width - 150,
          resizeMode: 'contain',
        }}
      />
      <Text style={{ fontWeight: '800', fontSize: 20, marginTop: 5, marginBottom: 15 }}>
        You're almost there!
      </Text>
      <Text style={{ paddingHorizontal: 25, color: 'grey', fontWeight: '700', fontSize: 15 }}>
        DAOs in DAOstack require you to apply for Reputation (REP) to take part in voting on
        proposals. The recommended request is 100 REPs. If accepted you will be able to contribute
        to the future of this DAO.
      </Text>
      <View>
        <Text style={{ fontWeight: '700', fontSize: 17, marginBottom: 10, marginTop: 20 }}>
          Reputation Request
          {
            this.state.reputationRewardIsValid ? null :
            <Text style={{ fontWeight: '700', fontSize: 15, marginBottom: 10, marginTop: 20, ...styles.errorColor }}>
              &nbsp;&nbsp;Required
            </Text>
          }
        </Text>
        <View
          style={[{
              flexDirection: 'row',
              width: '100%',
              ...styles.input,
              paddingHorizontal: 10,
              height: 50,
              alignItems: 'center'
            },
            (this.state.reputationRewardIsValid) ? null : { borderWidth: 1, ...styles.errorBorderColor }
          ]}
        >
          <TextInput
            keyboardType="numeric"
            style={{ flex: 1, fontWeight: '600', fontSize: 15 }}
            placeholder="e.g. 100"
            onChangeText={(reputationReward) => this.setState({reputationReward: reputationReward.replace(/[^0-9]/g, '')})}
          />
          <Text style={{ fontWeight: '600', fontSize: 15 }}>REP</Text>
        </View>
      </View>
    </View>

    <View style={{ paddingTop: 20}}>
      <Button
        onPress={this.submit}
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: 250,
          paddingVertical: 15,
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600', fontSize: 15, margin: 5 }}>Submit</Text>
      </Button>
      </View>
      </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  tokenBox: {
    flexDirection: 'row',
    width: '100%',
    margin: 8,
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
  errorColor: {
    color: 'red'
  },
  errorBorderColor: {
    borderColor: 'red'
  }
});
