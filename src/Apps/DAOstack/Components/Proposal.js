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
    const gravatar = makeBlockie(proposal.proposer);
    const ProposalDescription = () => {
      if(proposal.description.length > 80){
        return (
          <Text styles={markdownStyles}>
            { proposal.description.slice(0, 80) }
          </Text>
        )
      }
      else {
        return (
          <Text numberOfLines={3} style={{ fontWeight: '700' }}>
            { proposal.description.slice(0, 80) }
          </Text>
        )
      }
    };
    return (
      <TouchableOpacity
        key={key}
        onPress={() => this.props.navigation.navigate('DAOstack/DetailedProposal', {proposal, proposer, beneficiary})}
        style={styles.daoBox}
      >
        <View style={{ padding: 15}}>
          <View style={{ flexDirection: 'row', marginBottom: 14 }}>
            <Image style={{width: 50, height: 50, borderRadius: 25, marginRight: 5 }} source={{uri: gravatar}}/>
            <View style={{flex: 1}}>
              <Countdown style={{ marginBottom: 7 }} timeTillDate={proposal.closingAt} />
              <Text style={{fontSize: 15, fontWeight: '700', flexWrap: 'wrap'}}>{proposal.title}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                <Proposer name={proposer ? proposer.name : null} proposal={proposal}/>
                <Image source={require('../Assets/transfer-icon.png')} style={{width: 12, height: 12, marginRight: 5, resizeMode: 'contain' }} />
                <Beneficiary name={beneficiary ? beneficiary.name : null} proposal={proposal}/>
              </View>
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
          <ContributionReward proposal={proposal}/>
          <VoteBreakdown totalRepWhenCreated={proposal.totalRepWhenCreated} votesFor={proposal.votesFor} votesAgainst={proposal.votesAgainst} proposal={proposal} />
        </View>
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

const markdownStyles = {
  blockQuoteSection: {
    flexDirection: 'row',
  },
  blockQuoteSectionBar: {
    width: 3,
    height: null,
    backgroundColor: '#DDDDDD',
    marginRight: 15,
  },
  codeBlock: {
    fontFamily: 'Courier',
    fontWeight: '500',
  },
  del: {
    textDecorationLine: 'line-through',
  },
  em: {
    fontStyle: 'italic',
  },
  heading: {
    fontWeight: '200',
  },
  heading1: {
    fontSize: 32,
  },
  heading2: {
    fontSize: 24,
  },
  heading3: {
    fontSize: 18,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 13,
  },
  heading6: {
    fontSize: 11,
  },
  hr: {
    backgroundColor: '#cccccc',
    height: 1,
  },
  image: {
    width: 320,
    height: 320,
  },
  inlineCode: {
    backgroundColor: '#eeeeee',
    borderColor: '#dddddd',
    borderRadius: 3,
    borderWidth: 1,
    fontFamily: 'Courier',
    fontWeight: 'bold',
  },
  link: {
    textDecorationLine: 'underline',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemNumber: {
    fontWeight: 'bold',
  },
  mailTo: {
    textDecorationLine: 'underline',
  },
  paragraph: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  listItemText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: '#222222',
  },
  strong: {
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 3,
  },
  tableHeader: {
    backgroundColor: '#222222',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tableHeaderCell: {
    color: '#ffffff',
    fontWeight: 'bold',
    padding: 5,
  },
  tableRow: {
    borderBottomWidth: 1,
    borderColor: '#222222',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tableRowLast: {
    borderColor: 'transparent',
  },
  tableRowCell: {
    padding: 5,
  },
  text: {
    color: '#222222',
  },
  u: {
    textDecorationLine: 'underline',
  },
  video: {
    width: 300,
    height: 300,
  },
  view: {
    minWidth: 1,
    minHeight: 1,
  },
};
