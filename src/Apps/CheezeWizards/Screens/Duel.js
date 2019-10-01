import React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View, TouchableOpacity,
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
import WizardCard from "../Components/WizardCard";
import { DraggableGrid } from 'react-native-draggable-grid';
const ELEMENT_FIRE = 2;
const ELEMENT_WATER = 3;
const ELEMENT_WIND = 4;


const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const salt = '0x3c384b5dc37b35b583bb7565a72ccd72d7926c34cd52af7ce8675816bedc3930';

const { height, width } = Dimensions.get('window');

export default class DuelScreen extends React.Component {

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
      items: [
        {
          name: 1,
          element: 'fire'
        },
        {
          name: 2,
          element: "water"

        },
        {
          name: 3,
          element: "wind"

        },
        {
          name: 4,
          element: "fire"

        },
        {
          name: 5,
          element: "water"

        },
      ],
      itemsPerRow: 1
    };

  }

  animate = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.setState({pressed: !this.state.pressed});
  };

  openMap = () => {
    this.props.navigation.navigate('CheezeWizards/Map');
  };

  actionPress = (name) => {
    ReactNativeHapticFeedback.trigger("selection", options);
    if (this.state.items.length < 1) {
      this.setState({ items: [{name: '_' + Math.random().toString(36).substr(2, 9), element: name}] })
    }
    if (this.state.items.length > 0 && this.state.items.length < 5) {
      this.setState({ items: [...this.state.items, {name: '_' + Math.random().toString(36).substr(2, 9), element: name}] })
    } else {
      ReactNativeHapticFeedback.trigger("notificationError", options);
    }
  };

  fight = async () => {
    this.setState({pressed: !this.state.pressed});
    // const commitmentHash = '011011011011011';
    const commitmentHash = ethers.utils.keccak256('0x234230000000000000000000000000000x3c384b5dc37b35b583bb7565a72ccd72');
    // const commitmentHash = ethers.utils.formatBytes32String('0x011011011011011');
    console.log('COMMITMENT HASH: ', commitmentHash);
    try {
      const txHash = await Contract.write({contractAddress: BasicTournament.rinkeby, abi: ABIs.BasicTournament, functionName: 'oneSidedCommit', parameters: [6091, 6091, commitmentHash], value: '0', data: '0x0'})
      console.log('txHash: ', txHash);
      this.setState({txHash})
    } catch(e) {
      console.log(e);
    }
  };

  onDraggablePress = draggable => {
    console.log("onDraggablePress", draggable)
  };

  onDraggableRender = draggable => {
    console.log("onDraggableRender", draggable)
  };

  onPressAddNewTag = () => {
    alert("onPressAddNewTag")
  };

  removeItem = item => {
    this.setState(state => {
      const index = state.items.findIndex(({ name }) => name === item.name)
      return {
        items: [...state.items.slice(0, index), ...state.items.slice(index + 1)]
      }
    })
  };

  renderItem = (item, onPress) => {
    const size = 60;
    const i = this.state.items.length + 1;
    if (item) {

    }
    console.log('ITEM: ', item)
    return (
      <Pane
        isBeingDragged={item.isBeingDragged}
        onPress={onPress}
        width={size}
        height={size}
      >
        {switchcase({
          'fire': <Image source={require('../Assets/fire-list.png')} key={i} style={{
            resizeMode: 'contain',
            width: 40,
            height: 40,
            marginVertical: 10
          }}/>,
          'water': <Image source={require('../Assets/water-list.png')} key={i} style={{
            resizeMode: 'contain',
            width: 40,
            height: 40,
            marginVertical: 10
          }}/>,
          'wind': <Image source={require('../Assets/earth-list.png')} key={i} style={{
            resizeMode: 'contain',
            width: 40,
            height: 40,
            marginVertical: 10
          }}/>,
        })(item.element)}
      </Pane>
    )
  };

  handleOnDragEnd = items => {
    console.log("items", items)
  };

  render() {
    const { navigation } = this.props;
    const { items } = this.state;
    const { wizard, challengedWizard } = this.props.navigation.state.params;

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
            <View style={{width: width -40, paddingTop: 130, justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <WizardCard style={{width: 175, height: 260}} wizard={wizard}/>
                <Image source={require('../Assets/vs-ribbon.png')} style={{ width: 50, height: 50, resizeMode: 'contain', position: 'absolute', zIndex: 100}}/>
                <WizardCard style={{width: 175, height: 260}} wizard={challengedWizard}/>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <ImageBackground source={require('../Assets/cheeze-board.png')}
                                 imageStyle={{resizeMode: 'contain'}}
                                 style={{alignItems: 'center', justifyContent: 'flex-start', width: width - 40, height: 100, paddingTop: 40}}>
                  <DraggableArea
                    items={items}
                    animationDuration={10}
                    onPressAddNew={console.log}
                    onPress={this.removeItem}
                    onRenderItem={this.onDraggableRender}
                    onPressAddNewTag={this.onPressAddNewTag}
                    onDragEnd={this.handleOnDragEnd}
                    renderItem={this.renderItem}
                    useKey="name"
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

