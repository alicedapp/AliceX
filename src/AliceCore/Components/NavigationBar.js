import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

import { navigate, goBack } from "../Utils/navigationWrapper";

export const NavigationBar = () => (
  <View style={{ flexDirection: 'row', position: 'absolute', top: 30, right: 12, zIndex: 9999 }}>
    <TouchableOpacity style={{ padding: 3 }} onPress={() => goBack()}>
      <Image source={require('../Assets/back.png')} style={{
        resizeMode: 'contain',
        width: 35,
        height: 35,
      }}/>
    </TouchableOpacity>
    <TouchableOpacity style={{ padding: 3 }} onPress={() => navigate('DappsScreen')}>
      <Image source={require('../Assets/home.png')} style={{
        resizeMode: 'contain',
        width: 35,
        height: 35,
      }}/>
    </TouchableOpacity>
    <TouchableOpacity style={{ padding: 3 }}>
      <Image source={require('../Assets/pin.png')} style={{
        resizeMode: 'contain',
        width: 35,
        height: 35,
      }}/>
    </TouchableOpacity>
  </View>
);
