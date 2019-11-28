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
    console.log('vote: ', vote);

    try {
      if (vote === 'yes') {
        const txHash = await Contract.write({contractAddress: this.props.proposal.votingMachine, abi: VotingABI, functionName: 'vote', parameters: [this.props.proposal.id, 1, 0, "0x0000000000000000000000000000000000000000"], value: '0.0', data: '0x0'})
      }
      if (vote === 'no') {
        console.log('no: ', vote);
        const txHash = await Contract.write({contractAddress: this.props.proposal.votingMachine, abi: VotingABI, functionName: 'vote', parameters: [this.props.proposal.id, 0, 0, "0x0000000000000000000000000000000000000000"], value: '0.0', data: '0x0'})
      }
    } catch (e) {

    }

  };

  render() {
    const { totalRepWhenCreated, votesFor, votesAgainst } = this.props;
    const forRatio = this.state.width*this.state.forRatio || 0;
    const againstRatio = this.state.width*this.state.againstRatio || 0;
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
      }}>
          <TouchableOpacity onPress={() => this.vote('yes')}>
            <Image
              source={require('../Assets/thumbs-up.png')}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        <View onLayout={(event) => {
          var {x, y, width, height} = event.nativeEvent.layout;
          this.setState({x, y, width, height});
          console.log(x,y,width,height);
          console.log('state: ', this.state)
        }} style={{ width: '70%'}}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <View style={{width: forRatio, borderRadius: againstRatio ? 0 : 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: 40, backgroundColor: '#34a827', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{position: 'absolute', color: 'white', fontWeight: '800'}}>{ this.calculatePercentage(totalRepWhenCreated, votesFor) } %</Text>
              </View>
            </View>
            <View>
              <View style={{width: againstRatio, borderRadius: forRatio ? 0 : 10, borderTopRightRadius: 10, borderBottomRightRadius: 10, height: 40, backgroundColor: '#ff2b3f', alignItems: 'center', justifyContent: 'center'}}>
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
                width: 25,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
      </View>
    );
  }
}
