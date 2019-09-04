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
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Button } from '../Components';

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
        backgroundColor: '#092D5E',
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
    };
  }

  submit = () => {
    ReactNativeHapticFeedback.trigger('selection', options);
    this.props.navigation.navigate('RequestComplete');
  };

  render() {
    const { tokenInfo, iterator, token } = this.props;
    return (
      <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
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
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              ...styles.input,
              paddingHorizontal: 10,
              height: 50,
              alignItems: 'center',
            }}
          >
            <TextInput
              keyboardType="numeric"
              style={{ flex: 1, fontWeight: '600', fontSize: 15 }}
              placeholder="e.g. 100"
            />
            <Text style={{ fontWeight: '600', fontSize: 15 }}>REP</Text>
          </View>
        </View>
        <Button
          onPress={this.submit}
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            width: 250,
            paddingVertical: 15,
            position: 'absolute',
            bottom: 50,
            zIndex: 1000,
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 15, margin: 5 }}>Submit</Text>
        </Button>
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
});
