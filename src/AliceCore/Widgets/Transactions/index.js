import React, {useState, useEffect} from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { timeSince } from "../../Utils/time";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { Settings, Wallet } from "../../../AliceSDK/Web3/index";
import ThreeBoxActivity from "3box-activity";
import { addDataType } from "../../Utils/index";
const {width, height} = Dimensions.get('window');

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const Transactions = () => {
  const [hasError, setErrors] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publicAddress, setPublicAddress] = useState('');

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    let activity;
    setPublicAddress(await Wallet.getAddress());
    try {
      activity = await ThreeBoxActivity.get(await Wallet.getAddress());
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
      console.log('FEED: ', feed)
      setTransactions(feed);
      setLoading(false);
    } catch(e) {
      console.log('fetch transactions error: ', e);
    }
  };

  const _refresh = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    fetchData();
  }

  return (
    <ScrollView
      style={{borderRadius: 20, width: width / 3 * 2 - 20, height: width / 2 - 20, backgroundColor: '#EAEDEF', marginBottom: 10}}
      refreshControl={
      <RefreshControl
        refreshing={loading}
        onRefresh={_refresh}
      />
    }>
      {transactions.length > 0 ? transactions.map((item, i) => (
          <View key={i} style={{margin: 5, borderRadius: 15, padding: 5, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }}>
            <View style={{flex: 1, justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {item.from.toUpperCase() === publicAddress.toUpperCase() ? <Image source={require('../../Assets/sent-icon.png')} style={{ resizeMode: 'contain', width: 10, height: 10, marginRight: 5 }}/> : <Image source={require('../../Assets/received-icon.png')} style={{ resizeMode: 'contain', width: 10, height: 10, marginRight: 5 }}/>}
                  <Text style={{fontSize: 14, fontWeight: '500'}}>{item.tokenName ? item.tokenName : 'Ethereum'}</Text>
                </View>
                <Text style={{color: item.from.toUpperCase() === publicAddress.toUpperCase() ? 'black' : '#29c954'}}>{parseFloat(item.value/10e17).toFixed(4)} </Text>
              </View>
            </View>
          </View>
      )) : <View style={{margin: 5, borderRadius: 15, padding: 5, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }}>
        <View style={styles.tokenContainer}>
          <Text style={{fontWeight: '600'}} >{''}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{height: 14, width: '100%', backgroundColor: '#cecece', borderRadius: 7}}></View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{backgroundColor: '#d6d6d6', width: '100%', height: 10, borderRadius: 5}}></View>
          </View>
        </View>
      </View>
      }
    </ScrollView>
  )
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    padding: 10
  },
  tokenBox: {
    flexDirection: 'row',
    width: '100%',
    margin: 8
  },
  tokenContainer: {
    backgroundColor: '#EAEDEF',
    height: 50,
    width: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    // shadowColor: '#212121',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowRadius: 10,
    // shadowOpacity: 0.1,
    //
  },
});

