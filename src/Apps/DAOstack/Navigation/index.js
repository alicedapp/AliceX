/* eslint-disable import/prefer-default-export */
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import {
  DAOstack,
  History,
  Holders,
  NewProposal,
  Proposals,
  Redemptions,
  ReputationRequest,
  RequestComplete,
  DetailedProposal
} from '../Screens';

const DAOHomePage = createBottomTabNavigator(
  {
    // Your ExampleMaps's Tab Navigator's names are defined here as a default
    DAOstackHome: Proposals,
    DAOstackRedemptions: Redemptions,
    DAOstackHolders: Holders,
    DAOstackHistory: History,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#3078CA',
        borderTopColor: 'transparent',
      },
      showLabel: false,
    },
  }
);

DAOHomePage.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

export const App = createStackNavigator({
  DAOstack,
  DAOHomePage,
  NewProposal,
  ReputationRequest,
  RequestComplete,
  DetailedProposal
});
