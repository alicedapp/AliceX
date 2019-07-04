import {Component} from "react";
import {StyleSheet, ScrollView, Text, TouchableOpacity, Image, View, Dimensions} from "react-native";
import React from "react";
import ThreeBoxActivity from '3box-activity';
import {addDataType} from "../../utils";
import { Activity } from "../Components/Activity";
import {Settings} from "../../SDK/Web3";

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
    // let activity;
    // try {
    //   activity = await ThreeBoxActivity.get('0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB');
    //   const categorizedActivity = await addDataType(activity);
    //   let feed = categorizedActivity.internal
    //       .concat(categorizedActivity.txs)
    //       .concat(categorizedActivity.token);
    //   // if timestamp is undefined, give it the timestamp of the previous entry
    //   feed.map((item, i) => {
    //     const feedItem = item;
    //     if (!feedItem.timeStamp) {
    //       const deletedTime = parseInt(feed[i - 1].timeStamp, 10) + 1;
    //       feedItem.timeStamp = deletedTime.toString();
    //     }
    //     return feedItem;
    //   });
    //
    //   // order feed chronologically
    //   feed.sort((a, b) => b.timeStamp - a.timeStamp);
    //
    //   // order feed by address
    //   let feedByAddress = [];
    //   feed.forEach((item) => {
    //     // group feed by 3box or counterparty address activity
    //     if (feedByAddress.length > 0 &&
    //       Object.keys(feedByAddress[feedByAddress.length - 1])[0] === othersAddress) {
    //       feedByAddress[feedByAddress.length - 1][othersAddress].push(item);
    //     } else if (feedByAddress.length > 0 && Object.keys(feedByAddress[feedByAddress.length - 1])[0] === 'threeBox' && !item.spaceName && (item.dataType === 'Public' || item.dataType === 'Private')) {
    //       feedByAddress[feedByAddress.length - 1].threeBox.push(item);
    //     } else if (feedByAddress.length > 0 && Object.keys(feedByAddress[feedByAddress.length - 1])[0] === item.spaceName) {
    //       feedByAddress[feedByAddress.length - 1][item.spaceName].push(item);
    //     } else if (item.spaceName) {
    //       feedByAddress.push({
    //         [item.spaceName]: [item],
    //       });
    //     } else if ((item.dataType === 'Public' || item.dataType === 'Private') && !item.spaceName) {
    //       feedByAddress.push({
    //         threeBox: [item],
    //       });
    //     } else {
    //       console.log('meh others address')
    //     }
    //   });
    //
    //   this.setState({activity, fetching: false, categorizedActivity, feed});
    // } catch(e) {
    //   console.log('ACTIVITY ERROR: ', e);
    // }

  };

  openSettings = () => {
    Settings.settingsPopUp();
  };

  render() {
    console.log('token: ', this.state.to);

    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1, width, padding: 20}}>
          <TouchableOpacity onPress={this.openSettings} style={{backgroundColor: 'black', width: 40, height: 40}}>

          </TouchableOpacity>
          <Text>Hello</Text>
          <Activity isFetchingActivity={this.state.fetching} feedByAddress={this.state.feed} otherProfileActivity={[]}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100
  },
  tokenBox: {
    flexDirection: 'row',
    width: '100%',
    margin: 8
  },
  tokenContainer: {
    backgroundColor: '#c9c9c9',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  tokenImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  }
});
