import React, { Component } from "react";
import { Image } from "react-native";

type Props = {};
export default class Icon extends Component<Props> {
  render() {
    switch (this.props.icon) {
      default :
        return (
          <Image source={this.props.icon} style={{height: this.props.size, width: this.props.size, resizeMode: 'contain'}}/>
        );
      case 'HomeGrey' :
        return (
          <Image source={require('../Assets/home-grey.png')} style={{height: this.props.size, width: this.props.size, resizeMode: 'contain'}}/>
        );
      case 'ActivityGrey' :
        return (
          <Image source={require('../Assets/send-button.png')} style={{height: this.props.size, width: this.props.size, resizeMode: 'contain'}}/>
        );
      case 'HomeBlack' :
        return (
          <Image source={require('../Assets/home-black.png')} style={{height: this.props.size, width: this.props.size, resizeMode: 'contain'}}/>
        );
      case 'AvatarBlack' :
        return (
          <Image source={require('../Assets/avatar.png')} style={{height: this.props.size, width: this.props.size, resizeMode: 'contain'}}/>
        );
    }
  }
}
