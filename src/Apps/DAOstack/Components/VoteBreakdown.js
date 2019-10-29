/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BN from 'bn.js';
import { Contract } from "../../../AliceSDK/Web3";
import { VotingABI } from "../../VotezUp/ABI";
const { height, width } = Dimensions.get('window');

export default class VoteBreakdown extends Component {
  constructor() {
    super();
  }

  state = {
    forPercentage: 0,
    againstPercentage: 0,
  };

  async componentDidMount() {
    const { totalRepWhenCreated, votesFor, votesAgainst } = this.props;
    console.log();
    const forPercentage = await this.calculatePercentage(totalRepWhenCreated, votesFor);
    const againstPercentage = await this.calculatePercentage(totalRepWhenCreated, votesAgainst);
    const total = forPercentage + againstPercentage;
    const forRatio = forPercentage/total;
    const againstRatio = againstPercentage/total;

    console.log('for percentage on mount: ', forPercentage)
    console.log('against percentage on mount: ', againstPercentage )
    console.log('for ratio on mount: ', forRatio)
    console.log('against ratio on mount: ', againstRatio )
    console.log('total on mount: ', total )

    this.setState({forPercentage, againstPercentage, forRatio, againstRatio, total});

  }

  calculatePercentage = (totalReputation, reputation) => {
    let percentage = 0;
    totalReputation = new BN(totalReputation);
    reputation = new BN(reputation);
    if (totalReputation.gtn(0)) {
      const percentageBn = reputation.muln(10000).div(totalReputation);
      percentage = percentageBn.toNumber() / 100;
    }
    return percentage
  }

  vote = async (vote) => {
    console.log('state: ', this.props.proposal.id);
    try {
      if (vote === 'yes') {
        const txHash = await Contract.write({contractAddress: this.props.proposal.votingMachine, abi: VotingABI, functionName: 'vote', parameters: [this.props.proposal.id, 1, 0, "0x0000000000000000000000000000000000000000"], value: '0.0', data: '0x0'})
      }
      if (vote === 'no') {
        Contract.write({contractAddress: this.props.proposal.votingMachine, abi: VotingABI, functionName: 'vote', parameters: [this.props.proposal.id, 0, 0, "0x0000000000000000000000000000000000000000"], value: '0.0', data: '0x0'})
      }
    } catch (e) {

    }

  };

  render() {
    const { totalRepWhenCreated, votesFor, votesAgainst } = this.props;
    const forRatio = this.state.width*this.state.forRatio || 0;
    const againstRatio = this.state.width*this.state.againstRatio || 0;
    console.log('PROPOSAL ID: ', this.props.proposal)
    console.log('AGAINST RATIO: ', againstRatio);
    console.log('FOR RATIO: ', forRatio);
    console.log('for percentage: ', this.state.forRatio);
    console.log('against percentage: ', this.state.againstRatio);
    return (
      <View
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: width -30, marginBottom: 20}}
      >
        <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../Assets/ethereum-logo.png')}
              style={{
                height: 25,
                resizeMode: 'contain',
              }}
            />
            <View style={{alignItems: 'center', }}>
              <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
                ETH
              </Text>
              <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
                5
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
                REP
              </Text>
              <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
                0.22%
              </Text>
            </View>
            <Image
              source={require('../Assets/dai-logo.png')}
              style={{
                height: 25,
                resizeMode: 'contain',
              }}
            />
            <View style={{alignItems: 'center', }}>
              <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
                DAI
              </Text>
              <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
                150
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity onPress={() => this.vote('yes')}>
              <Image
                source={require('../Assets/thumbs-up.png')}
                style={{
                  height: 25,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <View onLayout={(event) => {
              var {x, y, width, height} = event.nativeEvent.layout;
              this.setState({x, y, width, height});
              console.log(x,y,width,height);
              console.log('state: ', this.state)
            }} style={{ width: width - 160}}>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <View style={{width: forRatio, borderRadius: 10, marginRight: -10, height: 40, backgroundColor: '#34a827', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{position: 'absolute', color: 'white', fontWeight: '800'}}>{ this.calculatePercentage(totalRepWhenCreated, votesFor) } %</Text>
                  </View>
                </View>
                <View>
                  <View style={{width: againstRatio, borderRadius: 10, marginLeft: -10, height: 40, backgroundColor: '#ff2b3f', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{position: 'absolute', color: 'white', fontWeight: '800'}}>{ this.calculatePercentage(totalRepWhenCreated, votesAgainst) } %</Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => this.vote('no')}>
              <Image
                source={require('../Assets/thumbs-down.png')}
                style={{
                  height: 25,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
