import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

import { navigate, goBack } from "../AliceUtils/navigationWrapper";

export const NavigationBar = () => (
  <View style={{ flexDirection: 'row', position: 'absolute', top: 30, right: 12, zIndex: 1000 }}>
    <TouchableOpacity style={{ padding: 3 }} onPress={() => goBack()}>
      <Image source={require('../AliceAssets/back.png')} style={{
        resizeMode: 'contain',
        width: 35,
        height: 35,
      }}/>
    </TouchableOpacity>
    <TouchableOpacity style={{ padding: 3 }} onPress={() => navigate('Apps')}>
      <Image source={require('../AliceAssets/home.png')} style={{
        resizeMode: 'contain',
        width: 35,
        height: 35,
      }}/>
    </TouchableOpacity>
    <TouchableOpacity style={{ padding: 3 }}>
      <Image source={require('../AliceAssets/pin.png')} style={{
        resizeMode: 'contain',
        width: 35,
        height: 35,
      }}/>
    </TouchableOpacity>
  </View>
);
