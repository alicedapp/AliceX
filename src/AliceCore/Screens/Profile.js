import {Component} from "react";
import {
  Clipboard,
  StyleSheet,
  ScrollView,
  TextInput,
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
import Modal from "react-native-modal";
import QRCode from 'react-native-qrcode-svg';
import {Wallet} from '../../AliceSDK/Web3'
import AppIcon from "../../AliceComponents/AppIcon";
import {AppRegistry} from "../../Apps";

//TODO: needs api key


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenInfo: '',
      token: '',
      tokens: [],
      ethereum: {},
      nfts: [],
      profileModalVisible: false,
      tokenModalVisible: false,
      address: ''
    };

  }

  async componentDidMount() {
    this.getTokenInfo();
    this.getNFTInfo();
    this.setState({address: await Wallet.getAddress()})
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

  toggleModal = () => {
    this.setState({profileModalVisible: !this.state.profileModalVisible})
  };

  openTokenModal = (tokenInfo, token) => {
    this.setState({tokenModalVisible: !this.state.tokenModalVisible, tokenInfo, token})
  };

  closeTokenModal = () => {
    this.setState({tokenModalVisible: !this.state.tokenModalVisible})
  };

  getNFTInfo = async () => {
    let data = null;
    var xhr = new XMLHttpRequest();
    const onData = (data) => {
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
    console.log('ADDRESS: ', this.state.address)
    return (
      <View style={styles.container}>
        <View style={{
          width: '100%', padding: 20, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.2)', alignItems: 'center', justifyContent: 'center'}} onPress={this.toggleModal}>
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
              <Token onPress={() => this.openTokenModal(tokenInfo, token)} key={i} iterator={i} tokenInfo={tokenInfo} token={token}/>
            )
          })}
          <Text style={{fontWeight: '600', fontSize: 18}}>Unique Tokens</Text>
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between'}}>
            {this.state.nfts.length > 0 && this.state.nfts.map((nft, i) => {
              if (nft.collection) {
                return (
                  <NFT iterator={i} key={i} nft={nft}/>
                )
              }
            })}
          </View>
        </ScrollView>
        <Modal
          isVisible={this.state.tokenModalVisible}
          onBackdropPress={this.closeTokenModal}
          style={styles.modal}
        >
          <View style={{width: '100%', backgroundColor: 'white', padding: 5, borderRadius: 25, alignItems: 'center', justifyContent: 'center'}}>
            <Token tokenInfo={this.state.tokenInfo} token={this.state.token} />
          </View>
          <View style={{height: 100, width: '100%'}}>
            <ScrollView horizontal>
              {AppRegistry.map((app, i) => {
                return (<AppIcon key={i} appName={app.appName} backgroundColor={app.backgroundColor} homeRoute={app.homeRoute} icon={app.icon} iterator={i} />)
              })
              }
            </ScrollView>
          </View>
          <View style={{width: '100%', backgroundColor: 'white', padding: 5, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput placeholder="Enter address or ENS"/>
            <TouchableOpacity>
              <Image source={require('../../AliceAssets/cam-icon-black.png')} style={{width: 20, resizeMode: 'contain'}}/>
            </TouchableOpacity>
          </View>

        </Modal>
        <Modal
          isVisible={this.state.profileModalVisible}
          onBackdropPress={this.toggleModal}
          style={styles.modal}
        >
          <View style={styles.modalBox}>
            <QRCode
              value={`{ethereum: ${this.state.address}}`}
            />
            <Text style={{color: 'black'}}>{this.state.address}</Text>

          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity onPress={() => Clipboard.getString(this.state.address)} style={{ ...styles.buttons, marginRight: 7, borderTopRightRadius: 7, borderTopLeftRadius: 20, borderBottomRightRadius: 7, borderBottomLeftRadius: 20 }}>
              <Image style={{width: 20, resizeMode: 'contain'}} source={require('../../AliceAssets/copy.png')}/>
              <Text style={{fontSize: 17, fontWeight: '700', color: 'white'}}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.buttons, borderTopRightRadius: 20, borderTopLeftRadius: 7, borderBottomRightRadius: 20, borderBottomLeftRadius: 7 }}>
              <Image style={{width: 20, resizeMode: 'contain'}} source={require('../../AliceAssets/share.png')}/>
              <Text style={{fontSize: 17, fontWeight: '700', color: 'white'}}>Share</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
  buttons: {
    backgroundColor: 'rgba(256,256,256,0.5)',
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBox: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 25,
  }

});
