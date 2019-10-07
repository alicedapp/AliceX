// import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
// import React from "react";
//
// if (i === 5) {
//   return (
//     <TouchableOpacity
//       key={i}
//       onPress={() =>
//         this.props.navigation.navigate('DAOstackHome', {
//           dao,
//           backgroundColor,
//         })
//       }
//       style={{ ...styles.cheezeDaoBox, ...styles.sharpShadow }}
//     >
//       <ImageBackground
//         source={require('../Assets/cheeze-background.png')}
//         style={{
//           width: '100%',
//           resizeMode: 'contain',
//           paddingTop: 50,
//           paddingBottom: 50,
//           backgroundColor: 'yellow',
//         }}
//       >
//         <Text
//           style={{
//             color: 'black',
//             fontSize: 30,
//             fontWeight: '700',
//             fontFamily: 'Exocet',
//             marginHorizontal: 20,
//           }}
//         >
//           CHeeze DAO
//         </Text>
//       </ImageBackground>
//       <Image
//         style={{
//           width: width - 50,
//           resizeMode: 'contain',
//           margin: -15,
//           marginHorizontal: 15,
//         }}
//         source={require('../Assets/divider.png')}
//       />
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-around',
//         }}
//       >
//         <View
//           style={{
//             alignItems: 'center',
//             justifyContent: 'space-around',
//             margin: 17,
//           }}
//         >
//           <Text
//             style={{
//               color: 'grey',
//               fontSize: 10,
//               marginBottom: 15,
//               fontWeight: '700',
//               fontFamily: 'Menlo-Regular',
//             }}
//           >
//             Reputation Holders
//           </Text>
//           <Text
//             style={{ fontSize: 30, fontWeight: '700', fontFamily: 'Exocet' }}
//           >
//             {dao.reputationHoldersCount}
//           </Text>
//         </View>
//         <View style={{ height: 50, width: 1, backgroundColor: '#c9c9c9' }} />
//         <View
//           style={{
//             alignItems: 'center',
//             justifyContent: 'space-around',
//             margin: 17,
//           }}
//         >
//           <Text
//             style={{
//               color: 'grey',
//               fontSize: 10,
//               marginBottom: 15,
//               fontWeight: '700',
//               fontFamily: 'Menlo-Regular',
//             }}
//           >
//             Open Proposals
//           </Text>
//           <Text
//             style={{ fontSize: 30, fontWeight: '700', fontFamily: 'Exocet' }}
//           >
//             {
//               dao.proposals.filter(
//                 proposal =>
//                   proposal.stage !== 'Executed' &&
//                   proposal.stage !== 'ExpiredInQueue'
//               ).length
//             }
//           </Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// }
