import React, {useState, useEffect} from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import DropDownItem from "../../Components/Widget/index";
import Widget from "../../Components/Widget";

const DOWN_ARROW = require('../Assets/down-white.png');
const UP_ARROW = require('../Assets/up-white.png');
// const SynthetixJS  = require('synthetix');
// const snxjs = new Synthetix.SynthetixJs;
// const snxjs = new SynthetixJs(); //uses default ContractSettings - ethers.js default provider, mainnet
// const { formatBytes32String } = SynthetixJs.SynthetixJs.utils;

// const { synths } = snxjs.contractSettings;

const Uniswap = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // fetchData();
  },[]);

  const fetchData = async () => {
    const blockOptions = {};
    const account = "0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB";
    // const results = await Promise.all([snxjs.SynthetixState.issuanceRatio(), snxjs.Depot.contract.usdToSnxPrice(blockOptions), snxjs.Synthetix.contract.transferableSynthetix(account, blockOptions), snxjs.Synthetix.contract.collateral(account, blockOptions), snxjs.Synthetix.contract.collateralisationRatio(account, blockOptions), snxjs.sUSD.contract.balanceOf(account, blockOptions), snxjs.Synthetix.contract.debtBalanceOf(account, formatBytes32String('sUSD'), blockOptions), snxjs.FeePool.contract.feesAvailable(account, formatBytes32String('sUSD'), blockOptions)]);
    // const [ issuanceRatio, usdToSnxPrice, unlockedSnx, collateral, collateralRatio,sUSDBalance, debtBalance, [currentFeesAvailable, currentRewardsAvailable] ] = results.map(input => Array.isArray(input) ? input.map(snxjs.utils.formatEther) : snxjs.utils.formatEther(input));

    // const currentCRatio = (1/collateralRatio)*100;
    // setData({issuanceRatio, currentCRatio, usdToSnxPrice, unlockedSnx, collateral, collateralRatio, sUSDBalance, debtBalance, currentFeesAvailable, currentRewardsAvailable});
  };

  console.log('SYNTHETIX DATA: ', data);
  // const {issuanceRatio, currentCRatio, usdToSnxPrice, unlockedSnx, collateral, collateralRatio, sUSDBalance, debtBalance, currentFeesAvailable, currentRewardsAvailable} = data;
  return (
    <View>
      <Widget
        contentVisible={false}
        backgroundColor='#D240DD'
        image={require('./uniswap-logo.png')}
      >
        <ScrollView style={{height: 100, backgroundColor: '#333639', borderRadius: 20 }}>
          {data.map((token, i) => {
            return (
              <View>
                <Text key={i}>{JSON.stringify(token)}</Text>
              </View>
            )
          })}
        </ScrollView>
      </Widget>
    </View>

  )
};

export default Uniswap;

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
  header: {
    height: 35,
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 100,
    flexDirection: 'row',
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
