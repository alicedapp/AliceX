/* eslint-disable import/prefer-default-export */

import React, { Component } from 'react';
import {View} from 'react-native'
import { ApolloProvider } from 'react-apollo';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import { ApolloClientConfig as client } from './Config';
// eslint-disable-next-line no-unused-vars
import { NavigationBar } from '../../AliceCore/Components/index';

import {
  DAOstack,
  History,
  Holders,
  NewProposal,
  Proposals,
  ReputationRequest,
  RequestComplete,
  DetailedProposal
} from './Screens';

const App = createStackNavigator({
  "DAOstack": DAOstack,
  "DAOstack/Home": Proposals,
  "DAOstack/NewProposal": NewProposal,
  "DAOstack/ReputationRequest": ReputationRequest,
  "DAOstack/RequestComplete": RequestComplete,
  "DAOstack/DetailedProposal": DetailedProposal,

});

App.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

class DAOstackContainer extends Component {
  static router = {
    ...App.router,
    getStateForAction: (action, lastState) => {
      // check for custom actions and return a different navigation state.
      return App.router.getStateForAction(action, lastState);
    },
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ApolloProvider client={client}>
          <App
            navigation={this.props.navigation}
          />
        </ApolloProvider>
      </View>
    );
  }
}

export default createAppContainer(DAOstackContainer);
