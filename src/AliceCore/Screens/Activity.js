import {Component} from "react";
import {StyleSheet, ScrollView, Text, TouchableOpacity, Image, View, Dimensions, RefreshControl} from "react-native";
import React from "react";
import ThreeBoxActivity from '3box-activity';
import {addDataType} from "../../AliceUtils";
import { Activity } from "../Components/Activity";
import {Settings, Wallet} from "../../AliceSDK/Web3";
import {goBack, navigate} from "../../AliceUtils/navigationWrapper";
import { timeSince } from '../../AliceUtils/time';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const { height, width } = Dimensions.get('window');

//TODO: needs api key

export default class ActivityClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenInfo: '',
      tokens: [],
      ethereum: {},
      activity: {},
      categorizedActivity: [],
      fetching: true,
      feed: {},
      publicAddress: '',
    };

  }
  componentDidMount() {
    this.getTokenInfo()
  }

  _refresh = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.getTokenInfo();
  }

  getTokenInfo = async () => {
    this.setState({fetching: true});
    let activity;
    try {
      const publicAddress = await Wallet.getAddress();
      this.setState({publicAddress})
      activity = await ThreeBoxActivity.get(publicAddress);
      const categorizedActivity = await addDataType(activity);
      let feed = categorizedActivity.internal
          .concat(categorizedActivity.txs)
          .concat(categorizedActivity.token);
      // if timestamp is undefined, give it the timestamp of the previous entry
      console.log('FEEED: ', feed)
      feed.map((item, i) => {
        const feedItem = item;
        if (!feedItem.timeStamp) {
          const deletedTime = parseInt(feed[i - 1].timeStamp, 10) + 1;
          feedItem.timeStamp = deletedTime.toString();
        }
        return feedItem;
      });

      // order feed chronologically
      feed.sort((a, b) => b.timeStamp - a.timeStamp);
      this.setState({activity, fetching: false, categorizedActivity, feed});
    } catch(e) {
      console.log('ACTIVITY ERROR: ', e);
    }

  };

  openSettings = () => {
    Settings.settingsPopUp();
  };

  render() {
    console.log('STATE: ', this.state);
    return (
      <View style={styles.container}>
        <View style={{
          width: '100%', padding: 20, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'
        }}>
          <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: '#EAEDEF', alignItems: 'center', justifyContent: 'center'}} onPress={this.openSettings}>
            <Image source={require('../../AliceAssets/settings-gear.png')} style={{ resizeMode: 'contain', width: 17, height: 17 }}/>
          </TouchableOpacity>
        </View>
        <Text style={{fontWeight: '600', fontSize: 18, margin: 10}}>Transactions</Text>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.fetching}
            onRefresh={this._refresh}
          />
        }>
          {this.state.feed.length > 0 && this.state.feed.map((item, i) => (
            <View key={i}>
              <View style={{backgroundColor: 'rgba(0,0,0,0.1)', margin: 5, borderRadius: 15, padding: 5, flexDirection: 'row' }}>
                <View style={styles.tokenContainer}>
                  <Text style={{fontWeight: '600'}} >{item.tokenSymbol ? item.tokenSymbol : 'ETH'}</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'space-around'}}>
                  <Text numberOfLines={1}> {item.from.toUpperCase() === this.state.publicAddress.toUpperCase() ? item.to : item.from}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text> {item.from.toUpperCase() === this.state.publicAddress.toUpperCase() ? 'Sent' : 'Received'} {(item.value/10e17).toFixed(4)} {item.tokenName ? item.tokenName : 'Ethereum'}</Text>
                    <Text>{timeSince(item.timeStamp * 1000)}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
          {/*<Activity currentAddress={this.state.publicAddress} isFetchingActivity={this.state.fetching} feedByAddress={this.state.feed}/>*/}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  tokenBox: {
    flexDirection: 'row',
    width: '100%',
    margin: 8
  },
  tokenContainer: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,

  },
});

