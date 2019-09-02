import React, { Component } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Dimensions
} from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { Button } from '../Components';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

export default class RequestComplete extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;

    return {
      header: null
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      animatePress: new Animated.Value(1)
    };

  }

  continue = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    console.log('PROPS: ', this.props);
    const resetAction = StackActions.pop({
      n: 3,
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    const {tokenInfo, iterator, token} = this.props;
    return (
      <View style={{flex: 1, padding: 40, alignItems: 'center',}}>
        <Image source={require('../Assets/complete.png')} style={{
          height: width - 150,
          resizeMode: 'contain',
        }}/>
        <Text style={{ fontWeight: '800', fontSize: 20, marginTop: 5, marginBottom: 15, width: width - 150}}>Congratulations, your request is complete!</Text>
        <Text style={{ paddingHorizontal: 25, color: 'grey', width: width - 50, fontWeight: '700', fontSize: 15,}}>
          Your request will be reviewed and voted upon, initially it’s in a fail state but don’t worry it
          just requires a few members to vote you in and your request will pass 😊
        </Text>
        <Button onPress={this.continue} style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: 250, paddingVertical: 15, position: 'absolute', bottom: 50, zIndex: 1000,}}>
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 15, margin: 5}}>Continue</Text>
        </Button>
      </View>
    )
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

  }

})
