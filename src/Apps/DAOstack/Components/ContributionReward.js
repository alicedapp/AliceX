import React, { Component } from 'react';
import { Text, StyleSheet, Image, View } from "react-native";

export default class ContributionReward extends Component {
  constructor() {
    super();
    this.state = {};
  }
  contributionReward(proposal) {
   const contributionReward = proposal.contributionReward
   const reputationReward = () => {
     if(contributionReward.reputationReward) {
       return `${contributionReward.reputationReward / 10e21} %`
     }
   }
   if(contributionReward) {
     if(contributionReward.ethReward != 0) {
       return (
         <View style={{flexDirection: 'row'}}>
           <Image
             source={require('../Assets/ethereum-logo.png')}
             style={{
               height: 25,
               resizeMode: 'contain',
             }}
           />
           <View style={{alignItems: 'center', }}>
             <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
               ETH
             </Text>
             <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
               { contributionReward.ethReward / 10e17 }
             </Text>
           </View>
           <View style={{alignItems: 'center'}}>
             <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
               REP
             </Text>
             <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
               { reputationReward() }
             </Text>
           </View>

         </View>
       )
     }
     else if (contributionReward.externalTokenReward != 0) {
       const externalToken = () => {
         switch (contributionReward.externalToken) {
           case '0x543ff227f64aa17ea132bf9886cab5db55dcaddf':
             return 'GEN';
           case '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359':
             return 'SAI';
           default:
             return 'SAI'
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
         <View>
           <Image
             source={require('../Assets/logo.png')}
             style={{
               height: 25,
               resizeMode: 'contain',
             }}
           />
           <View style={{alignItems: 'center', }}>
             <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
               { externalToken() }
             </Text>
             <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
               {externalTokenReward()}
             </Text>
           </View>
         </View>
       )
     }
     else {
       // this happens when contributionReward.externalTokenReward is 0. Need to fix this.
       return (
         <View style={{alignItems: 'center'}}>
           <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
             REP
           </Text>
           <Text style={{ color: 'grey', fontSize: 10, fontWeight: '700' }}>
             { "< 0.01%" }
           </Text>
         </View>
       )
     }
   }
 }

  render() {
    const { proposal } = this.props;
    return (
      <>
        { this.contributionReward(proposal) }
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
