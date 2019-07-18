import {Component} from "react";
import {StyleSheet, ScrollView, Text, TouchableOpacity, Image, View, Dimensions} from "react-native";
import React from "react";
import ThreeBoxActivity from '3box-activity';
import {addDataType} from "../../AliceUtils";
import { Activity } from "../Components/Activity";
import {Settings} from "../../AliceSDK/Web3";
import {navigate} from "../../AliceUtils/navigationWrapper";

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
      feed: {}
    };

  }
  componentDidMount() {
    this.getTokenInfo()
  }

  getTokenInfo = async () => {
    let activity;
    try {
      activity = await ThreeBoxActivity.get('0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB');
      console.log('ACTIVITY: ', activity)
      const categorizedActivity = await addDataType(activity);
      let feed = categorizedActivity.internal
          .concat(categorizedActivity.txs)
          .concat(categorizedActivity.token);
      // if timestamp is undefined, give it the timestamp of the previous entry
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

      // order feed by address
      let feedByAddress = [];
      feed.forEach((item) => {
        // group feed by 3box or counterparty address activity
        if (feedByAddress.length > 0 &&
          Object.keys(feedByAddress[feedByAddress.length - 1])[0] === othersAddress) {
          feedByAddress[feedByAddress.length - 1][othersAddress].push(item);
        } else if (feedByAddress.length > 0 && Object.keys(feedByAddress[feedByAddress.length - 1])[0] === 'threeBox' && !item.spaceName && (item.dataType === 'Public' || item.dataType === 'Private')) {
          feedByAddress[feedByAddress.length - 1].threeBox.push(item);
        } else if (feedByAddress.length > 0 && Object.keys(feedByAddress[feedByAddress.length - 1])[0] === item.spaceName) {
          feedByAddress[feedByAddress.length - 1][item.spaceName].push(item);
        } else if (item.spaceName) {
          feedByAddress.push({
            [item.spaceName]: [item],
          });
        } else if ((item.dataType === 'Public' || item.dataType === 'Private') && !item.spaceName) {
          feedByAddress.push({
            threeBox: [item],
          });
        } else {
          console.log('meh others address')
        }
      });

      this.setState({activity, fetching: false, categorizedActivity, feed});
    } catch(e) {
      console.log('ACTIVITY ERROR: ', e);
    }

  };

  openSettings = () => {
    Settings.settingsPopUp();
  };

  render() {
    console.log('STATE: ', this.state)
    return (
      <View style={styles.container}>
        <View style={{
          width: '100%', padding: 20, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.2)', alignItems: 'center', justifyContent: 'center'}} onPress={() => navigate('Tokens')}>
            <Image source={require('../../AliceAssets/avatar-black.png')} style={{ resizeMode: 'contain', width: 17, height: 17 }}/>
          </TouchableOpacity>
          <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.2)', alignItems: 'center', justifyContent: 'center'}} onPress={this.openSettings}>
            <Image source={require('../../AliceAssets/settings-gear.png')} style={{ resizeMode: 'contain', width: 17, height: 17 }}/>
          </TouchableOpacity>
        </View>
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
});
