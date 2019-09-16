import React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NavigationBar} from "../../../AliceCore/Components/NavigationBar";
import Button from '../Components/Button'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {Settings, Wallet, Contract} from "../../../AliceSDK/Web3";
import env from '../../../../env'
import {BasicTournament} from "../Addresses";
import ABIs from "../ABIs";
import DraggableArea from 'react-native-dnd-grid'
import Pane from "../Components/pane"
import {switchcase} from "../Utils";
import {ethers} from 'ethers'
import metrics from "../Utils/metrics";


const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

export default class MapComponent extends React.Component {

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
      loading: false,
      // loading: true,
      pressed: false,
      items: [{name: 'wind', key: 1}],
      itemsPerRow: 1
    };

  }

  componentDidMount() {
    this.fetchWizards();
  }

  animate = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.setState({pressed: !this.state.pressed});
  }

  fetchWizards = async () => {
    let data = null;
    var xhr = new XMLHttpRequest();
    const onData = (data) => {
      console.log('NFT DATA: ', data);
      if (data.assets) {
        this.setState({nftInfo: data, nfts: data.assets});
      }
    };
    xhr.addEventListener("readystatechange",  function()  {
      if (this.readyState === this.DONE) {
        if (this.responseText){
          onData(JSON.parse(this.responseText));
        }
      }
    });
    xhr.open("GET", "https://cheezewizards-rinkeby.alchemyapi.io/wizards?owner="+await Wallet.getAddress());
    xhr.setRequestHeader("Content-Type","application/json")
    xhr.setRequestHeader("x-api-token", env.cheezeWizard)
    xhr.setRequestHeader("x-email","mark@alicedapp.com")


    xhr.send(data);
    setTimeout(() => this.setState({loading: false}), 2000);
  };

  openMap = () => {
    this.props.navigation.navigate('CheezeWizards/Map');
  };

  actionPress = (name) => {
    ReactNativeHapticFeedback.trigger("selection", options);
    if (this.state.items.length === 0) {
      this.setState({ items: [{name: name, key: this.state.items.length + 1}] })
    }
    if (this.state.items.length !== 0 && this.state.items.length < 5) {
      this.setState({ items: [...this.state.items, {name: name, key: this.state.items.length + 1}] })
    }
  };

  fight = async () => {
    this.setState({pressed: !this.state.pressed});
    const commitmentHash = ethers.utils.keccak256('0x0202020202')
    try {
      const txHash = await Contract.write({contractAddress: BasicTournament.rinkeby, abi: ABIs.BasicTournament.abi, functionName: 'oneSidedCommit', parameters: [799, 800, '0x0202020202'], value: '0', data: '0x0'})
      console.log('txHash: ', txHash);
      this.setState({txHash})
    } catch(e) {
      console.log(e);
    }
  };

  onDraggablePress = draggable => {
    console.log("onDraggablePress", draggable)
  }

  onDraggableRender = draggable => {
    console.log("onDraggableRender", draggable)
  }

  onPressAddNewTag = () => {
    alert("onPressAddNewTag")
  }

  removeItem = item => {
    this.setState(state => {
      const index = state.items.findIndex(({ key }) => key === item.key)
      return {
        items: [...state.items.slice(0, index), ...state.items.slice(index + 1)]
      }
    })
  }

  renderItem = (item, onPress) => {
    const size = 60;
    const i = this.state.items.length + 1;
    return (
      <Pane
        isBeingDragged={item.isBeingDragged}
        onPress={onPress}
        width={size}
        height={size}
      >
        {switchcase({
          "fire": <Image source={require('../Assets/fire-list.png')} key={i} style={{
            resizeMode: 'contain',
            width: 40,
            height: 40,
            marginVertical: 10
          }}/>,
          "water": <Image source={require('../Assets/water-list.png')} key={i} style={{
            resizeMode: 'contain',
            width: 40,
            height: 40,
            marginVertical: 10
          }}/>,
          "wind": <Image source={require('../Assets/earth-list.png')} key={i} style={{
            resizeMode: 'contain',
            width: 40,
            height: 40,
            marginVertical: 10
          }}/>,
        })(item.name)}
      </Pane>
    )
  }

  handleOnDragEnd = items => {
    console.log("items", items)
  };

  render() {
    const { navigation } = this.props;
    const { items } = this.state;
    console.log('THIS>STATE>DUEL: ', this.state)
    return (
      <View style={{flex: 1, backgroundColor: '#fef064', alignItems: 'center', justifyContent: 'flex-start'}}>
        <NavigationBar/>
        {this.state.loading === true ? <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
          <Image source={require('../Assets/landing.png')} style={{
            width,
            resizeMode: 'contain',
          }}/>
        </View> : <View style={{ flex: 1, width, backgroundColor: '#000', alignItems: 'center', }}>
          <Image source={require('../Assets/melting-cheese.png')} style={{
            resizeMode: 'contain',
            height: 250,
            position: 'absolute', top: 0
          }}/>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around',}}>
            <View style={{flexDirection: 'row', position: 'absolute', top: 70, zIndex: 9999, flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
              <Button onPress={this.openMap} style={{flex: 1}}>
                <Image source={require('../Assets/location.png')} style={{
                  resizeMode: 'contain',
                  width: 40,
                  height: 45
                }}/>
              </Button>
              <View style={{flex: 5, height: 50, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
                <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>DUEL</Text>
              </View>
              <Button onPress={Settings.settingsPopUp} style={{flex: 1}}>
                <Image source={require('../Assets/settings-icon.png')} style={{
                  resizeMode: 'contain',
                  width: 50,
                  height: 50
                }}/>
              </Button>
            </View>
            <View style={{width: width -40, flexDirection: 'row', paddingTop: 130, justifyContent: 'space-between', alignItems: 'center'}}>
              <View>
                <Image source={require('../Assets/water-wizard.png')} style={{
                  resizeMode: 'contain',
                  width: 200,
                  height: 300
                }}/>
                <Text style={{color: 'white', fontSize: 30, fontFamily: 'Exocet'}}>WINS 0</Text>
                <Text style={{color: 'white', fontSize: 30, fontFamily: 'Exocet'}}>LOSSES 0</Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <ImageBackground source={require('../Assets/cheeze-board-vertical.png')}
                                 imageStyle={{resizeMode: 'contain'}}
                                 style={{alignItems: 'center', justifyContent: 'flex-start', width: 70, height: 400, paddingTop: 40}}>
                  <DraggableArea
                    items={items}
                    animationDuration={10}
                    onPressAddNew={console.log}
                    onPress={this.removeItem}
                    onRenderItem={this.onDraggableRender}
                    onPressAddNewTag={this.onPressAddNewTag}
                    onDragEnd={this.handleOnDragEnd}
                    renderItem={this.renderItem}
                    useKey="key"
                  />
                </ImageBackground>
              </View>

            </View>
            <View>
              <TouchableWithoutFeedback {...this.props} onPressIn={this.animate} onPressOut={this.fight}>
                {this.state.pressed ? <Image source={require('../Assets/pressed-cheeze-button.png')} style={{
                  resizeMode: 'contain',
                  width: 100,
                  height: 100
                }}/> : <Image source={require('../Assets/cheeze-button.png')} style={{
                  resizeMode: 'contain',
                  width: 100,
                  height: 100
                }}/>}
              </TouchableWithoutFeedback>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 50}}>
              <Button onPress={() => this.actionPress('fire')}>
                <Image source={require('../Assets/fire-button.png')} style={{
                  resizeMode: 'contain',
                  width: 55,
                  height: 55
                }}/>
              </Button>
              <Button onPress={() => this.actionPress('water')}>
                <Image source={require('../Assets/water-button.png')} style={{
                  resizeMode: 'contain',
                  width: 55,
                  height: 55
                }}/>
              </Button>
              <Button onPress={() => this.actionPress('wind')}>
                <Image source={require('../Assets/earth-button.png')} style={{
                  resizeMode: 'contain',
                  width: 55,
                  height: 55
                }}/>
              </Button>
            </View>
          </View>
        </View>}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  sharpShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 0,
    shadowOpacity: 1,

  }
});

