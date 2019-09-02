import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
let { height, width } = Dimensions.get('window');
export default class Deals extends React.Component {

  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1}}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  kittyContainer: {
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#cecece',
  },
});
