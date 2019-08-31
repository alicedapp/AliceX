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

import React, { Component } from "react";
import { ApolloProvider, Query, graphql } from 'react-apollo';
import { createAppContainer } from 'react-navigation';

import { App } from './Navigation';
import { ApolloClientConfig as client } from './Config'
import { NavigationBar } from '../../AliceComponents';

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
