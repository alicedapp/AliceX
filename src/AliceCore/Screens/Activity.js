import {Component} from "react";
import {StyleSheet, ScrollView, Text, Image, View, Dimensions} from "react-native";
import React from "react";
import ThreeBoxActivity from '3box-activity';

const { height, width } = Dimensions.get('window');

//TODO: needs api key

export default class Activity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenInfo: '',
      tokens: [],
      ethereum: {},
      activity: {}
    };

  }
  componentDidMount() {
    this.getTokenInfo()
  }

  getTokenInfo = async () => {
    try {
      let activity = await ThreeBoxActivity.get('0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB');
      console.log('ACTIVITY: ', activity);
      this.setState({activity});
    } catch(e) {
      console.log('ACTIVITY ERROR: ', e);
    }


  };

  render() {
    console.log('token: ', this.state.to);

    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1, width, padding: 20}}>
          <Text>{JSON.stringify(this.state.activity)}</Text>
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
