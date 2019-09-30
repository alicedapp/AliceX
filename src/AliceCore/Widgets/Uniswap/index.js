import React, {useState, useEffect} from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import DropDownItem from "../../Components/DropDown/index";

const DOWN_ARROW = require('../Assets/down-white.png');
const UP_ARROW = require('../Assets/up-white.png');
// const SynthetixJS  = require('synthetix');
// const snxjs = new Synthetix.SynthetixJs;
// const snxjs = new SynthetixJs(); //uses default ContractSettings - ethers.js default provider, mainnet
// const { formatBytes32String } = SynthetixJs.SynthetixJs.utils;

// const { synths } = snxjs.contractSettings;

const Synthetix = () => {
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
      <DropDownItem
        style={styles.dropDownItem}
        contentVisible={false}
        invisibleImage={DOWN_ARROW}
        visibleImage={UP_ARROW}
        header={
          <View style={{...styles.header, backgroundColor: '#0a0817'}}>
            <Image source={require('../Synthetix/synthetix-logo.png')} style={{resizeMode: 'contain', height: 15, width: 150}}/>
          </View>
        }
      >
        <ScrollView style={{height: 100, backgroundColor: '#070a0e', borderRadius: 20 }}>
          {data.map((token, i) => {
            return (
              <View>
                <Text key={i}>{JSON.stringify(token)}</Text>
              </View>
            )
          })}
        </ScrollView>
      </DropDownItem>
      {/*<Text>SNX Price {Number(usdToSnxPrice).toFixed(5)} USD</Text>*/}
      {/*<Text>Total Collateral${Number(collateral * usdToSnxPrice).toFixed(2)} USD (${Number(collateral).toFixed(2)} SNX)</Text>*/}
      {/*<Text>Unlocked SNX${Number(unlockedSnx * usdToSnxPrice).toFixed(2)} USD (${Number(unlockedSnx).toFixed(2)} SNX) ${Math.round(unlockedSnx/collateral * 100)}</Text>*/}
      {/*<Text>Ratio${Number(collateralRatio).toFixed(5)}</Text>*/}
      {/*<Text>Current sUSD Balance${Number(sUSDBalance).toFixed(2)} sUSD</Text>*/}
      {/*<Text>Total Debt Owed${Number(debtBalance).toFixed(2)} sUSD</Text>*/}
      {/*<Text>Current Collateralization Ratio${Math.round(currentCRatio)}%</Text>*/}
      {/*<Text>Fees Available${numbro(currentFeesAvailable).format('0,0.00')}</Text>*/}
      {/*<Text>Rewards Available${numbro(currentRewardsAvailable).format('0,0.00')}</Text>*/}
    </View>

  )
};

export default Synthetix;

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
