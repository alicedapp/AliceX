/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import makeBlockie from 'ethereum-blockies-base64';
import Markdown from 'react-native-simple-markdown'


import { Countdown, Proposer, Beneficiary, ContributionReward, VoteBreakdown, JoinModal } from '../Components'
import { Settings } from '../../../AliceSDK/Web3';

const { height, width } = Dimensions.get('window');

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
export default class DetailedProposal extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;

    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      daos: [],
      modalVisible: false
    };
  }

  toggleJoinModal = () => {
    ReactNativeHapticFeedback.trigger('selection', options);
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  newProposal = () => {
    this.toggleJoinModal();
    const { dao, backgroundColor } = this.props.navigation.state.params;
    this.props.navigation.navigate('DAOstack/NewProposal', { dao, backgroundColor });
  };

  onVoteInterceptor = (vote) => {
    if(this.state.viewerIsMember) {
      return true;
    }

    this.toggleJoinModal()
    return false;
  }

  render() {
    const { proposal, proposer, beneficiary, viewerIsMember, daoId } = this.props.navigation.state.params;
    this.state.viewerIsMember = viewerIsMember;
    this.state.daoId = daoId;
    console.log('PROPOSAL PROPS: ', this.props)
    const gravatar = makeBlockie(proposal.proposer);
    return (
      <View
        style={styles.container}
      >
          <View style={{ flex: 1, padding: 15 }}>
            <View style={{ flexDirection: 'column', marginBottom: 14 }}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 25, fontWeight: '700', flex: 1}}>{proposal.title}</Text>
                {!!proposal.url && <TouchableOpacity onPress={() => Settings.openBrowser(proposal.url)}>
                  <Image
                    source={require('../Assets/link-icon.png')}
                    style={{
                      height: 30,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>}
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap',}}>
                <View style={{ flexDirection: 'row',}}>
                  <Image style={{width: 20, height: 20, borderRadius: 10, marginRight: 5 }} source={{uri: gravatar}}/>
                  <Proposer name={proposer ? proposer.name : null} proposal={proposal}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', width: '95%', marginBottom: 10}}>
                  <Image source={require('../Assets/transfer-icon.png')} style={{width: 12, height: 12, marginRight: 5, marginLeft: 20, resizeMode: 'contain' }} />
                  <Beneficiary name={beneficiary ? beneficiary.name : null} proposal={proposal}/>
                </View>
                <Countdown style={{ marginBottom: 7 }} timeTillDate={proposal.closingAt} />
                { proposal.description ? <Text style={{fontSize: 20}}>{ proposal.description }</Text> : null }
              </View>
              <ContributionReward proposal={proposal}/>
              <View style={{height: 90}}/>
            </ScrollView>
          </View>
        <View style={{width: '90%', position: 'absolute', bottom: 50}}>
          <VoteBreakdown totalRepWhenCreated={proposal.totalRepWhenCreated} votesFor={proposal.votesFor} votesAgainst={proposal.votesAgainst} proposal={proposal} onVote={this.onVoteInterceptor}/>
        </View>
        <JoinModal
          isVisible={this.state.modalVisible}
          backdropOpacity={0.3}
          onBackdropPress={this.toggleJoinModal}
          onJoinPress={this.newProposal}
          style={{ alignSelf: 'center' }}>
        </JoinModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
