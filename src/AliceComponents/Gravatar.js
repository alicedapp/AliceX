import React, { Component } from 'react';
import { Image } from 'react-native';
var gravatarApi = require('gravatar-api');

export default class Gravatar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image style={[{width: 50, height:50}, this.props.style]}
             source={{uri:gravatarApi.imageUrl(this.props.options)}} />
    );
  }
}
