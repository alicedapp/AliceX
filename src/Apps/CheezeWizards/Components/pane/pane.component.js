// @flow
import React, {Component} from "react";
import {TouchableWithoutFeedback} from 'react-native';

type Props = {
  isBeingDragged: boolean
}
export default class Pane extends Component<Props> {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        style={{
          width: this.props.width,
          height: this.props.height,
          alignItems: 'center',
          transform: this.props.isBeingDragged ? "scale(1.2)" : "scale(1)",
          margin: 5
        }}>
        {this.props.children}
      </TouchableWithoutFeedback>
    )
  }
}

Pane.defaultProps = {
  isBeingDragged: false
};

