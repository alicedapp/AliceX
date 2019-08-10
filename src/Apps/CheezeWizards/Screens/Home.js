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
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import Button from '../Components/Button'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {Contract, Settings} from "../../../AliceSDK/Web3";
import {FoodContractABI} from "../../Example/ABI";
import {BasicTournament} from '../ABIs/BasicTournament';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

export default class MapComponent extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarVisible: false,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      // loading: false,
      pressed: false,
      actionList: [],
      loading: true,
    };

  }

  componentDidMount() {
    this.fetchWizard();
  }

  animate = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.setState({pressed: !this.state.pressed});
  }

  fetchWizard = () => {
    setTimeout(() => this.setState({loading: false}), 2000);
  };

  openMap = () => {
    this.props.navigation.navigate('CheezeMap');
  };

  actionPress = (action) => {
    ReactNativeHapticFeedback.trigger("selection", options);
    if (this.state.actionList.length < 3) {
      this.setState({ actionList: [...this.state.actionList, action] })
    }
  };

  fight = async () => {
    this.setState({pressed: !this.state.pressed});
    try {
      const contractTxHash = await Contract.write({contractAddress: '0x108FC97479Ec5E0ab8e68584b3Ea9518BE78BeB4', abi: BasicTournament.abi, functionName: 'onseSidedCommit', parameters: ['3961', ...this.state.actionList], value: '0.0', data: '0x0'})
      console.log('contractTxHash: ', contractTxHash);
      this.setState({contractTxHash})

    } catch(e) {
      console.log(e)
    }
  };


  render() {
    const { navigation } = this.props;
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
          </View> : <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', }}>
            <Image source={require('../Assets/melting-cheese.png')} style={{
              resizeMode: 'contain',
            }}/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around', marginTop: -150, marginBottom: 30}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Button onPress={this.openMap} style={{flex: 1}}>
                  <Image source={require('../Assets/location.png')} style={{
                    resizeMode: 'contain',
                    width: 40,
                    height: 45
                  }}/>
                </Button>
                <View style={{flex: 5, height: 50, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
                  <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>MARK PEREIRA</Text>
                </View>
                <Button onPress={Settings.settingsPopUp} style={{flex: 1}}>
                  <Image source={require('../Assets/settings-icon.png')} style={{
                    resizeMode: 'contain',
                    width: 50,
                    height: 50
                  }}/>
                </Button>
              </View>
              <View style={{width: width -40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
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
                    {this.state.actionList.map((action, i) => {
                      if (action === 'fire') {
                        return (
                          <Image source={require('../Assets/fire-list.png')} key={i} style={{
                            resizeMode: 'contain',
                            width: 40,
                            height: 40,
                            marginVertical: 30
                          }}/>
                        )
                      } else if (action === 'water') {
                        return (
                          <Image source={require('../Assets/water-list.png')} key={i} style={{
                            resizeMode: 'contain',
                            width: 40,
                            height: 40,
                            marginVertical: 30
                          }}/>
                        )
                      } else if (action === 'earth') {
                        return (
                          <Image source={require('../Assets/earth-list.png')} key={i} style={{
                            resizeMode: 'contain',
                            width: 40,
                            height: 40,
                            marginVertical: 30
                          }}/>
                        )
                      } else if (action === 'neutral') {
                        return (
                          <Image source={require('../Assets/neutral-list.png')} key={i} style={{
                            resizeMode: 'contain',
                            width: 40,
                            height: 40,
                          }}/>
                        )
                      }
                    })}
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
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
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
                <Button onPress={() => this.actionPress('earth')}>
                  <Image source={require('../Assets/earth-button.png')} style={{
                    resizeMode: 'contain',
                    width: 55,
                    height: 55
                  }}/>
                </Button>
                <Button onPress={() => this.actionPress('neutral')}>
                  <Image source={require('../Assets/neutral-button.png')} style={{
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

