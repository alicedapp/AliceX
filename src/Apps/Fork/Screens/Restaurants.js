import React from 'react';
import {
  Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import {NavigationBar} from "../../../AliceComponents/NavigationBar";

const { height, width } = Dimensions.get('window');

export default class Restaurants extends React.Component {
  state = {
    restaurants: ['japanese', 'american', 'mexican', 'italian', 'french'],
  }

  renderSwitch(restaurant) {
    switch (restaurant) {
      case 'japanese':
        return <Image source={require('../../../AliceAssets/sushi.png')} style={styles.restaurantImage}/>
      case 'american':
        return <Image source={require('../../../AliceAssets/fries.png')} style={styles.restaurantImage}/>
      case 'mexican':
        return <Image source={require('../../../AliceAssets/taco.png')} style={styles.restaurantImage}/>
      case 'italian':
        return <Image source={require('../../../AliceAssets/pizza.png')} style={styles.restaurantImage}/>
      case 'french':
        return <Image source={require('../../../AliceAssets/croissant.png')} style={styles.restaurantImage}/>
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <NavigationBar/>
        <View style={{
          margin: 20, marginTop: 50, marginBottom: 0, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center',
        }}>
          <TouchableOpacity style={{width: 35, height: 35}} onPress={() => navigation.navigate('Camera')}>
            <Image source={require('../../../AliceAssets/camera-emoji.png')} style={{ resizeMode: 'contain', width: 30, height: 30 }}/>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 20, marginBottom: 0, backgroundColor: 'transparent' }}>
          <Text style={{
            color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10,
          }}>Events</Text>
        </View>
        <View style={{
          flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width,
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu', {})} style={styles.kittyContainer}>
            <View style={[{ borderColor: this.state.borderColor }, styles.inputContainer]}>
              <Image source={require('../Assets/eth-new-york.png')} style={styles.restaurantImage}/>
              <Text style={{
                color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10,
              }}>ETH New York</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 20, marginBottom: 0, backgroundColor: 'transparent' }}>
          <Text style={{
            color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10,
          }}>Restaurants</Text>
        </View>
        <ScrollView style={{
          flex: 1,
        }}>
          <View style={{
            flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', flex: 1, width,
          }}>
            {this.state.restaurants.map((restaurant, count) => {
              if (count < 6) {
                return (
                  <TouchableOpacity key={count} onPress={() => navigation.navigate('Menu', {})} style={styles.kittyContainer}>
                    <View style={[{ borderColor: this.state.borderColor }, styles.inputContainer]}>
                      {this.renderSwitch(restaurant)}
                      <Text style={{
                        color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10,
                      }}>{restaurant.toUpperCase()}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        </ScrollView>

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
  restaurantImage: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    marginRight: 10,
  },
  kittyContainer: {
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#cecece',
  },
});
