import React, {Component} from "react";
import {Text, ScrollView, TouchableOpacity, StyleSheet, View, Dimensions, Image} from "react-native";

import gql from 'graphql-tag';
import { Query } from 'react-apollo'
import {NavigationBar} from "../../../AliceComponents/NavigationBar";

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

export default class DAOstackApp extends Component {
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
                  <View style={{height: 30, width: 30, borderRadius: 15, backgroundColor: '#aaff90'}}/>
                </View>

                <ScrollView>
                  <View style={styles.container}>
                    {data.daos.map((dao, i) => {
                      return (
                        <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('DAOstackHome', {dao})} style={styles.daoBox}>
                          <View style={{width: '100%', padding: 30, paddingTop: 50, paddingBottom: 50, borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: '#6e3099'}}>
                            <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>{dao.name}</Text>
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

  }
});
