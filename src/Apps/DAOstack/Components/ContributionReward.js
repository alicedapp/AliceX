import React, { Component } from 'react';
import { Text, StyleSheet, Image } from 'react-native';

export default class ContributionReward extends Component {
  constructor() {
    super();
    this.state = {};
  }
  contributionReward(proposal) {
   const contributionReward = proposal.contributionReward
   const reputationReward = () => {
     if(contributionReward.reputationReward) {
       return `${contributionReward.reputationReward / 10e21} % Rep.`
     }
   }
   if(contributionReward) {
     if(contributionReward.ethReward != 0) {
       return (
         <Text numberOfLines={1} style={{}}>
           { contributionReward.ethReward / 10e17 } ETH + { reputationReward() }
         </Text>
       )
     }
     else if (contributionReward.externalTokenReward != 0) {
       const externalToken = () => {
         switch (contributionReward.externalToken) {
           case '0x543ff227f64aa17ea132bf9886cab5db55dcaddf':
             return 'GEN'
           break;
           case '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359':
             return 'DAI'
           break;
           default:
             return 'DAI'
         }
       }
       const externalTokenReward = () => {
         const tokenReward = Math.ceil(contributionReward.externalTokenReward / 10e17)
         if(tokenReward >= 1000) {
           // console.log('if(tokenReward >= 1000)');
           return tokenReward/1000 + 'k'
         }
         else {
           // console.log('else return tokenReward');
           return tokenReward
         }
       }
       return (
         <Text numberOfLines={1} style={{}}>
           { externalTokenReward() } { externalToken() } + { reputationReward() }
         </Text>
       )
     }
     else {
       // this happens when contributionReward.externalTokenReward is 0. Need to fix this.
       return (
         <Text numberOfLines={1} style={{}}>
           Less than 1% Rep
         </Text>
       )
     }
   }
 }

  contributionBeneficiary(proposal) {
    const contributionReward = proposal.contributionReward
    if(contributionReward) {
      return (
        <Text numberOfLines={1} style={{}}>
          { contributionReward && contributionReward.beneficiary.slice(0, 15) }...
        </Text>
      )
    }
  }

  contributionToIcon(proposal) {
   const contributionReward = proposal.contributionReward
   if(contributionReward){
     return (
       <Image
         source={require('../Assets/transfer-icon.png')}
         style={{ height: 10, resizeMode: 'contain', }}
       />
     )
   } else {
     return <Text>No contribution reward</Text>
   }
 }

  render() {
    const { proposal } = this.props;
    return (
      <>
        { this.contributionReward(proposal) }
        { this.contributionToIcon(proposal) }
        { this.contributionBeneficiary(proposal) }
      </>
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
