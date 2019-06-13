import React from 'react';
import {
  Text, View
} from 'react-native';


export default class SimpleView extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, color: 'white'}}>Embedded View</Text>
      </View>
    );
  }
};

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9d48ff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

