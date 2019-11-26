'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import SwipeCards from '../Components/SwipeCards';
import { Wallet } from "../../../AliceSDK/Web3";

class Card extends React.Component {
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
    const {kitty, randomNumber, randomBreed} = this.props;
    console.log('THIS>PROPS: ', this.props)
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('CryptoKitties/KittySwipe', { kitty, randomNumber, randomBreed, backgroundColor: randomColor[randomNumber], breedTime: breedTime[randomBreed] })} style={styles.kittyContainer}>
          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 150, height: 150, borderRadius: 20, backgroundColor: randomColor[randomNumber],
            }}>
              <Image source={{ uri: this.props.image_url_png }} style={{ resizeMode: 'contain', width: 170, height: 170 }}/>
            </View>
            <View style={{width: 150, alignItems: 'flex-start', paddingLeft: 5}}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                  color: 'black', fontFamily: 'Avenir-Black', fontSize: 15, fontWeight: 'bold',
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
        </TouchableOpacity>
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
]

const cards2 = [
  {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
]

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      outOfCards: false,
      loading: true
    }
  }

  componentDidMount() {
    this.getKitties();
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



  handleYup (card) {
    console.log("yup")
  }

  handleNope (card) {
    console.log("nope")
  }

  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3;

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(cards2),
          outOfCards: true
        })
      }

    }

  }

  render() {
    const randomBreed = Math.floor(Math.random()*4);
    let randomNumber = Math.floor(Math.random() * 11);
    return (
      <View style={{flex: 1}}>
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


        <SwipeCards
          cards={this.state.cards}
          loop={false}
          kitties={this.state.kitties}
          randomBreed={randomBreed}
          randomNumber={randomNumber}
          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
          showYup={true}
          showNope={true}

          handleYup={this.handleYup}
          handleNope={this.handleNope}
          cardRemoved={this.cardRemoved.bind(this)}
        />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
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
