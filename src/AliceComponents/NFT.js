import {Animated, Image, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, View} from "react-native";
import React, {Component} from "react";
const { height, width } = Dimensions.get('window');
const cols = 2, rows = 3;
import Lightbox from './Lightbox';

export default class NFT extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      animatePress: new Animated.Value(1)
    };

  }

  animateIn = () => {
    Animated.timing(this.state.animatePress, {
      toValue: 0.95,
      duration: 100
    }).start();
  };

  animateOut = () => {
    Animated.timing(this.state.animatePress, {
      toValue: 1,
      duration: 100
    }).start();
  };

  closeCallback;

  renderNFT = () => {
    const {nft, key, navigator} = this.props;
    const { name, collection, background_color} = nft;

    return (
      <Lightbox navigator={navigator} backgroundColor={'transparent'} renderContent={this.renderDetails} renderHeader={close => this.closeCallback = close}>
        <View onPress={this.closeCallback} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{...styles.nftContainer, backgroundColor: background_color ? '#'+ background_color : 'white',}}>
            <Image source={{uri: nft.image_thumbnail_url}} style={{width: 100, height: 100, resizeMode: 'contain'}}/>
          </View>
          <View style={{width: 140, backgroundColor: 'transparent', padding: 5}}>
            <Text style={{marginLeft: 3, fontSize: 15, fontWeight: '500' }} numberOfLines={1}>{name}</Text>
            <Text style={{marginLeft: 3, fontSize: 14, fontWeight: '300', color: '#aaaaaa'}}>{collection.name}</Text>
          </View>
        </View>
      </Lightbox>

    )
  }

  renderDetails = () => {
    const {nft, key, navigator} = this.props;
    const { name, collection, background_color} = nft;
    return (
      <TouchableWithoutFeedback onPress={this.closeCallback} style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
        <View style={{padding: 10, backgroundColor: 'white', borderRadius: 25,  alignItems: 'center', justifyContent: 'center' }}>
          <View style={{...styles.nftContainer, backgroundColor: background_color ? '#'+ background_color : 'white',}}>
            <Image source={{uri: nft.image_thumbnail_url}} style={{width: 100, height: 100, resizeMode: 'contain'}}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  };

  render() {
    return (
      <>
      {this.renderNFT()}
      </>
    )
  }
}

const styles = StyleSheet.create({
  nftContainer: {
    marginBottom: 5,
    borderRadius: 15,
    height: 140,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
})
