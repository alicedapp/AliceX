import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default class Beneficiary extends Component {
  constructor() {
    super();
  }

  render() {
    const { name, proposal } = this.props;
    return (
      <Text numberOfLines={1} style={{ fontSize: 15, color: '#909090', fontWeight: '600' }}>
        { name ? name : proposal.proposer }
      </Text>
    );
  }
}
