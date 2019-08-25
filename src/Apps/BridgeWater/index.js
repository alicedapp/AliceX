/*
* This is a boilerplate structure to get you through the process of building your first app with Alice
* We've included all the necessary features for you to build out your entire application using the
* Camera,
* Push Notifications,
* Maps,
* Payments,
*
* And all the navigation necessary for you to build a full feature app.
*
* Please see the documentation for more info on how to build out more features into Alice.
* */


/*
* This is a boilerplate structure to get you through the process of building your first app with Alice
* We've included all the necessary features for you to build out your entire application using the
* Camera,
* Push Notifications,
* Maps,
* Payments,
*
* And all the navigation necessary for you to build a full feature app.
*
* Please see the documentation for more info on how to build out more features into Alice.
* */

import Map from './Screens/Map'
import Home from './Screens/Home'
import Camera from './Screens/Camera'
import {Wallet} from "../../AliceSDK/Web3";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Query, graphql } from 'react-apollo';
import React, {Component} from "react";
import {NavigationBar} from "../../AliceComponents/NavigationBar";
import gql from "graphql-tag";
// import { split } from 'apollo-link';
// import { HttpLink } from 'apollo-link-http';
// import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from 'apollo-utilities';


// // Create an http link:
// const httpLink = new HttpLink({
//   uri: 'http://localhost:3000/graphql'
// });
//
// // Create a WebSocket link:
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:5000/`,
//   options: {
//     reconnect: true
//   }
// });
//
// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache()
});



const App = createBottomTabNavigator({
  // Your ExampleMaps's Tab Navigator's names are defined here as a default
  Home: Home,
  Maps: Map,
  Camera: Camera
});

const AppContainer = createAppContainer(App);

export default class DAOstackContainer extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer/>
      </ApolloProvider>
    );
  }
}
