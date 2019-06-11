/*
 * This is the App Registrar for Alice
 * Register your app by:
 * 1. Creating a folder in the src/Apps directory which contains your React Native app
 * 2. Exporting your app in the App Export Section
 * 3. Adding your app to the list of apps in the Apps List Section
*/

import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, View, TextInput, Dimensions, RNFetchBlob, NativeModules
} from 'react-native';
import Icon from '../Components/IconComponent';

/*        App Export Section */
export { default as Fork } from './Fork';
// export { default as Bounties } from './Bounties';
// export { default as Cryptokitties } from './Cryptokitties';
// export { default as RadarRelay } from './RadarRelay';
// export { default as LocalEthereum } from './LocalEthereum';
// export { default as Wyre } from './Wyre';
// export { default as Peepeth } from './Peepeth';
export { default as Foam } from './Foam';
// export { default as Dharma } from './Dharma';
// export { default as Compound } from './Compound';
// export { default as MetaMultisig } from './MetaMultisig';
// export { default as Uniswap } from './Uniswap';
// export { default as Gitcoin } from './Gitcoin';
// export { default as Synthetix } from './Synthetix';
// export { default as Aragon } from './Aragon';
// export { default as Decentraland } from './Decentraland';
// export { default as Qantas } from './Qantas';
// export { default as Augur } from './Augur';
// export { default as Veil } from './Veil';


const { height, width } = Dimensions.get('window');

type Props = {};
export default class AppsScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon="HomeGrey" size={45}/>,
    };
  };

  componentDidMount() {

  }

  send = () => {
    NativeModules.NativeModuleCallSwift.helloSwift("0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB", "0xE115012aA32a46F53b09e0A71CD0afa0658Da55F", "10000000000");
  }

  navigate = () => console.log('hello');

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.H1}>Experiences</Text>
          <View style={styles.appsContainer}>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#ffffff' }]} onPress={() => this.props.navigation.navigate('Fork')}>
                <Image source={require('../Assets/fork-logo.png')} style={{ borderRadius: 32.5, height: 65, justifyContent: 'center', width: 65, resizeMode: 'contain', }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Fork</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={styles.appSquare} onPress={() => this.props.navigation.navigate('RadarRelay')}>
                <Image source={require('../Assets/radar-black.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Radar</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#ffd6f7' }]} onPress={() => this.props.navigation.navigate('Cryptokitties')}>
                <Image source={require('../Assets/cryptokitties.png')} style={{ width: 60, height: 60, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Cryptokitties</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#08072c' }]} onPress={() => this.props.navigation.navigate('Dharma')}>
                <Image source={require('../Assets/dharma.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Dharma</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#ffffff' }]} onPress={() => this.props.navigation.navigate('Wyre')}>
                <Image source={require('../Assets/wyre-1.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Wyre</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#ffffff' }]} onPress={() => this.props.navigation.navigate('Peepeth')}>
                <Image source={require('../Assets/peepeth.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Peepeth</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#5A28C6' }]} onPress={() => this.props.navigation.navigate('Bounties')}>
                <Image source={require('../Assets/bounties.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Bounties</Text>
            </View>

            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#0a0817' }]} onPress={() => this.props.navigation.navigate('Synthetix')}>
                <Image source={require('../Assets/synthetix.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Synthetix</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#ffffff' }]} onPress={() => this.props.navigation.navigate('Augur')}>
                <Image source={require('../Assets/augur-logo.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Augur</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#faa8ff' }]} onPress={() => this.props.navigation.navigate('Uniswap')}>
                <Image source={require('../Assets/uniswap.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>UniSwap</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#0D023B' }]} onPress={() => this.props.navigation.navigate('Gitcoin')}>
                <Image source={require('../Assets/gitcoin.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>GitCoin</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#ffffff'}]} onPress={() => this.props.navigation.navigate('Decentraland')}>
                <Image source={require('../Assets/decentraland.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Decentraland</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#ffffff'}]} onPress={() => this.props.navigation.navigate('Decentraland')}>
                <Image source={require('../Assets/gnosis-logo.png')} style={{ width: 65, height: 65, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Gnosis</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#efefef'}]} onPress={() => this.props.navigation.navigate('Aragon')}>
                <Image source={require('../Assets/aragon.png')} style={{ width: 50, height: 50., resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Aragon</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#dbe0ff' }]} onPress={() => this.props.navigation.navigate('LocalEthereum')}>
                <Image source={require('../Assets/localethereum.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>localethereum</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#fff4c8' }]} onPress={() => this.props.navigation.navigate('App100')}>
                <Image source={require('../Assets/etheremon.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Etheremon</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#37474f' }]} onPress={() => this.props.navigation.navigate('App100')}>
                <Image source={require('../Assets/compound.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Compound</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#ffffff' }]} onPress={() => this.props.navigation.navigate('Foam')}>
                <Image source={require('../Assets/foam.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Foam</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#1b1c22' }]} onPress={() => this.props.navigation.navigate('')}>
                <Image source={require('../Assets/dydx.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>dy/dx</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#0024ed' }]} onPress={() => this.props.navigation.navigate('Veil')}>
                <Image source={require('../Assets/veil.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Veil</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#181e2a' }]} onPress={() => this.props.navigation.navigate('')}>
                <Image source={require('../Assets/hummingbot.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Hummingbot</Text>
            </View>
            <View style={styles.appIcon}>
            <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#FFFFFF' }]} onPress={() => this.props.navigation.navigate('')}>
            <Image source={require('../Assets/daostack.png')} style={{ width: 45, height: 45, resizeMode: 'contain' }}/>
            </TouchableOpacity>
            <Text style={styles.appText}>DAOStack</Text>
            </View>
            {/*<Text>                 Your App ( uncomment the code below this line & delete this entire line of code )                   </Text>*/}
            {/*<View style={styles.appIcon}>*/}
            {/*<TouchableOpacity style={[styles.appSquare, { backgroundColor: '#F20000' }]} onPress={() => this.props.navigation.navigate('Qantas')}>*/}
            {/*<Image source={require('../Assets/your_app_logo.png')} style={{ width: 45, height: 45, resizeMode: 'contain' }}/>*/}
            {/*</TouchableOpacity>*/}
            {/*<Text style={styles.appText}>Your App's Name</Text>*/}
            {/*</View>*/}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  H1: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 17,
  },
  appIcon: {
    alignItems: 'center',
    height: 84,
    margin: 10,
    maxWidth: 84,
    justifyContent: 'space-between',
  },
  appsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 10,
    paddingTop: 10,
    width: width - 20,

  },
  appSquare: {
    alignItems: 'center',
    backgroundColor: '#43fd9c',
    borderRadius: 32.5,
    height: 65,
    justifyContent: 'center',
    width: 65,
    shadowColor: '#7d7d7d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  appText: {
    color: 'black',
    fontSize: 10,
    // fontFamily: 'Graphik',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  headingText: {
    color: 'black',
    fontSize: 20,
    // fontFamily: 'Graphik',
    fontWeight: '500'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
