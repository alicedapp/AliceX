'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";

import SwipeCards from '../Components/SwipeCards';
import Button from '../Components/Button';
import Lightbox from '../Components/Lightbox';
import { Wallet } from "../../../AliceSDK/Web3";
import { db, messaging } from "../../../AliceSDK/Firebase";
import Accounts from "../../../AliceSDK/Firebase/Accounts";
import KittiesService from "../Services/Firebase/CryptoKitties/KittiesService";

import axios from "axios";
const { height, width } = Dimensions.get('window');

const renderList = () => (
  <View style={{ width: width, height: height }}>
    <Image
      style={{ flex: 1 }}
      resizeMode="contain"
      source={{ uri: 'http://cdn.lolwot.com/wp-content/uploads/2015/07/20-pictures-of-animals-in-hats-to-brighten-up-your-day-1.jpg' }}
    />
    <View style={{ backgroundColor: '#6C7A89', flex: 1 }}/>
    <View style={{ backgroundColor: '#019875', flex: 1 }}/>
    <View style={{ backgroundColor: '#E67E22', flex: 1 }}/>
  </View>
);

class Card extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null,
      tabBarVisible: false,
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    const randomColor = [
      '#faf4d1',
      '#cef5d6',
      '#d4e7fe',
      '#dfdff9',
      '#f9e0f3',
      '#fee0e5',
      '#f9e1cb',
      '#eee9e8',
      '#c6eef9',
      '#eee1da',
      '#c6eef9',
    ];
    const breedTime = ['Snappy', 'Swift', 'Prodding', 'Slow'];
    const randomBreed = Math.floor(Math.random()*4);
    let randomNumber = Math.floor(Math.random() * 11);
    console.log('THIS>PROPS: ', this.props);
    return (
      <View>
        <View style={{ ...styles.card, alignItems: 'center',  justifyContent: 'center', width: width - 40, borderRadius: 20, backgroundColor: randomColor[randomNumber], }}>
          <Image source={{ uri: this.props.image_url_png }} style={{ resizeMode: 'contain', width: width + 20, height: width + 20 }}/>
          <View style={{width: '100%', alignItems: 'flex-start', padding: 20}}>
            <Text numberOfLines={1} style={{fontSize: 25, marginBottom: 10, fontFamily: 'Avenir-Black',}}>{this.props.name}</Text>
            <Text numberOfLines={1} style={{fontSize: 20, marginBottom: 10, fontFamily: 'Avenir-Black',}}>{this.props.owner.address}</Text>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{  flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                  color: '#93989b', fontFamily: 'Avenir-Black', fontSize: 15, fontWeight: 'bold',
                }}>#</Text>
                <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 12 }}>{this.props.id}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../Assets/dna.png')} style={{
                  resizeMode: 'contain', width: 12, height: 12, marginRight: 5,
                }}/>
                <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 12 }}>Gen {this.props.generation}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../Assets/clock-circular-outline.png')} style={{
                  resizeMode: 'contain', width: 12, height: 12, marginRight: 5,
                }}/>
                <Text style={{ color: 'black', fontFamily: 'Avenir-Black', fontSize: 12 }} numberOfLines={1}>{breedTime[randomBreed]}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
}

