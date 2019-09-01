import React, { Component } from "react";
import { Animated, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";


export default class FloatingButton extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      animatePress: new Animated.Value(1)
    };

  }

  animateIn = () => {
    Animated.timing(this.state.animatePress, {
      toValue: 0.95,
      duration: 50
    }).start();
  };

  animateOut = () => {
    Animated.timing(this.state.animatePress, {
      toValue: 1,
      duration: 50
    }).start();

  };

  render() {
    const {tokenInfo, iterator, token} = this.props;
    return (
      <TouchableWithoutFeedback {...this.props} key={iterator} onPressIn={this.animateIn} onPressOut={this.animateOut}>
        <Animated.View  style={{...styles.button, ...this.props.style, position: 'absolute', bottom: 30, right: 12, zIndex: 1000, transform: [
            {
              scale: this.state.animatePress
            }
          ]}}>
          {this.props.children}
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    padding: 12,
    backgroundColor: '#3078CA',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,

  }

})
