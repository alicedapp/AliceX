/* eslint-disable global-require */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  TextInput,
} from 'react-native';

import { Button } from '../Components';

// eslint-disable-next-line no-undef
export default class NewProposal extends Component<Props> {
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

  render() {
    const { tokenInfo, iterator, token, navigation } = this.props;
    return (
      <View style={{ flex: 1, padding: 20, alignItems: 'flex-start' }}>
        <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 10, marginTop: 20 }}>
          Title
        </Text>
        <TextInput
          style={{
            padding: 10,
            width: '100%',
            ...styles.input,
            height: 50,
            fontWeight: '600',
            fontSize: 15,
          }}
          placeholder="e.g. Reputation Request"
        />
        <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 10, marginTop: 20 }}>
          Description
        </Text>
        <TextInput
          multiline
          style={{
            padding: 10,
            paddingTop: 15,
            width: '100%',
            ...styles.input,
            height: 200,
            fontWeight: '600',
            fontSize: 15,
          }}
          placeholder={"Describe the reason you're joining this DAO"}
        />
        <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 10, marginTop: 20 }}>
          Attachment URL
        </Text>
        <TextInput
          style={{
            padding: 10,
            width: '100%',
            ...styles.input,
            height: 50,
            fontWeight: '600',
            fontSize: 15,
          }}
          placeholder="Add a link for more details"
        />
        <Button
          onPress={() => navigation.navigate('DAOstack/ReputationRequest')}
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: 250,
            paddingVertical: 15,
            position: 'absolute',
            bottom: 50,
            zIndex: 1000,
          }}
        >
          <View />
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 15 }}>Next Step</Text>
          <Image
            source={require('../Assets/forward-button-white.png')}
            style={{
              height: 25,
              resizeMode: 'contain',
            }}
          />
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
