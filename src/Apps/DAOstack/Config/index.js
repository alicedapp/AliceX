/* eslint-disable import/prefer-default-export */
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import {IPFSApiClient} from './ipfs-api'

const apolloClientConfig = {
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/daostack/v29_0',
    fetchOptions: {
      mode: 'no-cors',
    },
  }),
  cache: new InMemoryCache(),
};

export const ApolloClientConfig = new ApolloClient(apolloClientConfig);
export const Ipfs = new IPFSApiClient('https://api.thegraph.com/ipfs-daostack/api/v0')
