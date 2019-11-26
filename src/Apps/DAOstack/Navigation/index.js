/* eslint-disable import/prefer-default-export */
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

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
    "DAOstack/Home": Proposals,
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
  "DAOstack": DAOstack,
  "DAOstack/Home": DAOHomePage,
  "DAOstack/NewProposal": NewProposal,
  "DAOstack/ReputationRequest": ReputationRequest,
  "DAOstack/RequestComplete": RequestComplete,
  "DAOstack/DetailedProposal": DetailedProposal,

});

App.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};


export default createAppContainer(App)

