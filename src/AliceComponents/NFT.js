import {Animated, Image, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, View} from "react-native";
import React, {Component} from "react";
const { height, width } = Dimensions.get('window');
const cols = 2, rows = 3;

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

  render() {
    const {nft, key} = this.props;
    const { name, collection, background_color} = nft;
    return (
      <View key={key} style={{margin: 5, width: 100}}>
        <Animated.View style={{ transform: [
            {
              scale: this.state.animatePress
            }
          ]}}>
          <TouchableWithoutFeedback onPressIn={this.animateIn} onPressOut={this.animateOut}>
            <View>
              <View style={{...styles.nftContainer, backgroundColor: background_color ? '#'+ background_color : 'white',}}>
                <Image source={{uri: nft.image_thumbnail_url}} style={{width: 100, height: 100, resizeMode: 'contain'}}/>

              </View>
              <View style={{width: '100%', backgroundColor: 'white',}}>
                <Text style={{marginLeft: 3, fontSize: 15, fontWeight: '500' }} numberOfLines={1}>{name}</Text>
                <Text style={{marginLeft: 3, fontSize: 14, fontWeight: '300', color: '#aaaaaa'}}>{collection.name}</Text>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  nftContainer: {
    marginBottom: 5,
    borderRadius: 15,
    height: 140,
    width: 1400,
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
