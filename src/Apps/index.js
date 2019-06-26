/*
 * This is the ExampleMaps Registrar for Alice
 * Register your app by:
 * 1. Creating a folder in the src/Apps directory which contains your React Native app
 * 2. Exporting your app in the ExampleMaps Export Section
 * 3. Adding your app to the list of apps in the Apps List Section
*/

import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, View, TextInput, Dimensions, NativeModules
} from 'react-native';
import Icon from '../Components/IconComponent';

/*        ExampleMaps Export Section */
export { default as Fork } from './Fork';
export { default as Foam } from './Foam';
export { default as Test } from './Example';


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
                <Image source={require('../AliceAssets/fork-logo.png')} style={{ borderRadius: 32.5, height: 65, justifyContent: 'center', width: 65, resizeMode: 'contain', }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Fork</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={styles.appSquare} onPress={() => this.props.navigation.navigate('RadarRelay')}>
                <Image source={require('../AliceAssets/radar-black.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Radar</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#ffffff' }]} onPress={() => this.props.navigation.navigate('Test')}>
                <Image source={require('./Example/Assets/buidler.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>#BUIDL</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#ffd6f7' }]} onPress={() => this.props.navigation.navigate('Cryptokitties')}>
                <Image source={require('../AliceAssets/cryptokitties.png')} style={{ width: 60, height: 60, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Cryptokitties</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#5A28C6' }]} onPress={() => this.props.navigation.navigate('Bounties')}>
                <Image source={require('../AliceAssets/bounties.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Bounties</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#faa8ff' }]} onPress={() => this.props.navigation.navigate('Uniswap')}>
                <Image source={require('../AliceAssets/uniswap.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>UniSwap</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#0D023B' }]} onPress={() => this.props.navigation.navigate('Gitcoin')}>
                <Image source={require('../AliceAssets/gitcoin.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>GitCoin</Text>
            </View>

            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#dbe0ff' }]} onPress={() => this.props.navigation.navigate('LocalEthereum')}>
                <Image source={require('../AliceAssets/localethereum.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>localethereum</Text>
            </View>
            <View style={styles.appIcon}>
              <TouchableOpacity style={[styles.appSquare, { backgroundColor: '#ffffff' }]} onPress={() => this.props.navigation.navigate('Foam')}>
                <Image source={require('../AliceAssets/foam.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }}/>
              </TouchableOpacity>
              <Text style={styles.appText}>Foam</Text>
            </View>
            {/*<Text>                 Your ExampleMaps ( uncomment the code below this line & delete this entire line of code )                   </Text>*/}
            {/*<View style={styles.appIcon}>*/}
            {/*<TouchableOpacity style={[styles.appSquare, { backgroundColor: '#F20000' }]} onPress={() => this.props.navigation.navigate('Qantas')}>*/}
            {/*<Image source={require('../Assets/your_app_logo.png')} style={{ width: 45, height: 45, resizeMode: 'contain' }}/>*/}
            {/*</TouchableOpacity>*/}
            {/*<Text style={styles.appText}>Your ExampleMaps's Name</Text>*/}
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
