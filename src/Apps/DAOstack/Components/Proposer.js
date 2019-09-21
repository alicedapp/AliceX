import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default class Proposer extends Component {
  constructor() {
    super();
  }

  render() {
    const { name, proposal } = this.props;
    return (
      <>
        <Text numberOfLines={1} style={{ width: width / 2, fontWeight: '700' }}>
          { name ? name : `No profile found for ${proposal.proposer.slice(0,15)}` }
        </Text>
      </>
    );
  }
}
