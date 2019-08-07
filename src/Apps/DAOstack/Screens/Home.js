import React, {Component} from "react";
import {Text, ScrollView, TouchableOpacity, StyleSheet, View, Dimensions, Image} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import moment from 'moment';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import Countdown from '../Components/Countdown'
import Icon from "../../../AliceComponents/IconComponent";
import {Settings} from "../../../AliceSDK/Web3";
import FloatingButton from '../Components/FloatingButton'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
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
                  beneficiary
                  ethReward
                  externalToken
                  externalTokenReward
              }
          } 
        }
    }`;

export default class DAOstackApp extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;

    return {
      tabBarIcon: ({tintColor}) => <Icon icon={require('../Assets/home.png')} size={20}/>,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      daos: []
    };
  }

  newProposal = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.props.navigation.navigate('NewProposal')
  };

  render() {
    return (
      <View style={{flex: 1}}>

        <Query query={PROPOSALS_QUERY} variables={{ id: this.props.navigation.state.params.dao.id }}>
          {({ loading, error, data }) => {
            if (error) return <Text>Can't fetch Proposals</Text>;
            if (loading) return <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
              <Text style={{fontSize: 30, fontFamily: 'Didot'}}>Loading ...</Text>
            </View>
            return (
              <>
                <ScrollView>
                  <Text style={{margin: 15, fontSize: 20, color: 'grey', fontWeight: '600'}}>Boosted Proposals</Text>
                  <View style={styles.container}>
                    {data.dao.proposals.map((proposal, i) => {
                      if (proposal.stage === 'Boosted') {
                        i < 6 && console.log('PROPOSAL: ', proposal);
                        return (
                          <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('DAOstackHome')} style={styles.daoBox}>
                            <View style={{width: '100%', padding: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15,}}>
                              <Countdown style={{marginBottom: 7}} timeTillDate={proposal.closingAt}/>
                              <View style={{flexDirection: 'row', marginBottom: 14}}>
                                <View style={{height: 20, width: 20, backgroundColor: 'lightblue', borderRadius: 10, marginRight: 10}}/>
                                <Text style={{width: width/ 2, fontWeight: '700'}} numberOfLines={1}>{proposal.contributionReward && proposal.contributionReward.beneficiary}</Text>
                              </View>
                              <View style={{flexDirection: 'row', alignItems: 'center', width: width - 70, marginBottom: 10}}>
                                <Text numberOfLines={1} style={{ fontWeight: '700'}}>{proposal.title}</Text>
                                <TouchableOpacity onPress={() => Settings.openBrowser(proposal.url)}>
                                  <Image source={require('../Assets/link-icon.png')} style={{
                                    height: 10,
                                    resizeMode: 'contain',
                                  }}/>
                                </TouchableOpacity>
                              </View>
                              <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 7, borderWidth: 1, borderColor: '#c0c0c0', width: width - 70}}>
                                <Text numberOfLines={1} style={{}}>{(proposal.contributionReward && proposal.contributionReward.ethReward !== "0") && parseInt(proposal.contributionReward.ethReward)/10e17 + 'ETH'}{!proposal.contributionReward.externalToken && proposal.contributionReward.externalTokenReward + proposal.contributionReward.externalToken}</Text>
                                <Image source={require('../Assets/transfer-icon.png')} style={{
                                  height: 10,
                                  resizeMode: 'contain',
                                }}/>
                                <Text numberOfLines={1} style={{}}>{proposal.contributionReward && proposal.contributionReward.beneficiary}{}</Text>
                              </View>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                              <View style={{alignItems: 'center', justifyContent: 'space-around', margin: 17}}>
                                <Text style={{color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700'}}>Voting Percentage</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center', }}>
                                  <AnimatedCircularProgress
                                    style={{marginRight: 15}}
                                    size={47}
                                    width={3}
                                    fill={80}
                                    tintColor="#06BE90"
                                    onAnimationComplete={() => console.log('onAnimationComplete')}
                                    backgroundColor="#D8D8D8" >
                                    {
                                      (fill) => (
                                        <Image source={require('../Assets/thumbs-up-green.png')} style={{
                                          height: 15,
                                          resizeMode: 'contain',
                                        }}/>
                                      )
                                    }
                                  </AnimatedCircularProgress>
                                  <View>
                                    <View style={{flexDirection: 'row', alignItems: 'space-between', justifyContent: 'space-between'}}>
                                      <Image source={require('../Assets/thumbs-up-grey.png')} style={{
                                        height: 15,
                                        resizeMode: 'contain',
                                      }}/>
                                      <Text>6.49 %</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                      <Image source={require('../Assets/thumbs-down-grey.png')} style={{
                                        height: 15,
                                        resizeMode: 'contain',
                                      }}/>
                                      <Text>6.49 %</Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                              <View style={{height: 50, width: 1, backgroundColor: '#c9c9c9'}}/>
                              <View style={{alignItems: 'center', justifyContent: 'space-around', margin: 17}}>
                                <Text style={{color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700'}}>Votes</Text>
                                <Text style={{}}>Pass</Text>
                                <Text style={{}}>Fail</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )
                      }
                    })
                    }
                  </View>
                </ScrollView>
              </>
            );
          }}
        </Query>
        <FloatingButton onPress={this.newProposal}/>
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
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
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
