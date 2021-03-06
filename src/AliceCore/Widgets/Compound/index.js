import React, {useState, useEffect} from 'react';
import {Image, View, Text, ScrollView, StyleSheet} from 'react-native';
import Widget from "../../Components/Widget";
import {Wallet} from "../../../AliceSDK/Web3";

const Compound = () => {
  const [data, setData] = useState({});
  const [account, setAccount] = useState({});
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let compoundData = await fetch("https://api.compound.finance/api/v2/account?address="+Wallet.getAddress());
    const rawData = await compoundData.json();
    const {accounts} = rawData;
    const address = accounts[0];
    const {tokens} = address;
    setTokens(tokens);
    console.log('COMPOUND DATA: ', address);
    console.log('COMPOUND TOKENS: ', tokens);
    setData({data});
  };

  return (
    <View>
      <Widget
        contentVisible={false}
        backgroundColor='#070a0e'
        image={require('./compound-logo.png')}
      >
        <ScrollView style={{height: 100, backgroundColor: '#070a0e', borderRadius: 20 }}>
          {tokens.map((token, i) => {
            return (
              <View key={i}>
                <Text>{JSON.stringify(token)}</Text>
              </View>
            )
          })}
        </ScrollView>
      </Widget>
    </View>
  )
}

export default Compound;

const styles = StyleSheet.create({
  widgetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 60,
  },
  dropDownItem: {
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  headerTxt: {
    fontSize: 12,
    color: 'rgb(74,74,74)',
    marginRight: 60,
    flexWrap: 'wrap',
  },
  txt: {
    fontSize: 14,
  },
});
