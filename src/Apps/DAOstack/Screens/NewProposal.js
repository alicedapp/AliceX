import {Animated, Text, StyleSheet, View, TouchableWithoutFeedback, Image, TextInput} from "react-native";
import React, {Component} from "react";
import Icon from "../../../AliceComponents/IconComponent";

export default class NewProposal extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;

    return {
      headerTitle: 'Reputation Request',
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#092D5E'
      },

      headerLeft: <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Image source={require('../Assets/back-button-white.png')} style={{
          height: 17,
          margin: 20,
          resizeMode: 'contain',
        }}/>
      </TouchableWithoutFeedback>
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      animatePress: new Animated.Value(1)
    };

  }


  render() {
    const {tokenInfo, iterator, token} = this.props;
    return (
      <View style={{padding: 20}}>
        <Text style={{ fontWeight: '700'}}>Title</Text>
        <TextInput style={{ padding: 10, width: '100%', ...styles.input, height: 50}} placeHolder={'e.g. Reputation Request'}/>
        <Text style={{ fontWeight: '700'}}>Description</Text>
        <TextInput style={{ padding: 10, width: '100%', ...styles.input, height: 200}} placeHolder={"Describe the reason you're joining this DAO"}/>
        <Text style={{ fontWeight: '700'}}>Attachment URL</Text>
        <TextInput style={{ padding: 10, width: '100%', ...styles.input, height: 50}} placeHolder={'Add a link for more details'}/>

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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
    width: 50,
    backgroundColor: '#3078CA',
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

  }

})
