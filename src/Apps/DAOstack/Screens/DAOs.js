/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable global-require */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import { Subscription } from 'react-apollo';
import {Wallet} from "../../../AliceSDK/Web3";
import gql from 'graphql-tag';

import { DAOcolors } from '../Utils';
import { visitWithTypeInfo } from 'graphql';

const { height, width } = Dimensions.get('window');

const DAOS_SUBSCRIPTION = gql`
  subscription {
    daos(orderBy: reputationHoldersCount, orderDirection: desc) {
      id
      name
      reputationHoldersCount
      schemes(first: 1000) {
        id,
        address,
        name,
        paramsHash
      }
      proposals(first: 1000) {
        id
        stage
      }
    }
  }
`;

export default class DAOs extends Component {
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
      walletAddress: undefined,
      daos: [],
      filter: ''
    };
  }

  async componentWillMount(){
    const walletAddress = await Wallet.getAddress();
    this.setState({ walletAddress });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Subscription subscription={DAOS_SUBSCRIPTION}>
          {({ loading, error, data }) => {
            if (error) { 
            console.error(error)  
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
              >
                <Text>Can't fetch DAOs</Text>
              </View>
            );
          }
            if (loading) {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                  }}
                >
                  <Image
                    source={require('../Assets/alchemy-logo-black.png')}
                    style={{
                      width: 80,
                      marginBottom: 60,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text style={{ fontSize: 30, fontFamily: 'Didot' }}>Alchemy</Text>
                </View>
              );
            }
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
                  <Text style={{ fontSize: 30, fontWeight: '700' }}>DAOs</Text>
                </View>

                <ScrollView>
                  <TextInput
                    style={[{
                        padding: 8,
                        width: '100%',
                        ...styles.input,
                        height: 40,
                        fontWeight: '600',
                        fontSize: 14
                      },
                      (this.state.titleIsValid) ? null : { borderWidth: 1, ...styles.errorBorderColor }
                    ]}
                    onChangeText={(filter) => this.setState({filter})}
                    autoCapitalize="none"
                    placeholder="Filter DAOs"
                  />
                  <View style={styles.container}>
                    {data.daos.map((dao, i) => {
                      if(this.state.filter.length > 0 && !dao.name.toLowerCase().includes(this.state.filter.toLowerCase())) {
                        return
                      }
                      const { backgroundColor, color } = DAOcolors[i%DAOcolors.length];
                      const walletAddress = this.state.walletAddress;
                      return (
                        <TouchableOpacity
                          key={i}
                          onPress={() =>
                            this.props.navigation.navigate('DAOstack/Home', { dao, backgroundColor, walletAddress })
                          }
                          style={styles.daoBox}
                        >
                          <View
                            style={{
                              width: '100%',
                              padding: 30,
                              paddingTop: 50,
                              paddingBottom: 50,
                              borderTopLeftRadius: 15,
                              borderTopRightRadius: 15,
                              backgroundColor,
                            }}
                          >
                            <Text style={{ color, fontSize: 20, fontWeight: '700' }}>
                              {dao.name}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-around',
                            }}
                          >
                            <View
                              style={{
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                margin: 17,
                              }}
                            >
                              <Text
                                style={{
                                  color: 'grey',
                                  fontSize: 10,
                                  marginBottom: 15,
                                  fontWeight: '700',
                                }}
                              >
                                Reputation Holders
                              </Text>
                              <Text style={{ fontSize: 25, fontWeight: '700' }}>
                                {dao.reputationHoldersCount}
                              </Text>
                            </View>
                            <View style={{ height: 50, width: 1, backgroundColor: '#c9c9c9' }} />
                            <View
                              style={{
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                margin: 17,
                              }}
                            >
                              <Text
                                style={{
                                  color: 'grey',
                                  fontSize: 10,
                                  marginBottom: 15,
                                  fontWeight: '700',
                                }}
                              >
                                Open Proposals
                              </Text>
                              <Text style={{ fontSize: 25, fontWeight: '700' }}>
                                {
                                  dao.proposals.filter(
                                    proposal =>
                                      proposal.stage !== 'Executed' &&
                                      proposal.stage !== 'ExpiredInQueue'
                                  ).length
                                }
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
              </>
            );
          }}
        </Subscription>
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
  roundedProfileImage: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 50,
  },
  input: {
    backgroundColor: '#E6E6E6',
    width: width - 20,
    height: 70,
    fontSize: 14,
    margin: 10,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
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
  cheezeDaoBox: {
    width: width - 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  sharpShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
});
