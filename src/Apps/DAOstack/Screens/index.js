import React, {Component} from "react";
import {Text, ScrollView, TouchableOpacity, StyleSheet, View, Dimensions} from "react-native";

import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {Wallet, Contract} from "../../../AliceSDK/Web3";
import {FoodContractABI} from "../ABI";
import {NavigationBar} from "../../../AliceComponents/NavigationBar";

const { height, width } = Dimensions.get('window');

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://subgraph.daostack.io/subgraphs/name/v23',
    fetchOptions: {
      mode: 'no-cors'
    }
    // headers: {
    //   authorization: 'YOUR_TOKEN' // on production you need to store token
    //   //in storage or in redux persist, for demonstration purposes we do this like that
    // }
  }),
  cache: new InMemoryCache()
});

const daosQuery = gql`
  query {
    daos {
      id
      name
      reputationHoldersCount
      proposals {
        id
        stage
      }
    }
}
`;


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
      address: '',
      contractInfo: '',
      contractTxHash: '',
      signedMessage: '',
      signedTransaction: '',
      tokenTxHash: '',
      txHash: '',
      balance: '',
      daos: []
    };

    this.child = React.createRef();

  }

  async componentDidMount() {
    try {
      const res = await client.query({ query: daosQuery });
      if (res.data.daos) {
        console.log('DATA: ', res.data)
        this.setState({daos: res.data.daos});
      }
    } catch(e) {
      console.log('QUERY ERROR: ', e)
    }


  }

  render() {
    return (
      <ApolloProvider client={client}>
        <View style={{flex: 1, paddingTop: 50}}>
          <NavigationBar/>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 15}}>
            <Text style={{fontSize: 30, fontWeight: '700'}}>DAOs</Text>
            <View style={{height: 30, width: 30, borderRadius: 15, backgroundColor: '#aaff90'}}/>
          </View>
          <ScrollView>
            <View style={styles.container}>
              {this.state.daos && this.state.daos.map((dao, i) => {
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
                        <Text style={{fontSize: 25, fontWeight: '700'}}>{dao.proposals.length}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
              }
            </View>
          </ScrollView>
        </View>
      </ApolloProvider>
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
