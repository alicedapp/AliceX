import React, {Component} from "react";
import {Text, ScrollView, TouchableOpacity, StyleSheet, View, Dimensions, Image, ImageBackground} from "react-native";

import gql from 'graphql-tag';
import { Query } from 'react-apollo'
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import {DAOcolors} from "../Utils";

const { height, width } = Dimensions.get('window');

const DAOS_QUERY = gql`
      query {
        daos(orderBy: reputationHoldersCount, orderDirection:desc) {
          id
          name
          reputationHoldersCount
          proposals {
            id
            stage
          }
        }
    }`;

export default class DAOs extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      daos: []
    };

  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 50}}>
        <NavigationBar/>
        <Query query={DAOS_QUERY}>
          {({ loading, error, data }) => {
            if (error) return <Text>Can't fetch DAOs</Text>;
            if (loading) return <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
              <Image source={require('../Assets/alchemy-logo-black.png')} style={{
                width: 80,
                marginBottom: 60,
                resizeMode: 'contain',
              }}/>
              <Text style={{fontSize: 30, fontFamily: 'Didot'}}>Alchemy</Text>
            </View>
            return (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 15}}>
                  <Text style={{fontSize: 30, fontWeight: '700'}}>DAOs</Text>
                </View>

                <ScrollView>
                  <View style={styles.container}>
                    {data.daos.map((dao, i) => {
                      let {backgroundColor, color} = DAOcolors[i];
                      if (i === 5) {
                        return (<TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('DAOstackHome', {dao, backgroundColor})} style={{...styles.cheezeDaoBox, ...styles.sharpShadow}}>
                          <ImageBackground source={require('../Assets/cheeze-background.png')} style={{width: '100%', resizeMode: 'contain', paddingTop: 50, paddingBottom: 50, backgroundColor: 'yellow' }}>
                            <Text style={{color: 'black', fontSize: 30, fontWeight: '700', fontFamily: 'Exocet', marginHorizontal: 20}}>CHeeze DAO</Text>
                          </ImageBackground>
                          <Image style={{width: width - 50, resizeMode: 'contain', margin: -15, marginHorizontal: 15}} source={require('../Assets/divider.png')} />
                          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <View style={{alignItems: 'center', justifyContent: 'space-around', margin: 17}}>
                              <Text style={{color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700', fontFamily: 'Menlo-Regular'}}>Reputation Holders</Text>
                              <Text style={{fontSize: 30, fontWeight: '700', fontFamily: 'Exocet'}}>{dao.reputationHoldersCount}</Text>
                            </View>
                            <View style={{height: 50, width: 1, backgroundColor: '#c9c9c9'}}/>
                            <View style={{alignItems: 'center', justifyContent: 'space-around', margin: 17}}>
                              <Text style={{color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700', fontFamily: 'Menlo-Regular'}}>Open Proposals</Text>
                              <Text style={{fontSize: 30, fontWeight: '700', fontFamily: 'Exocet'}}>{dao.proposals.filter(proposal => proposal.stage !== "Executed" && proposal.stage !== "ExpiredInQueue" ).length}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>)

                      }
                      return (
                        <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('DAOstackHome', {dao, backgroundColor})} style={styles.daoBox}>
                          <View style={{width: '100%', padding: 30, paddingTop: 50, paddingBottom: 50, borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor }}>
                            <Text style={{color, fontSize: 20, fontWeight: '700'}}>{dao.name}</Text>
                          </View>
                          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <View style={{alignItems: 'center', justifyContent: 'space-around', margin: 17}}>
                              <Text style={{color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700'}}>Reputation Holders</Text>
                              <Text style={{fontSize: 25, fontWeight: '700'}}>{dao.reputationHoldersCount}</Text>
                            </View>
                            <View style={{height: 50, width: 1, backgroundColor: '#c9c9c9'}}/>
                            <View style={{alignItems: 'center', justifyContent: 'space-around', margin: 17}}>
                              <Text style={{color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700'}}>Open Proposals</Text>
                              <Text style={{fontSize: 25, fontWeight: '700'}}>{dao.proposals.filter(proposal => proposal.stage !== "Executed" && proposal.stage !== "ExpiredInQueue" ).length}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                    }
                  </View>
                </ScrollView>
              </>
            );
          }}
        </Query>
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
  roundedProfileImage: {
    width:100, height:100, borderWidth:3,
    borderColor:'white', borderRadius:50
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
