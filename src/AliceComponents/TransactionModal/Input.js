import React, { Component } from 'react';
import {
  AlertIOS,
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


let {height, width} = Dimensions.get('window');

export default class Input extends Component {
  constructor() {
    super();
    this.state = {
      visibleModal: null
    };
  }

  render() {
    const {} = this.state;
    const {onChangeText, _this, placeholder, keyboardType, autoCapitalize, value} = this.props;
    return (
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardAppearance='dark'
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor='grey'
          style={styles.input}
          selectionColor='grey'
          autoCapitalize={autoCapitalize}
          numberOfLines={1}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    // borderColor: '#ccc',
    // borderWidth: 1,
    // borderRadius: 10,
    paddingLeft: 4,
    overflow: 'hidden',
    // shadowColor: 'rgba(0,0,0,0.5)',
    // shadowRadius: 1,
    // shadowOpacity: 1,
    // shadowOffset: {
    //   width: 0,
    //   height: 0
    // },
  },
  inputStyle: {
    marginLeft: 10,
    backgroundColor: "transparent",
    height: 35,
    width: '100%',
    padding: 5,
    fontWeight: '900',
    fontSize: 20,
    color: '#333',
  },
  topNavText: {
    fontFamily: 'DIN Condensed',
    color: 'white',
    fontSize: 16,
  },
});

