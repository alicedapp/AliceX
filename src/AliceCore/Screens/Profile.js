import {Component} from "react";
import {Animated, StyleSheet, ScrollView, TouchableWithoutFeedback, Text, Image, View, Dimensions} from "react-native";
import React from "react";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import {onSortOptions} from "../../Apps/Foam/utils";
const { height, width } = Dimensions.get('window');
const cols = 3, rows = 3;
import NFT from '../../AliceComponents/NFT'

//TODO: needs api key

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenInfo: '',
      tokens: [],
      ethereum: {},
      nfts: [],
    };

  }
  componentDidMount() {
    this.getTokenInfo()
    this.getNFTInfo()
  }

  getTokenInfo = async () => {
    let data = null;
    var xhr = new XMLHttpRequest();
    const onData = (data) => this.setState({tokenInfo: data, tokens: data.tokens});
    xhr.addEventListener("readystatechange",  function()  {
      if (this.readyState === this.DONE) {
        onData(JSON.parse(this.responseText));
      }
    });
    xhr.open("GET", "https://api.ethplorer.io/getAddressInfo/0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB?apiKey=freekey");
    xhr.send(data);

  };


  getNFTInfo = async () => {
    let data = null;
    var xhr = new XMLHttpRequest();
    const onData = (data) => {
      console.log('NFTs: ', data.assets)
      this.setState({nftInfo: data, nfts: data.assets});
    }
    xhr.addEventListener("readystatechange",  function()  {
      if (this.readyState === this.DONE) {
        onData(JSON.parse(this.responseText));
      }
    });
    xhr.open("GET", "https://api.opensea.io/api/v1/assets?owner=0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB");
    xhr.send(data);

  };

  render() {

    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1, width, padding: 10, backgroundColor: 'transparent'}}>
          <Text style={{fontWeight: '600', fontSize: 18}}>Tokens</Text>
          {/*{this.state.tokens.length > 0 && this.state.tokens.map((token, i) => {*/}
            {/*const {tokenInfo} = token;*/}
            {/*return (*/}
              {/*<View key={i} style={styles.tokenBox}>*/}
                {/*{tokenInfo.image ?*/}
                  {/*<View style={styles.tokenContainer}>*/}
                    {/*<Image source={{uri: tokenInfo.image}} style={styles.tokenImage}/>*/}
                  {/*</View> :*/}
                  {/*<View style={styles.tokenContainer}>*/}
                    {/*<Text>{tokenInfo.symbol.substring(0, 4)}</Text>*/}
                  {/*</View>*/}
                {/*}*/}
                {/*<View style={{alignItems: 'flex-start', justifyContent: 'space-around'}}>*/}
                  {/*<Text>{tokenInfo.name}</Text>*/}
                  {/*<Text>{(parseInt(token.balance)/Math.pow(10, parseInt(tokenInfo.decimals))).toFixed(2)} {tokenInfo.symbol.substring(0, 4)}</Text>*/}
                {/*</View>*/}
              {/*</View>*/}

            {/*)*/}
          {/*})}*/}
          <Text style={{fontWeight: '600', fontSize: 18}}>Unique Tokens</Text>
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between'}}>
          {this.state.nfts.length > 0 && this.state.nfts.map((nft, i) => {
            if (nft.collection) {
              return (
                <NFT nft={nft}/>
              )
            }
          })}
          </View>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'transparent'
  },
  tokenBox: {
    flexDirection: 'row',
    width: '100%',
    margin: 8,

  },
  tokenContainer: {
    backgroundColor: '#c9c9c9',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  tokenImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  }
});
