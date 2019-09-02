/*
* This is a boilerplate structure to get you through the process of building your first app with Alice
* We've included all the necessary features for you to build out your entire application using the
* Camera,
* Push Notifications,
* Maps,
* Payments,
*
* And all the navigation necessary for you to build a full feature app.
*
* Please see the documentation for more info on how to build out more features into Alice.
* */

// import { createBottomTabNavigator } from 'react-navigation';
// import Map from './Screens/Map'
// import Home from './Screens/Home'
// import Camera from './Screens/Camera'
//
// export default createBottomTabNavigator({
// 	// Your ExampleMaps's Tab Navigator's names are defined here as a default
// 	Home: Home,
// 	Maps: Map,
// 	Camera: Camera
// });
//

import React, { Component } from 'react';

import {
  Text, View, Image, ImageBackground, Dimensions, TouchableOpacity, StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';


const { height, width } = Dimensions.get('window');


class HomeScreen extends Component {

  state = {
    modalVisible: false,
  };

  placeOrder = () => this.setState({ modalVisible: true });

  closeModal = () => {
    console.log('closing');
    this.setState({ modalVisible: false });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <ImageBackground source={require('./Assets/local-ethereum.png')} style={{
          height: 400, marginTop: -40, width: width + 175, resizeMode: 'contain', padding: 100, paddingTop: 90,
        }}>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate('Apps')}>
            <Image source={require('../../AliceCore/Assets/back.png')} style={{ resizeMode: 'contain', width: 20, height: 20 }}/>
          </TouchableOpacity>
        </ImageBackground>
        <View style={{ width, flex: 1 }}>
          <View style={{ marginBottom: 10, marginLeft: 15 }}>
            <Text style={{ fontSize: 17, color: 'grey' }}>I want to </Text>
            <Text style={{
              fontSize: 30, color: '#16002C', fontWeight: '600', textDecorationLine: 'underline', textDecorationColor: 'grey',
            }}>Sell 1 ETH </Text>
          </View>
          <View style={{ marginBottom: 10, marginLeft: 15 }}>
            <Text style={{ fontSize: 17, color: 'grey' }}>and pay with </Text>
            <Text style={{
              fontSize: 30, color: '#16002C', fontWeight: '600', textDecorationLine: 'underline', textDecorationColor: 'grey',
            }}>Cash </Text>
          </View>
          <View style={{ marginBottom: 10, marginLeft: 15 }}>
            <Text style={{ fontSize: 17, color: 'grey' }}>In </Text>
            <Text style={{
              fontSize: 30, color: '#16002C', fontWeight: '600', textDecorationLine: 'underline', textDecorationColor: 'grey',
            }}>Sydney, Australia </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Buyers')} style={{
          width: width - 40, height: 50, backgroundColor: '#6633c8', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15,
        }}>
          <Text style={{
            color: 'white', fontSize: 20, alignItems: 'center', justifyContent: 'center', marginRight: 20,
          }}>Find Buyers near me </Text>
          <Image source={require('./Assets/location.png')} style={{ resizeMode: 'contain', width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
    );
  }
}

class BuyScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('./Assets/search.png')} size={30}/>,
    };
  };

  state = {
    modalVisible: false,
  };

  placeOrder = () => this.setState({ modalVisible: true });

  closeModal = () => {
    console.log('closing');
    this.setState({ modalVisible: false });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <ImageBackground source={require('./Assets/local-ethereum.png')} style={{
          height: 400, marginTop: -40, width: width + 175, resizeMode: 'contain', padding: 100, paddingTop: 90,
        }}>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate('Apps')}>
            <Image source={require('../../AliceCore/Assets/back.png')} style={{ resizeMode: 'contain', width: 20, height: 20 }}/>
          </TouchableOpacity>
        </ImageBackground>
        <View style={{
          width, flex: 1, padding: 30, marginTop: -100,
        }}>
          <View style={styles.box}>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>ETHTRADER_SG</Text>
            <Text style={{ fontSize: 15, fontWeight: '400' }}>Wants to buy 1 ETH for $120 USD</Text>
            <TouchableOpacity onPress={this.placeOrder} style={{
              width: '100%', height: 50, backgroundColor: '#6633c8', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15,
            }}>
              <Text style={{
                color: 'white', fontSize: 20, alignItems: 'center', justifyContent: 'center', marginRight: 20,
              }}>Place Funds in Escrow</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>bambii</Text>
            <Text style={{ fontSize: 15, fontWeight: '400' }}>Wants to buy 1 ETH for $80 USD</Text>
            <TouchableOpacity onPress={this.placeOrder} style={{
              width: '100%', height: 50, backgroundColor: '#6633c8', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15,
            }}>
              <Text style={{
                color: 'white', fontSize: 20, alignItems: 'center', justifyContent: 'center', marginRight: 20,
              }}>Place Funds in Escrow</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal app={'ethereum'} isVisible={this.state.modalVisible} onBackdropPress={this.closeModal} closeModal={this.closeModal}/>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('./Assets/house.png')} size={30}/>,
    };
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Trading Coming Soon!</Text>
      </View>
    );
  }
}

const HomeScreen2 = createStackNavigator({
    Home: {
      screen: HomeScreen,
    },
    Buyers: {
      screen: BuyScreen,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('./Assets/search.png')} size={30}/>,
    },
  });


export default createBottomTabNavigator({
    Home: HomeScreen2,
    Trade: SettingsScreen,
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: 'white',
        borderTopColor: 'transparent',
      },
      indicatorStyle: {
        backgroundColor: '#eee',
      },
    },
  });

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  box: {
    width: width - 60,
    height: 170,
    borderRadius: 15,
    marginBottom: 10,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    shadowColor: '#363636',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
});
