import React from "react";
import {View, Text, AsyncStorage, TouchableOpacity, Image, TextInput, StyleSheet} from "react-native";
import moment from 'moment';
import {Wallet, Contract} from "../../../AliceSDK/Web3";
import {VotingABI} from "../ABI";
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import {ethers} from 'ethers';
import {GiftedChat} from 'react-native-gifted-chat'
import Icon from "../../../AliceComponents/IconComponent";
import {Query, Mutation} from "react-apollo";
import gql from "graphql-tag";
import { WebSocketLink } from 'apollo-link-ws';
import OneSignal from "react-native-onesignal";
import {ApolloClient, HttpLink, InMemoryCache} from "apollo-boost";
import Proposal from '../../DAOstack/Components/ChatProposal'
import Modal from "react-native-modal";
const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/`,
  options: {
    reconnect: true
  }
});


const DAOstackClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://subgraph.daostack.io/subgraphs/name/v24',
    fetchOptions: {
      mode: "no-cors",
    },
  }),
  cache: new InMemoryCache()
});

const GET_DHACK_PROPOSALS = gql`
query {
  dao(id: "0x0c88aa3c4fe9f9f8da766e9b8bfbbaa1235928cc") {
    
    proposals {
      id
      dao {
        id
        name
      }
      proposer
      stage
      createdAt
      boostedAt
      votingMachine
      title
      description
      url
      votes {
        voter
        reputation
      }
      votesAgainst
      votesFor
      contributionReward {
        id
        ethReward
      }
    }
  }
}
`


const GET_MESSAGES = gql`
    query getMessage {
    messages(channel_id: "1") {
      id
      app_name
      timestamp
			user {
        address
      }
      payload
      user_address
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation addMessage($payload: String!, $user_address: String) {
    addMessage(channel_id: "1", payload: $payload, user_address: $user_address, app_id: "2", app_name: "DAOstack") {
      id
      payload
    }
  }
`;



export default class E2EChat extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Chat',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      walletAddress: '',
      contractTxHash: '',
      logs: [],
      messages: [],
      addressModalVisible: false
    };
    this.child = React.createRef();
    OneSignal.addEventListener('ids', this.onIds);
  }

  async componentWillMount() {
    this.setState({walletAddress: await Wallet.getAddress()});
    AsyncStorage.setItem("REGISTERED", false);
  }

  componentDidMount() {

  }

  onIds = async (device) => {
    try {
      const registered = await AsyncStorage.getItem("REGISTERED");
      if (registered !== true) {
        AsyncStorage.setItem("REGISTERED", true);
        console.log('Device info: ', device);
      }
    } catch(e) {

    }
  };

  onReceivedMessage = async (message) => {
    let timestamp = await this.getBlockData(message.blockHash);
    const messages = [
      {
        _id: message.transactionHash,
        text: ethers.utils.toUtf8String(message.data),
        createdAt: timestamp,
        user: {
          _id: message._sender,
          name: message._sender,
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ];

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  };

  sendMessage = (addMessage, message) => {
    console.log('message: ', message);
    console.log('addMessage: ', addMessage);
    addMessage({ variables: { payload: message[0].text, user_address: this.state.walletAddress } })
  }

  onSend(messages = []) {
    console.log('msg : ', messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  sortProposals = (data) => {
    if (data.proposals) {
      let {proposals} = data;
      let sortedProposals = proposals.map((proposal, i) => {
        console.log('PROPOSAL: ', new Date(moment.unix(parseInt(proposal.createdAt))));
        try {
          return {
            _id: proposal.id,
            text: "PROPOSAL",
            ...proposal,
            createdAt: new Date(moment.unix(parseInt(proposal.createdAt))),
            user: {
              _id: proposal.proposer,
              name: proposal.proposer,
              avatar: 'https://placeimg.com/140/140/any',
            },

          };
        } catch(e) {
          console.log('sort messages error: ', e)
        }
      });
      return sortedProposals;
    }
  };

  toggleModal = async (proposal = {}) => {
    this.setState({ addressModalVisible: !this.state.addressModalVisible, selectedProposal: proposal});
  };

  sortInformation = (messages, proposals) => {
    messages = messages || [];
    let information = messages.concat(proposals || []);
    information = information.filter(n => n);
    return information.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  };


  sortMessages = (data) => {
    console.log('message data: ', data)
    if (data.messages) {
      let {messages} = data;
      let sortedMessages = messages.map((message, i) => {
        console.log('meessage date: ', new Date(parseInt(message.timestamp)))
        try {
           return {
              _id: message.id,
              text: message.payload,
              createdAt: new Date(parseInt(message.timestamp)),
              user: {
                _id: message.user_address,
                name: message.user,
                avatar: 'https://placeimg.com/140/140/any',
              },
          };
        } catch(e) {
          console.log('sort messages error: ', e)
        }
      });
      return sortedMessages;
    }
  };


  vote = async (vote) => {
    try {
      console.log('state: ', {contractAddress: this.state.selectedProposal.votingMachine, abi: VotingABI, functionName: 'vote', parameters: [this.state.selectedProposal.id, 1, 0, "0x0000000000000000000000000000000000000000"], data: '0x0'});
      const txHash = await Contract.write({contractAddress: this.state.selectedProposal.votingMachine, abi: VotingABI, functionName: 'vote', parameters: [this.state.selectedProposal.id, 0, 0, "0x0000000000000000000000000000000000000000"], data: '0x0'})
      console.log('tx: ', txHash)

    } catch(e) {
      console.log('ERROR: ', e);
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1}}>
        <NavigationBar/>
        <Mutation mutation={SEND_MESSAGE}>
          {(addMessage, { data }) => (
            <Query query={GET_MESSAGES}>
              {({ loading, error, data }) => {
                if (loading) return <Text>Loading...</Text>
                if (error) return <Text>Error! {error.message}</Text>;
                const messages = this.sortMessages(data);
                console.log('MESSAGES: ', messages);
                return (

                  <Query client={DAOstackClient} query={GET_DHACK_PROPOSALS}>
                    {({ loading, error, data }) => {
                      if (loading) return <Text>Loading...</Text>;
                      if (error) return <Text>Error! {error.message}</Text>;
                      console.log('PROPOSALS: ', data);
                      const sortedProposals = this.sortProposals(data.dao)
                      return (
                        <View style={{flex: 1}}>
                          <GiftedChat
                            renderCustomView={(data) => {
                              if (data.currentMessage.text === "PROPOSAL" ) {
                                return <Proposal toggleModal={this.toggleModal} proposal={data.currentMessage}/>
                              }
                            }}
                            messages={this.sortInformation(messages, sortedProposals)}
                            onSend={(message) => this.sendMessage(addMessage, message)}
                            user={{
                              _id: this.state.walletAddress,
                            }}
                          />
                          <Modal
                            isVisible={this.state.addressModalVisible}
                            onBackdropPress={this.toggleModal}
                            style={styles.modal}
                          >
                            <View style={{width: '100%', backgroundColor: 'white', padding: 5, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                              <View style={{width: '100%', height: 50, padding: 5, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity onPress={() => this.vote(true)} style={{backgroundColor: '#333333', padding: 10, marginRight: 15, alignItems: 'center', justifyContent: 'center', borderRadius: 12}} >
                                  <Text style={{color: 'white', fontSize: 14, fontWeight: '700'}}>YES</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.vote(false)} style={{backgroundColor: '#333333', padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 12}} >
                                  <Text style={{color: 'white', fontSize: 14, fontWeight: '700'}}>NO</Text>
                                </TouchableOpacity>
                              </View>
                            </View>

                          </Modal>
                        </View>
                      );
                    }}
                  </Query>

                );
              }}
            </Query>
          )}
        </Mutation>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  modal: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBox: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 25,
  },
})
