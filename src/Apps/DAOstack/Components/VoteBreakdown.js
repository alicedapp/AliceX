/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BN from 'bn.js';

export default class VoteBreakdown extends Component {
  constructor() {
    super();
  }
  calculatePercentage(totalReputation, reputation){
    let percentage = 0;
    totalReputation = new BN(totalReputation);
    reputation = new BN(reputation);
    if (totalReputation.gtn(0)) {
      const percentageBn = reputation.muln(10000).div(totalReputation);
      percentage = percentageBn.toNumber() / 100;
    }
    return percentage
  }
  render() {
    const { totalRepWhenCreated, votesFor, votesAgainst } = this.props;
    return (
      <View
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'space-around', margin: 17 }}>
          <Image
            source={require('../Assets/ethereum-logo.png')}
            style={{
              height: 15,
              resizeMode: 'contain',
            }}
          />
          <Text style={{ color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700' }}>
            ETH
          </Text>
          <Text style={{ color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700' }}>
            5
          </Text>
          <Text style={{ color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700' }}>
            REP
          </Text>
          <Text style={{ color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700' }}>
            0.22%
          </Text>
          <Image
            source={require('../Assets/dai-logo.png')}
            style={{
              height: 15,
              resizeMode: 'contain',
            }}
          />
          <Text style={{ color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700' }}>
            DAI
          </Text>
          <Text style={{ color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700' }}>
            150
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'space-between',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  source={require('../Assets/thumbs-up.png')}
                  style={{
                    height: 15,
                    resizeMode: 'contain',
                  }}
                />
              <Text>{ this.calculatePercentage(totalRepWhenCreated, votesFor) } %</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../Assets/thumbs-down.png')}
                  style={{
                    height: 15,
                    resizeMode: 'contain',
                  }}
                />
              <Text>{ this.calculatePercentage(totalRepWhenCreated, votesAgainst) } %</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
