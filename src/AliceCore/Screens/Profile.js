import {Component} from "react";
import {
  Animated,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import React from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {onSortOptions} from "../../Apps/Foam/utils";
const { height, width } = Dimensions.get('window');
const cols = 2, rows = 2;
import NFT from '../../AliceComponents/NFT'
import Token from '../../AliceComponents/Token'
import {navigate} from "../../AliceUtils/navigationWrapper";

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
        <View style={{
          width: '100%', padding: 20, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.2)', alignItems: 'center', justifyContent: 'center'}} onPress={() => navigate('Profile')}>
            <Image source={require('../../AliceAssets/avatar-black.png')} style={{ resizeMode: 'contain', width: 17, height: 17 }}/>
          </TouchableOpacity>
          <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.2)', alignItems: 'center', justifyContent: 'center'}} onPress={this.openSettings}>
            <Image source={require('../../AliceAssets/settings-gear.png')} style={{ resizeMode: 'contain', width: 17, height: 17 }}/>
          </TouchableOpacity>
        </View>

        <ScrollView style={{flex: 1, width: '100%', padding: 10, backgroundColor: 'transparent'}}>
          <Text style={{fontWeight: '600', fontSize: 18}}>Tokens</Text>
          {this.state.tokens.length > 0 && this.state.tokens.map((token, i) => {
            const {tokenInfo} = token;
            if (tokenInfo.name === "") return;
            return (
              <Token key={i} tokenInfo={tokenInfo} token={token}/>
            )
          })}
          <Text style={{fontWeight: '600', fontSize: 18}}>Unique Tokens</Text>
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between'}}>
            {this.state.nfts.length > 0 && this.state.nfts.map((nft, i) => {
              if (nft.collection) {
                return (
                  <NFT key={i} nft={nft}/>
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
});
