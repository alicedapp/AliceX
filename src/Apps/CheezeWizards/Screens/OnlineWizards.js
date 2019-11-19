import React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View, ScrollView, RefreshControl, TouchableOpacity
} from "react-native";
import {NavigationBar} from "../../../AliceCore/Components/NavigationBar";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {Settings, Wallet} from "../../../AliceSDK/Web3";
import env from '../../../../env';
import WizardCard from '../Components/WizardCard';
import Modal from "../Components/Modal";

import _ from 'lodash';

import {db} from '../../../AliceSDK/Firebase'
import FirebaseService from '../Services/Firebase/FirebaseService';
import Button from "../Components/Button";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

export default class WizardScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null,
      tabBarVisible: false,
    };
  };

  handleViewRef = ref => this.view = ref;

  constructor(props) {
    super(props);

    this.state = {
      flash: false,
      cameraType: 'back',
      backgroundColor: 'transparent',
      pressed: false,
      actionList: [],
      qrModalVisible: true,
      arrowModalVisible: false,
      scannedWizard: null,
      users: '',
      fetching: true,
      wizard: {},
      onlineWizards: [],
      instantiated: false,
      receivedChallenge: null
    };

  }

  _refresh = () => {
    this.fetchOnlineWizards();
  };

  startDuel = async (myWizard, challengedWizard) => {
    console.log('CHAllenged wizard: ', challengedWizard)
    this.props.navigation.navigate('CheezeWizards/Duel', {wizard: myWizard, challengedWizard});
    myWizard.challengeId = '_' + Math.random().toString(36).substr(2, 9);
    db.collection("users").doc(challengedWizard.owner).set(myWizard);
  };

  fetchOnlineWizards = async () => {
    const onlineWizards = await FirebaseService.getOnlineWizards((await Wallet.getNetwork()).name.toLowerCase());
    console.log('ONLINE WIZARDS: ', onlineWizards);
    this.setState({onlineWizards, fetching: false});
  };

  async componentDidMount() {
    try {
      this.fetchOnlineWizards();
      this.setState({wizard: this.props.navigation.state.params.wizard});
    } catch(e) {
      console.log("WIZARD SCREEN ERROR: ", e);
    }
  }

  render() {
    return (
        <ImageBackground source={require('../Assets/blank-squares.png')} style={{flex: 1, width, alignItems: 'center', paddingTop: 40}}>
          <NavigationBar/>
          <View style={{flexDirection: 'row', position: 'absolute', top: 70, zIndex: 9999, flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
            <Button onPress={this.openMap}>
              <Image source={require('../Assets/location.png')} style={{
                resizeMode: 'contain',
                width: 40,
                height: 45,
                margin: 10
              }}/>
            </Button>
            <View style={{flex: 5, height: 50, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
              <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>ONLINE WIZARDS</Text>
            </View>
            <Button onPress={Settings.settingsPopUp}>
              <Image source={require('../Assets/settings-icon.png')} style={{
                resizeMode: 'contain',
                width: 50,
                height: 50,
                margin: 10
              }}/>
            </Button>
          </View>
          <ScrollView contentContainerStyle={{width: width - 40, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap', paddingTop: 150}} showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl
              refreshing={this.state.fetching}
              onRefresh={this._refresh}
            />}
          >
            {this.state.onlineWizards.map((onlineWizard, i) => {
              return (
                <TouchableOpacity style={{marginVertical: 10}} key={i} onPress={() => this.startDuel(this.state.wizard, onlineWizard)}>
                  <WizardCard style={{height: width - 150, width: width-230}} wizard={onlineWizard}/>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </ImageBackground>)
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

