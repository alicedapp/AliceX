import React from 'react';
import { Dimensions, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
let { height, width } = Dimensions.get('window');

const KittyDapplet = (kitty, randomNumber, randomBreed) => {
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
    <TouchableOpacity onPress={Keyboard.dismiss} style={styles.kittyContainer}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 14 }}>{kitty.name}</Text>
        <View style={{
          width: 150, height: 150, borderRadius: 20, backgroundColor: randomColor[randomNumber],
        }}>
          <Image source={{ uri: kitty.image_url_png }} style={{ resizeMode: 'contain', width: 170, height: 170 }}/>
        </View>
        <View style={{width: 150, alignItems: 'flex-start', paddingLeft: 5}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{
              color: 'black', fontFamily: 'Avenir-Black', fontSize: 15, fontWeight: 'bold',
            }}>#</Text>
            <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 12 }}>{kitty.id}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../../../Assets/dna.png')} style={{
              resizeMode: 'contain', width: 12, height: 12, marginRight: 5,
            }}/>
            <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 12 }}>Gen {kitty.generation}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../../../Assets/clock-circular-outline.png')} style={{
              resizeMode: 'contain', width: 12, height: 12, marginRight: 5,
            }}/>
            <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 12 }} numberOfLines={1}>{breedTime[randomBreed]}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default class KittyScreen extends React.Component {

  render() {
    const { navigation } = this.props;
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
    const {kitty, randomNumber, randomBreed, backgroundColor, breedTime} = navigation.state.params;

    return (
      <View style={{flex: 1}}>
        <View style={{margin: 20, marginTop: 50, marginBottom: 0, backgroundColor: 'transparent'}}>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate('Apps')}>
            <Image source={require('../../../../Assets/back-button.png')} style={{ resizeMode: 'contain', width: 20, height: 20 }}/>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
            <Image source={require('../../../../Assets/cryptokitties-tag.png')} style={{
              resizeMode: 'contain', width: 20, height: 20, marginRight: 5,
            }}/>
            <Text style={{ color: '#9C9C9B', fontFamily: 'Avenir-Black', fontSize: 20, marginRight: 5, fontWeight: '700' }}>Buy</Text>
            <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 20, marginRight: 5, fontWeight: '700' }}>0.044 ETH</Text>
          </View>
        </View>
        <ScrollView style={{
          flex: 1,
        }} contentContainerStyle={{alignItems: 'center'}}>
          <View style={styles.kittyContainer}>
            <View style={{ flexDirection: 'column', }}>
              <View style={{ padding: 20, borderRadius: 20, backgroundColor: randomColor[randomNumber] }}>
                <Image source={{ uri: kitty.image_url_png }} style={{ resizeMode: 'contain', width: 300, height: 300 }}/>
              </View>
              <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10, marginRight: 5 }}>{kitty.name}</Text>
              <View style={{ flexDirection: 'row', width: 300, marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                      color: '#9C9C9B', fontFamily: 'Avenir-Black', fontSize: 20, fontWeight: 'bold',
                    }}>#</Text>
                    <Text style={{ color: '#9C9C9B', fontFamily: 'Avenir-Black', fontSize: 20, fontWeight: '700' }}>{kitty.id}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../../Assets/dna.png')} style={{
                      resizeMode: 'contain', width: 15, height: 15, marginRight: 5,
                    }}/>
                    <Text style={{ color: '#9C9C9B', fontFamily: 'Avenir-Black', fontSize: 20, fontWeight: '700' }}>Gen {kitty.generation}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../../Assets/clock-circular-outline.png')} style={{
                      resizeMode: 'contain', width: 15, height: 15, marginRight: 5,
                    }}/>
                    <Text style={{ color: '#9C9C9B', fontFamily: 'Avenir-Black', fontSize: 20, fontWeight: '700' }} numberOfLines={1}>{breedTime}</Text>
                  </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image source={{ uri: 'https://www.cryptokitties.co/profile/profile-'+kitty.owner.image+'.png'}} style={{ resizeMode: 'contain', width: 40, height: 40, marginRight: 10 }}/>
                <View>
                  <Text style={{color: 'black', fontFamily: 'Avenir-Black', fontSize: 15, fontWeight: '700'}} numberOfLines={1}>{kitty.owner.nickname}</Text>
                  <Text style={{color: '#9C9C9B', fontFamily: 'Avenir-Black', fontSize: 15, fontWeight: '700'}}>Owner</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={() => console.log('hello')}
                                    style={{flexDirection: 'row', padding: 12, height: 50, borderRadius: 5, borderWidth: 2, marginRight: 8, borderColor: '#e7e6e4', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require('../../../../Assets/heart-outline.png')} style={{ resizeMode: 'contain', width: 20, height: 20, marginRight: 5 }}/>
                    <Text style={{fontFamily: 'Avenir-Black', color: '#575553', fontSize: 15}}>{Math.floor(Math.random()*5)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log('hello')}
                                    style={{flexDirection: 'row', padding: 12, height: 50, borderRadius: 5, borderWidth: 2, borderColor: '#e7e6e4', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require('../../../../Assets/share.png')} style={{ resizeMode: 'contain', width: 20, height: 20 }}/>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SendSheet', { dappletData: {component: () => KittyDapplet(kitty, randomNumber, randomBreed)}, kitty, randomNumber, randomBreed, address: kitty.owner.address, asset: 'ETH', assetAmount: '0.044' })}
                                  style={{padding: 12, height: 50, borderRadius: 5, borderWidth: 2, borderBottomWidth: 4, borderColor: '#e7e6e4', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Avenir-Black', color: '#575553', fontSize: 15}}>Make Offer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{width, marginRight: 30, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={() => navigation.navigate('SendSheet', { dappletData: {component: () => KittyDapplet(kitty, randomNumber, randomBreed)}, kitty, randomNumber, randomBreed, address: kitty.owner.address, asset: 'ETH', assetAmount: '0.044' })}
                              style={{width: 100, height: 50, borderRadius: 5, borderWidth: 2, borderBottomWidth: 4, marginTop: 5, borderColor: '#db6a19', backgroundColor: '#ffa039', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontFamily: 'Avenir-Black', color: 'white', fontSize: 15}}>Buy Now</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
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
