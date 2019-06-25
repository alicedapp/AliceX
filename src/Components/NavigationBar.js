import {Image, TouchableOpacity, View} from "react-native";
import React from "react";
import {navigate, backAction} from "../utils/navigationWrapper";

export const NavigationBar = () => (
  <View style={{ flexDirection: 'row', position: 'absolute', top: 30, right: 12, zIndex: 1000 }}>
    <TouchableOpacity style={{ padding: 3 }} onPress={() => backAction(null)}>
      <Image source={require('../AliceAssets/back.png')} style={{
        resizeMode: 'contain',
        width: 28,
        height: 28,
      }}/>
    </TouchableOpacity>
    <TouchableOpacity style={{ padding: 3 }} onPress={() => navigate('Apps')}>
      <Image source={require('../AliceAssets/home.png')} style={{
        resizeMode: 'contain',
        width: 28,
        height: 28,
      }}/>
    </TouchableOpacity>
    <TouchableOpacity style={{ padding: 3 }} onPress={() => backAction(null)}>
      <Image source={require('../AliceAssets/pin.png')} style={{
        resizeMode: 'contain',
        width: 28,
        height: 28,
      }}/>
    </TouchableOpacity>
  </View>
);
