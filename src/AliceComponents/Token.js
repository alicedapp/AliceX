import {Animated, Image, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, View} from "react-native";
import React, {Component} from "react";
const { height, width } = Dimensions.get('window');
const cols = 3, rows = 3;

export default class Token extends Component<Props> {
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
    const {tokenInfo, iterator, token} = this.props;
    return (
      <TouchableWithoutFeedback {...this.props} key={iterator} onPressIn={this.animateIn} onPressOut={this.animateOut}>
        <Animated.View  style={{...styles.tokenBox, transform: [
            {
              scale: this.state.animatePress
            }
          ]}}>
          {tokenInfo.image ?
            <View style={styles.tokenContainer}>
              <Image source={{uri: tokenInfo.image}} style={styles.tokenImage}/>
            </View> :
            <View style={styles.tokenContainer}>
              <Text style={{fontWeight: '600'}} >{tokenInfo.symbol.substring(0, 4)}</Text>
            </View>
          }
          <View style={{alignItems: 'flex-start', justifyContent: 'space-around'}}>
            <Text>{tokenInfo.name}</Text>
            <Text>{(parseInt(token.balance)/Math.pow(10, parseInt(tokenInfo.decimals))).toFixed(4)} {tokenInfo.symbol.substring(0, 4)}</Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  tokenBox: {
    flexDirection: 'row',
    width: '100%',
    margin: 8,

  },
  tokenContainer: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,

  },
  tokenImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },

})
