import {Component} from "react";
import {StyleSheet, ScrollView, Text, Image, View, Dimensions} from "react-native";
import React from "react";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import {onSortOptions} from "../../Apps/Foam/utils";
const { height, width } = Dimensions.get('window');

//TODO: needs api key

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenInfo: '',
      tokens: [],
      ethereum: {}
    };

  }
  componentDidMount() {
    this.getTokenInfo()
  }

  getTokenInfo = async () => {
    let data = null;
    var xhr = new XMLHttpRequest();
    const onData = (data) => this.setState({tokenInfo: data, tokens: data.tokens});
    xhr.addEventListener("readystatechange",  function()  {
      if (this.readyState === this.DONE) {
        onData(JSON.parse(this.responseText));
        console.log(JSON.parse(this.responseText));
      }
    });
    xhr.open("GET", "https://api.ethplorer.io/getAddressInfo/0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB?apiKey=freekey");
    xhr.send(data);



  };

  render() {
    console.log('token: ', this.state.to);

    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1, width, padding: 20}}>
          {this.state.tokens.length > 0 && this.state.tokens.map((token, i) => {
            const {tokenInfo} = token;
            console.log('token info: ', tokenInfo);
            return (
              <View key={i} style={styles.tokenBox}>
                {tokenInfo.image ?
                  <Image source={{uri: tokenInfo.image}} style={styles.tokenImage}/> :
                  <View style={styles.tokenImage}>
                    <Text>{tokenInfo.symbol}</Text>
                  </View>
                }
                <View>
                  <Text>{tokenInfo.name}</Text>
                  <Text>{(parseInt(token.balance)/Math.pow(10, parseInt(tokenInfo.decimals))).toFixed(2)} {token.symbol}</Text>
                </View>


              </View>

            )
          })}
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
  },
  tokenBox: {
    flexDirection: 'row',
    width: '100%',
    margin: 8
  },
  tokenImage: {
    backgroundColor: '#c9c9c9',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  }
});
