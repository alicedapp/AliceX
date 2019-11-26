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
import KittyScreen from './KittyScreen'

let { height, width } = Dimensions.get('window');

export default class MyKitties extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
    };
  };


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
          backgroundColor: 'white',
        }}>
          <Image source={require('../../../../Assets/cryptokitties.png')} style={{
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
          <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 25, marginTop: 10 }}>My Kitties</Text>
        </View>
        <ScrollView style={{
          flex: 1,
        }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', flex: 1, width }}>
            {this.state.kitties.map((kitty, count )=> {
              const randomBreed = Math.floor(Math.random()*4);
              let randomNumber = Math.floor(Math.random() * 11);
              if (count < 5) {
                return(
                  <TouchableOpacity key={count} onPress={() => navigation.navigate('KittyScreen', { kitty, randomNumber, randomBreed, backgroundColor: randomColor[randomNumber], breedTime: breedTime[randomBreed] })} style={styles.kittyContainer}>
                    <View style={{ alignItems: 'center' }}>
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
            })}
          </View>
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
