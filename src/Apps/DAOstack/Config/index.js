/* eslint-disable import/prefer-default-export */
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

const apolloClientConfig = {
  link: new HttpLink({
    uri: 'https://subgraph.daostack.io/subgraphs/name/v24',
    fetchOptions: {
      mode: 'no-cors',
    },
  }),
  cache: new InMemoryCache(),
};

export const ApolloClientConfig = new ApolloClient(apolloClientConfig);
