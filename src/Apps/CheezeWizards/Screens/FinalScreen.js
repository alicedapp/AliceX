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
import {BasicTournament} from "../Addresses";
import ABIs from "../ABIs";
import colors from "../Utils/colors";
import WizardCard from "../Components/WizardCard";
import {switchcase} from "../Utils";
import Button from '../Components/Button'
import db from '../../../AliceSDK/Socket'
import {Wallet, Contract} from "../../../AliceSDK/Web3";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

export default class BattleScreen extends React.Component {

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
      scannedWizard: null,
      users: '',
      wizard: {},
      instantiated: false,
      receivedChallenge: null,
      footerColor: '#ffffff',
      challengedWizard: {},
      loading: true,
      screen: 1,
      win: false
    };
  }

  componentDidMount() {
    // this.getBattleStatus();
    this.loading();
  }

  getColor = wizard => {
    const color = switchcase({
      1: () => this.setState({footerColor: colors.neutralMainColor}),
      2: () => this.setState({footerColor: colors.fireMainColor}),
      3: () => this.setState({footerColor: colors.waterMainColor}),
      4: () => this.setState({footerColor: colors.windMainColor}),
    });
    return color(wizard.affinity)();
  };

  incrementScreen = () => {
    return this.state.screen < 3 ? this.setState({screen: this.state.screen + 1, footerColor: '#7dff6d'}) : this.setState({screen: 1, loading: false, win: true});
  };

  loading = () => {
    for (i = 2; i < 15; i++) {
      setTimeout(this.incrementScreen, i * 1000);
    }
  };

  renderResults = () => {
     return this.state.win ? <ImageBackground source={require('../Assets/won-screen.png')} style={{ flex: 1, width, alignItems: 'center',}}>
      <View style={{ marginTop: 100, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      </View>
    </ImageBackground> : <ImageBackground source={require('../Assets/lost-screen.png')} style={{ flex: 1, width, alignItems: 'center',}}>
      <View style={{ marginTop: 100, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      </View>
    </ImageBackground>

  };

  renderLoading = () => {
    return (<View style={{flex: 1}}>
        {this.state.screen === 1 && <ImageBackground source={require('../Assets/loading-screen-1.png')} style={{ flex: 1, width, alignItems: 'center',}}>
          <View style={{ marginTop: 100, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          </View>
        </ImageBackground>
        }
        {this.state.screen === 2 && <ImageBackground source={require('../Assets/loading-screen-2.png')} style={{ flex: 1, width, alignItems: 'center',}}>
          <View style={{ marginTop: 100, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          </View>
        </ImageBackground>
        }
        {this.state.screen === 3 && <ImageBackground source={require('../Assets/loading-screen-3.png')} style={{ flex: 1, width, alignItems: 'center',}}>
          <View style={{ marginTop: 100, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          </View>
        </ImageBackground>
        }
      </View>

    )
  }


  render() {
    console.log('STATE: ', this.state);
    return (
      <View style={{flex: 1, backgroundColor: this.state.footerColor, alignItems: 'center', justifyContent: 'flex-start'}}>
        <NavigationBar/>
        {!!this.state.loading ? this.renderLoading() : this.renderResults()}
      </View>)
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

