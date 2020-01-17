/* eslint-disable import/prefer-default-export */
import {IPFSApiClient} from './ipfs-api'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const graphHttpLink = 'https://api.thegraph.com/subgraphs/name/daostack/v36_8';
const graphwsLink = 'wss://api.thegraph.com/subgraphs/name/daostack/v36_8';
const ipfsLink = 'https://api.thegraph.com/ipfs-daostack/api/v0';

const httpLink = new HttpLink({
  uri: graphHttpLink,
  fetchOptions: {
    mode: 'no-cors',
  },
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: graphwsLink,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const apolloClientConfig = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    link
  ]),
  cache: new InMemoryCache()
});

export const ApolloClientConfig = new ApolloClient(apolloClientConfig);
export const Ipfs = new IPFSApiClient(ipfsLink)
