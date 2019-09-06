/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Modal, Proposal, FloatingButton, Button } from '../Components';
import { NavigationBar } from '../../../AliceCore/Components/NavigationBar';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const { height, width } = Dimensions.get('window');

const PROPOSALS_QUERY = gql`
  query Proposal($id: ID!) {
    dao(id: $id) {
      id
      name
      reputationHoldersCount
      proposals {
        id
        stage
        proposer
        createdAt
        preBoostedAt
        closingAt
        title
        votes {
          id
          voter
        }
        votesFor
        votesAgainst
        url
        contributionReward {
          id
          name
          reputationHoldersCount
          nativeReputation {
            id
            totalSupply
          }
          proposals {
              id
              stage
              proposer
              createdAt
              preBoostedAt
              closingAt
              title
              votes {
                  id
                  voter
              }
              votesFor
              votesAgainst
              url
              contributionReward {
                  id
                  beneficiary
                  ethReward
                  externalToken
                  externalTokenReward
                  reputationReward
              }
          }
        }
      }
    }
  }
`;

export default class Proposals extends Component {
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
      modalVisible: false,
      boostedAmount: 0,
      pendingAmount: 0,
      regularAmount: 0,
    };
  }

  newProposal = () => {
    ReactNativeHapticFeedback.trigger('selection', options);
    this.props.navigation.navigate('NewProposal');
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  toggleModal = () => {
    ReactNativeHapticFeedback.trigger('selection', options);
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render() {
    const { dao, backgroundColor } = this.props.navigation.state.params;
    let boostedAmount = 0;
    let pendingAmount = 0;
    let regularAmount = 0;
    return (
      <View style={{ flex: 1, paddingTop: 50 }}>
        <NavigationBar />
        <Query query={PROPOSALS_QUERY} variables={{ id: dao.id }}>
          {({ loading, error, data }) => {
            console.log('data', data);
            if (error) return <Text>Can't fetch Proposals</Text>;
            if (loading)
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                  }}
                >
                  <Text style={{ fontSize: 30, fontFamily: 'Didot' }}>Loading ...</Text>
                </View>
              );
            return (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: 15,
                  }}
                >
                  <Text style={{ fontSize: 30, fontWeight: '700' }}>{dao.name}</Text>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      borderWidth: 5,
                      borderColor: 'rgba(255,255,255,0.5)',
                      backgroundColor,
                    }}
                  />
                </View>
                <ScrollView>
                  <Text style={{ margin: 15, fontSize: 20, color: 'grey', fontWeight: '600' }}>
                    Boosted Proposals({boostedAmount})
                  </Text>
                  <View style={styles.container}>
                    {data.dao.proposals.map((proposal, i) => {
                      if (proposal.stage === 'Boosted') {
                        boostedAmount += 1;
                        return <Proposal key={i} proposal={proposal} />;
                      }
                    })}
                    <Text style={{ margin: 15, fontSize: 20, color: 'grey', fontWeight: '600' }}>
                      Pending Proposals({pendingAmount})
                    </Text>
                    {data.dao.proposals.map((proposal, i) => {
                      if (proposal.stage === 'PreBoosted') {
                        pendingAmount += 1;
                        return <Proposal key={i} proposal={proposal} />;
                      }
                    })}
                    <Text style={{ margin: 15, fontSize: 20, color: 'grey', fontWeight: '600' }}>
                      Regular Proposals({regularAmount})
                    </Text>
                    {data.dao.proposals.map((proposal, i) => {
                      if (proposal.stage === 'Queued') {
                        regularAmount += 1;
                        return <Proposal key={i} proposal={proposal} />;
                      }
                    })}
                  </View>
                </ScrollView>
              </>
            );
          }}
        </Query>
        <FloatingButton onPress={this.toggleModal}>
          <Image
            source={require('../Assets/plus.png')}
            style={{
              height: 29,
              width: 29,
              resizeMode: 'contain',
            }}
          />
        </FloatingButton>
        <Modal
          isVisible={this.state.modalVisible}
          backdropOpacity={0.3}
          onBackdropPress={this.toggleModal}
          style={{ alignSelf: 'center' }}
        >
          <View
            style={{
              width: width - 50,
              backgroundColor: 'white',
              padding: 20,
              alignItems: 'center',
              borderRadius: 20,
            }}
          >
            <Image
              source={require('../Assets/community.png')}
              style={{
                height: width - 180,
                resizeMode: 'contain',
              }}
            />
            <Text style={{ fontWeight: '800', fontSize: 20, marginTop: 5, marginBottom: 15 }}>
              Join us!
            </Text>
            <Text style={{ paddingHorizontal: 25, color: 'grey', fontWeight: '700', fontSize: 15 }}>
              You are currently viewing proposals, you can also submit a proposal for reputation to
              participate in voting on proposals.
            </Text>
            <View style={{ marginVertical: 20 }}>
              <Button
                onPress={this.newProposal}
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: 250,
                  paddingVertical: 15,
                }}
              >
                <View />
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 15 }}>
                  Submit a proposal
                </Text>
                <Image
                  source={require('../Assets/plus.png')}
                  style={{
                    height: 25,
                    resizeMode: 'contain',
                  }}
                />
              </Button>
            </View>
          </View>
        </Modal>
      </View>
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
