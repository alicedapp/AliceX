import React from 'react';
import {
  Text, View, StyleSheet
} from 'react-native';



export default class SimpleView extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
        <Text>TEST</Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9d48ff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

