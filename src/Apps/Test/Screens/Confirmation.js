import React from 'react';
import {
  Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default class Restaurants extends React.Component {
  state = {
    restaurants: ['japanese', 'american', 'mexican', 'italian', 'french'],
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={{
          margin: 20, marginTop: 50, marginBottom: 0, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <TouchableOpacity style={{ width: 25, height: 25 }} onPress={() => navigation.navigate('Apps')}>
            <Image source={require('../../../Assets/back-button.png')} style={{ resizeMode: 'contain', width: 20, height: 20 }}/>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 35, height: 35 }} onPress={() => navigation.navigate('Camera')}>

          </TouchableOpacity>
        </View>
        <View style={{ margin: 20, marginBottom: 0, backgroundColor: 'transparent' }}>
          <Text style={{
            color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10,
          }}>Transaction Successful 👍</Text>
        </View>
        <View style={{
          flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width,
        }}>
          <View onPress={() => navigation.navigate('Menu', {})} style={styles.orderCard}>
            <Text style={{
              color: 'black', fontFamily: 'Avenir-Black', fontSize: 17, marginTop: 10,
            }}>You've been rewarded a CryptoKitty</Text>
            <View style={{}}>
              <Image source={require('../Assets/cryptokitty.png')} style={styles.restaurantImage}/>
            </View>
          </View>
          <View onPress={() => navigation.navigate('Menu', {})} style={styles.orderCard}>
            <Text style={{
              color: 'black', fontFamily: 'Avenir-Black', fontSize: 17, marginTop: 10,
            }}>Welcome to ETH New York: POAP Token</Text>
            <View style={{}}>
              <Image source={require('../Assets/eth-new-york.png')} style={styles.restaurantImage}/>
            </View>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 60,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#2f80ed',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  orderCard: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    width: 250,
    shadowColor: '#2f80ed',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  restaurantImage: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
    marginRight: 10,
  },
  kittyContainer: {
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#cecece',
  },
});
