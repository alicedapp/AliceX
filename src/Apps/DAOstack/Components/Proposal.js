/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import makeBlockie from 'ethereum-blockies-base64';
import Markdown from 'react-native-simple-markdown';

import { Countdown, Proposer, Beneficiary, ContributionReward, VoteBreakdown } from './'
import { Settings } from '../../../AliceSDK/Web3';

const { height, width } = Dimensions.get('window');

export default class Proposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      daos: [],
    };
  }

  render() {
    const { proposal, key, proposer, beneficiary } = this.props;
    const gravatar = makeBlockie(proposal.proposer)
    const ProposalDescription = () => {
      if(proposal.description.length > 80){
        return (
          <Markdown>
            { proposal.description.slice(0, 80) }
          </Markdown>
        )
      }
      else {
        return (
          <Text numberOfLines={3} style={{ fontWeight: '700' }}>
            { proposal.description.slice(0, 80) }
          </Text>
        )
      }
    }
    return (
      <TouchableOpacity
        key={key}
        onPress={() => this.props.navigation.navigate('DetailedProposal', {proposal, proposer, beneficiary})}
        style={styles.daoBox}
      >
        <View style={{ width: '100%', padding: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
          <View style={{ flexDirection: 'row', marginBottom: 14 }}>
            <Image style={{width: 50, height: 50, borderRadius: 25, marginRight: 5 }} source={{uri: gravatar}}/>
            <View style={{width: '100%'}}>
              <Countdown style={{ marginBottom: 7 }} timeTillDate={proposal.closingAt} />
              <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                <Proposer name={proposer ? proposer.name : null} proposal={proposal}/>
                <Image source={require('../Assets/transfer-icon.png')} style={{width: 12, height: 12, marginRight: 5, resizeMode: 'contain' }} />
                <Beneficiary name={beneficiary ? beneficiary.name : null} proposal={proposal}/>
              </View>
              <Text numberOfLines={1} style={{fontSize: 15, fontWeight: '700', width: '100%'}}>{proposal.title}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: width - 70,
              marginBottom: 10,
            }}
          >
            { proposal.description ? <ProposalDescription /> : null }
          </View>
        </View>
        <ContributionReward proposal={proposal}/>
        <VoteBreakdown totalRepWhenCreated={proposal.totalRepWhenCreated} votesFor={proposal.votesFor} votesAgainst={proposal.votesAgainst} proposal={proposal} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  daoBox: {
    width: width - 20,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});
