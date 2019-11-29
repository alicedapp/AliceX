import React, { Component } from 'react';
import { Text, StyleSheet, Image, View } from "react-native";

export default class ContributionReward extends Component {
  constructor() {
    super();
    this.state = {
      ethReward: null,
      rep: null,
      genReward: null,
      saiReward: null,
    };
  }
  componentDidMount() {
    this.contributionReward()
  };

  contributionReward() {
   const {contributionReward} = this.props.proposal;
   console.log('CONTRIBUTION REWARD: ', contributionReward);
    if (contributionReward) {
      if (contributionReward.reputationReward && contributionReward.reputationReward !== 0) {
        this.setState({rep: `${Math.round(contributionReward.reputationReward / 10e20 * 100) / 100}%`});
      }
      if (contributionReward.ethReward !== 0) {
        this.setState({ethReward: contributionReward.ethReward / 10e17});
      }
      if (contributionReward.externalTokenReward !== 0) {
        let externalTokenReward = Math.ceil(contributionReward.externalTokenReward / 10e17);
        let tokenReward = externalTokenReward >= 1000 ? externalTokenReward/1000 + 'k' : externalTokenReward;
        switch (contributionReward.externalToken) {
          case '0x543ff227f64aa17ea132bf9886cab5db55dcaddf':
            this.setState({genReward: tokenReward})
            break;
          case '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359':
            this.setState({saiReward: tokenReward})
            break;
          default:
            this.setState({saiReward: tokenReward})
            break;
        }
      }
     }

   }


  render() {
    const {ethReward, rep, genReward, saiReward} = this.state;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' , margin: 15}}>
        {!!ethReward && <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../Assets/ethereum-logo.png')}
            style={{
              height: 40,
              width: 40,
              resizeMode: 'contain',
            }}/>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontWeight: '600'}}>ETH</Text>
            <Text style={{fontWeight: '600', fontSize: 27}}>{ethReward}</Text>
          </View>
        </View>}
        {!!rep && <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontWeight: '600'}}>REP</Text>
            <Text style={{fontWeight: '600', fontSize: 27}}>{rep}</Text>
          </View>
        </View>}
        {!!genReward && <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../Assets/gen-logo.png')}
            style={{
              height: 40,
              width: 40,
              resizeMode: 'contain',
            }}/>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontWeight: '600'}}>GEN</Text>
            <Text style={{fontWeight: '600', fontSize: 27}}>{genReward}</Text>
          </View>
        </View>}
        {!!saiReward && <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../Assets/dai-logo.png')}
            style={{
              height: 40,
              width: 40,
              resizeMode: 'contain',
            }}/>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontWeight: '600'}}>SAI</Text>
            <Text style={{fontWeight: '600', fontSize: 27}}>{saiReward}</Text>
          </View>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
