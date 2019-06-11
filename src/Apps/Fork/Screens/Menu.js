import React from 'react';
import {
  Dimensions, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ForkDapplet = (food, price) => {
  const sendOrder = () => {
    Keyboard.dismiss();
  };

  const order = () => {
    if (food === "Hamburger") {
      return (
        <View style={[{ borderColor: '#afafaf' }, styles.inputContainer]} >
          <Image source={require('../../../Assets/emoji-hamburger.png')} style={styles.restaurantImage}/>
          <Text style={{ color: '#727272', fontFamily: 'Avenir-Black', fontSize: 15 }}>X1</Text>
          <Text style={{ color: '#727272', fontFamily: 'Avenir-Black', fontSize: 15 }}>{price} DAI</Text>
        </View>
      )
    } else if (food === "Hot Dog") {
      return (
        <View style={[{ borderColor: '#afafaf' }, styles.inputContainer]} >
          <Image source={require('../../../Assets/hotdog.png')} style={styles.restaurantImage}/>
          <Text style={{ color: '#727272', fontFamily: 'Avenir-Black', fontSize: 15 }}>X1</Text>
          <Text style={{ color: '#727272', fontFamily: 'Avenir-Black', fontSize: 15 }}>{price} DAI</Text>
        </View>
      )
    } else if (food === "Beer") {
      return (
        <View style={[{ borderColor: '#afafaf' }, styles.inputContainer]} >
          <Image source={require('../../../Assets/beer.png')} style={styles.restaurantImage}/>
          <Text style={{ color: '#727272', fontFamily: 'Avenir-Black', fontSize: 15 }}>X1</Text>
          <Text style={{ color: '#727272', fontFamily: 'Avenir-Black', fontSize: 15 }}>{price} DAI</Text>
        </View>
      )
    } else if (food === "Fries") {
      return (
        <View style={[{ borderColor: '#afafaf' }, styles.inputContainer]} >
          <Image source={require('../../../Assets/fries.png')} style={styles.restaurantImage}/>
          <Text style={{ color: '#727272', fontFamily: 'Avenir-Black', fontSize: 15 }}>X1</Text>
          <Text style={{ color: '#727272', fontFamily: 'Avenir-Black', fontSize: 15 }}>{price} DAI</Text>
        </View>
      )
    }
  }

  return (
    <TouchableOpacity onPress={sendOrder} style={styles.kittyContainer}>
      <View style={{ alignItems: 'flex-start', flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../../Assets/fork-logo.png')} style={{
            borderRadius: 20, height: 40, justifyContent: 'center', width: 40, resizeMode: 'contain',
          }}/>
          <Text style={{
            marginLeft: 10, color: 'black', fontFamily: 'Avenir-Black', fontSize: 14,
          }}>Fork</Text>
        </View>
        <Text style={{
          color: 'black', fontFamily: 'Avenir-Black', fontSize: 20, margin: 20,
        }}>Your Order</Text>
        {order()}
      </View>
    </TouchableOpacity>
  );
};

export default class Menu extends React.Component {
  state = {
    restaurants: ['japanese', 'american', 'mexican', 'italian', 'french'],
  }


  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={{
          margin: 20, marginTop: 50, marginBottom: 0, backgroundColor: 'transparent',
        }}>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate('Apps')}>
            <Image source={require('../../../Assets/back-button.png')} style={{ resizeMode: 'contain', width: 20, height: 20 }}/>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 20, marginBottom: 0, backgroundColor: 'transparent' }}>
          <Text style={{
            color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10,
          }}>Menu</Text>
        </View>
        <ScrollView style={{
          flex: 1,
        }}>
          <View style={{
            flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', flex: 1, width,
          }}>
            <TouchableOpacity onPress={() => navigation.navigate('SendSheet', {
              dappletData: { component: () => ForkDapplet('Hamburger', '10') }, address: '0x89FFF8C75AE3f84B107e1C704c3147a8414Dd417', isContract: true, asset: 'ETH', foodItem: 'Hamburger', assetAmount: '0.001',
            })} style={styles.kittyContainer}>
              <View style={[{ borderColor: this.state.borderColor }, styles.inputContainer]}>
                <View>
                  <Image source={require('../../../Assets/emoji-hamburger.png')} style={styles.restaurantImage}/>
                  <Text style={{
                    color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10,
                  }}>Hamburger</Text>
                </View>
                <View style={{
                  flexDirection: 'row', width: 100, height: 40, borderRadius: 25, alignItems: 'center', backgroundColor: '#fafafa', borderColor: '#cccccc', borderWidth: 1, justifyContent: 'center',
                }}>
                  <Text>10 DAI</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SendSheet', {
              dappletData: { component: () => ForkDapplet('Fries', '5') }, address: '0x89FFF8C75AE3f84B107e1C704c3147a8414Dd417', isContract: true, asset: 'ETH', foodItem: 'Fries', assetAmount: '0.001',
            })} style={styles.kittyContainer}>
              <View style={[{ borderColor: this.state.borderColor }, styles.inputContainer]}>
                <View>
                  <Image source={require('../../../Assets/fries.png')} style={styles.restaurantImage}/>
                  <Text style={{
                    color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10,
                  }}>Fries</Text>
                </View>
                <View style={{
                  flexDirection: 'row', width: 100, height: 40, borderRadius: 25, alignItems: 'center', backgroundColor: '#fafafa', borderColor: '#cccccc', borderWidth: 1, justifyContent: 'center',
                }}>
                  <Text>5 DAI</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SendSheet', {
              dappletData: { component: () => ForkDapplet('Hot Dog', '8') }, address: '0x89FFF8C75AE3f84B107e1C704c3147a8414Dd417', isContract: true, asset: 'ETH', foodItem: 'Hot Dog', assetAmount: '0.001',
            })} style={styles.kittyContainer}>
              <View style={[{ borderColor: this.state.borderColor }, styles.inputContainer]}>
                <View>
                  <Image source={require('../../../Assets/hotdog.png')} style={styles.restaurantImage}/>
                  <Text style={{
                    color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10,
                  }}>Hot Dog</Text>
                </View>
                <View style={{
                  flexDirection: 'row', width: 100, height: 40, borderRadius: 25, alignItems: 'center', backgroundColor: '#fafafa', borderColor: '#cccccc', borderWidth: 1, justifyContent: 'center',
                }}>
                  <Text>8 DAI</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SendSheet', {
              dappletData: { component: () => ForkDapplet('Beer', '4') }, address: '0x89FFF8C75AE3f84B107e1C704c3147a8414Dd417', isContract: true, asset: 'ETH', foodItem: 'Beer', assetAmount: '0.001',
            })} style={styles.kittyContainer}>
              <View style={[{ borderColor: this.state.borderColor }, styles.inputContainer]}>
                <View>
                  <Image source={require('../../../Assets/beer.png')} style={styles.restaurantImage}/>
                  <Text style={{
                    color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10,
                  }}>Beer</Text>
                </View>
                <View style={{
                  flexDirection: 'row', width: 100, height: 40, borderRadius: 25, alignItems: 'center', backgroundColor: '#fafafa', borderColor: '#cccccc', borderWidth: 1, justifyContent: 'center',
                }}>
                  <Text>4 DAI</Text>
                </View>
              </View>
            </TouchableOpacity>
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
    justifyContent: 'space-between',
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
