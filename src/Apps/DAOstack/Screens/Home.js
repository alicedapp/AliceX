import React from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Wallet, Contract} from "../../../AliceSDK/Web3";
import {FoodContractABI} from "../ABI";
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import Icon from "../../../AliceComponents/IconComponent";
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Query, graphql } from 'react-apollo';

import gql from "graphql-tag";

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


export default class DAOstackHome extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('../Assets/home.png')} size={30}/>,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      dao: {}
    };

    this.child = React.createRef();

  }

  async componentDidMount() {
    try {
      const res = await client.query({query: gql`
  query { 
	dao(id: ${this.props.navigation.state.params.dao.id}) {
	  id
    name
    proposals {
      id
      title
      closingAt
      votesFor
      votesAgainst
      
    }
    
	} 
}
`});
      if (res.data.daos) {
        console.log('DATA: ', res.data)
        this.setState({daos: res.data.dao});
      }
    } catch (e) {
      console.log('QUERY ERROR: ', e)
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <ApolloProvider client={client}>
          <View style={{flex: 1, paddingTop: 50}}>
            <NavigationBar/>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 15}}>
              <Text style={{fontSize: 30, fontWeight: '700'}}>DAOs</Text>
              <View style={{height: 30, width: 30, borderRadius: 15, backgroundColor: '#aaff90'}}/>
            </View>
            <ScrollView>
            </ScrollView>
          </View>
        </ApolloProvider>
      </View>
    );
  }
}
