import {Animated, Image, StyleSheet, TouchableWithoutFeedback} from "react-native";
import React, {Component} from "react";

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
    this.props.onPress()
    Animated.timing(this.state.animatePress, {
      toValue: 1,
      duration: 50
    }).start();

  };

  render() {
    const {tokenInfo, iterator, token} = this.props;
    console.log('BUTTON PROPS: ', this.props);
    return (
      <TouchableWithoutFeedback key={iterator} onPressIn={this.animateIn} onPressOut={this.animateOut}>
        <Animated.View  style={{...this.props.style, transform: [
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
    padding: 10,
  }
})
