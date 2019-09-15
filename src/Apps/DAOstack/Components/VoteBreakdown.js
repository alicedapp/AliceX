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
          <Text style={{ color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700' }}>
            Voting Percentage
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AnimatedCircularProgress
              style={{ marginRight: 15 }}
              size={47}
              width={3}
              fill={80}
              tintColor="#06BE90"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#D8D8D8"
            >
              {fill => (
                <Image
                  source={require('../Assets/thumbs-up-green.png')}
                  style={{
                    height: 15,
                    resizeMode: 'contain',
                  }}
                />
              )}
            </AnimatedCircularProgress>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'space-between',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  source={require('../Assets/thumbs-up-grey.png')}
                  style={{
                    height: 15,
                    resizeMode: 'contain',
                  }}
                />
              <Text>{ this.calculatePercentage(totalRepWhenCreated, votesFor) } %</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../Assets/thumbs-down-grey.png')}
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
        <View style={{ height: 50, width: 1, backgroundColor: '#c9c9c9' }} />
        <View style={{ alignItems: 'center', justifyContent: 'space-around', margin: 17 }}>
          <Text style={{ color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700' }}>
            Votes
          </Text>
          <Text style={{}}>Pass</Text>
          <Text style={{}}>Fail</Text>
        </View>
      </View>
    );
  }
}
