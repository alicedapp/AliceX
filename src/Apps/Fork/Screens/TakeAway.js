import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

let { height, width } = Dimensions.get('window');

export default class TakeAway extends React.Component {

  componentDidMount() {
    this.getKitties();
  }

  state = {
    kitties: null,
  };

  getKitties = async () => {
    try {
      const response = await fetch('https://api.cryptokitties.co/kitties');
      if (response) {
        console.log('res', JSON.parse(response._bodyText));
        this.setState({ kitties: JSON.parse(response._bodyText).kitties });
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  render() {
    const { navigation } = this.props;
    if (this.state.kitties === null) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#faa8ff',
        }}>
          <Image source={require('../../../AliceCore/Assets/uniswap.png')} style={{
            width: 80,
            height: 80,
            resizeMode: 'contain',
          }}/>
        </View>
      );
    }
    console.log('Kitties: ', this.state.kitties);
    const randomColor = [
      '#faf4d1',
      '#cef5d6',
      '#d4e7fe',
      '#dfdff9',
      '#f9e0f3',
      '#fee0e5',
      '#f9e1cb',
      '#eee9e8',
      '#c6eef9',
      '#eee1da',
      '#c6eef9',
    ];
    const breedTime = ['Snappy', 'Swift', 'Prodding', 'Slow'];
    return (
      <View style={{flex: 1}}>
        <View style={{margin: 20, marginTop: 50, marginBottom: 0, backgroundColor: 'transparent'}}>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate('Apps')}>
            <Image source={require('../../../AliceCore/Assets/back.png')} style={{ resizeMode: 'contain', width: 20, height: 20 }}/>
          </TouchableOpacity>
          <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10 }}>Swap</Text>
        </View>
        <ScrollView style={{
          flex: 1,
        }}>

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  kittyContainer: {
    margin: 10,
    maxWidth: 150,
    backgroundColor: 'white',
    shadowColor: '#cecece',
  },
});