const cards = [
  {name: '1', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'},
  {name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
  {name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
  {name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
  {name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
  {name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
  {name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
  {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
  {name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'},
];

const cards2 = [
  {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
];

export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null,
      tabBarVisible: false,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      outOfCards: false,
      loading: true,
      tinderKitties: []
    }
  }

  componentDidMount() {
    this.getKitties();
    this.mounted();
    this.getTinderKitties();
  }

  getTinderKitties = async () => {
    const kitties = await db.collection('kitties')
      .doc('network')
      .collection('mainnet')
      .get()
      .then(snapshots => {
        if (snapshots.empty) {
          return [];
        }
        return snapshots.docs.map(doc => doc.data());
      });

    console.log(' TINDER KITTIES: ', kitties);
    this.setState({tinderKitties: kitties});

    // function checkAddress(kitty) {
    //   return kitty.owner.address.toLowerCase() === "0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB".toLowerCase();
    // }
    // const filteredKitties = kitties.filter(kitty => kitty.owner.address === "0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB".toLowerCase());
    // this.setState({tinderKitties: filteredKitties });


  }

  onFCMTokenReceived = async (token) => {
    if (token) {
      console.log('token', token);
      await Accounts.upsertFirebaseMessagingTokenForAccount(await Wallet.getAddress(), token);
    } else {
      console.log('Unable to retrieve token - check permissions');
    }
  }
  getFCMToken = () => {
    messaging.getToken()
      .then(currentToken => this.onFCMTokenReceived(currentToken))
      .catch((err) => console.log('An error occurred while retrieving token. ', err));
  };

  swipeRight = async (kittie) => {
    const studId = this.state.userSelected;
    const {image_url_png, name} = this.state.myKitties.filter(kittie => kittie.id.toString() === studId)[0];
    const studPayload = {
      id: studId,
      studImg: image_url_png,
      name
    };
    const msg = `Want to breed with ${studPayload.name}?`;
    await KittiesService.swipeRight('mainnet', kittie, studPayload, msg, this.accounts.user.toLowerCase());

    console.log(`swipe right from ${studPayload.id} to ${kittie.id.toString()}`);

    // refresh page to see who your chasing
    this.getSwipeRights();
  };

  acceptRight = async (kittieId, studId) => {
    // it's a match
    console.log(`matching ${kittieId} to ${studId}`);
    await KittiesService.matchKitties('mainnet', studId.toString(), kittieId.toString());
  };

  find = async () => {
    this.kitties.other = await KittiesService.getAllKittiesForAddress('mainnet', this.accounts.other.toLowerCase());
  };

  getBlockchainUserKitties = async () => {

    // this loads from the blockchain and pushes to firebase - then gets the current data
    // this always upserts to get data fresh in case of transfers
    const cryptoKittiesApiEndpoint = `https://api.cryptokitties.co/v2/kitties?offset=0&limit=12&owner_wallet_address=${await Wallet.getAddress()}&parents=false&authenticated=true&include=sale,sire,other&orderBy=id&orderDirection=desc`;
    const kitties = await (await axios.get(cryptoKittiesApiEndpoint)).data.kitties;

    this.setState({myKitties: kitties})
    if (kitties.length > 0) {
      this.userKittieSelected(kitties[0].id.toString());
      this.upsertKittiesAndGetSwipeRights(kitties);
    }
  };

  upsertKittiesAndGetSwipeRights = async (kitties) => {
    await KittiesService.upsertKitties('mainnet', kitties);
    await this.getSwipeRights();
  };

  getSwipeRights = async () => {
    const kitties = await KittiesService.getAllKittiesWithSwipeRightsForAddress('mainnet', await Wallet.getAddress());
    console.log('KITTIES: ', kitties);
    const userSelected = kitties.user[0].id.toString();
    this.setState({userSelected})
    console.log(`My kitties`, this.state.myKitties);
  };

  userKittieSelected = async (id) => {
    this.setState({userSelected:id});
  };



  mounted = async () => {
    messaging.onMessage((payload) => {
      console.log('Message received:', payload);

      // in foreground
      const {title, body, icon} = payload.data;
      new Notification(title, {
        body,
        icon
      });

      // something happened get the latest data!!
      this.getSwipeRights();
    });

    messaging.onTokenRefresh(() => this.getFCMToken());

    const account = await Wallet.getAddress();
    if (account)  {

      this.getFCMToken();

      this.getBlockchainUserKitties();
      // open up notification with a browser allow request
      // Notification.requestPermission().then(permission => {
      //   if (permission === 'granted') {
      //     console.log('Notification permission granted.');
      //
      //     this.getFCMToken();
      //
      //     this.getBlockchainUserKitties();
      //   } else {
      //     console.log('Unable to get permission to notify.');
      //   }
      // });
    }
  }

  getKitties = async () => {
    try {
      const response = await fetch(`https://api.cryptokitties.co/v2/browse/latest-fancies?offset=0&limit=12`);
      if (response) {
        const data = await response.json();
        console.log('res', data);
        this.setState({ cards: data.kitties, loading: false });
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  sendNotification = async kitty => {
    try {
      const studPayload = {
        id: "1541123",
        name: "Bobo",
        kittieImg: "http://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1614882.png"
      };
      kitty.id = kitty.id.toString();
      kitty.kittyImg = "http://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1614882.png";
      const msg = `Want to breed with ${studPayload.name}?`;
      const registrationToken = await db.collection('accounts')
        .doc(kitty.owner.address)
        .get()
        .then(snapshots => {
          if (snapshots.empty) {
            return null;
          }
          return snapshots.data().firebaseMessagingToken;
        });
      console.log('fcmToken: ', registrationToken);
      const title = "Cryptokitties";
      const body = "You have a new match 😻😻😻";
      const data = {route: "CryptoKitties/Home"};
      const res = await axios.post("https://us-central1-alice-1555232535074.cloudfunctions.net/api/notification", {registrationToken, title, body, data});
      // const res = await axios.post("http://localhost:8880", {registrationToken, title, body, data});
      // const res = await fetch("https://us-central1-alice-1555232535074.cloudfunctions.net/api/notification", {registrationToken, title, body, data});
      console.log('RES: ', res);

    } catch(e) {
      console.log('error: ', e)
    }
  }

  handleYup = kitty => {
    this.sendNotification(kitty);
  };

  handleNope (card) {
    console.log("nope")
  }

  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3;

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      this.setState({cardsMessage: `There are only ${this.state.cards.length - index - 1} cards left.`})
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        this.setState({cardsMessage: `Adding ${cards2.length} more cards`});
        console.log(`Adding ${cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(cards2),
          outOfCards: true
        })
      }

    }

  }

  yesPress = () => {

  };

  noPress = () => {

  }


  render() {
    const randomBreed = Math.floor(Math.random()*4);
    let randomNumber = Math.floor(Math.random() * 11);
    return (
      <View style={{flex: 1, marginTop: 100}}>
        {this.state.loading === true ? <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
            <Image source={require('../Assets/ether-diamond.gif')} style={{
              resizeMode: 'contain',
              height: 80,
              width: 80,
            }}/>
          </View> :
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <SwipeCards
                style={{flex: 1}}
                cards={this.state.tinderKitties}
                loop={false}
                renderCard={(cardData) => <Card {...cardData} />}
                renderNoMoreCards={() => <NoMoreCards />}
                showYup={true}
                showNope={true}
                yupText={"😻"}
                nopeText={"💔"}
                handleYup={this.handleYup}
                handleNope={this.handleNope}
                handleMaybe={this.handleNope}
                cardRemoved={this.cardRemoved.bind(this)}
                yesPress={ yes => this.yesPress = yes}
                noPress={no => this.noPress = no}
              />
            <View style={{flex: 0.5, width: '100%', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
              <Button onPress={this.noPress}>
                <View style={styles.choiceButton}>
                  <Image source={require('../Assets/x-paw.png')} style={{
                    resizeMode: 'contain',
                    height: 60,
                    width: 60,
                  }}/>
                </View>
              </Button>
              <Button onPress={this.yesPress}>
                <View style={styles.choiceButton}>
                  <Image source={require('../Assets/love-heart-paw.png')} style={{
                    resizeMode: 'contain',
                    height: 60,
                    width: 60,
                  }}/>
                </View>
              </Button>

            </View>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,

  },
  choiceButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
