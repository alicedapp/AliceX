import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {NavigationBar} from "../../../Components/NavigationBar";
import sheet from "../styles/sheet";
import Modalize from "../Components/Modalize";
import React, {Component} from "react";

export default class FoamMap extends Component {
render() {
  const { navigation } = this.props;
  return (
    <View style={{flex: 1}}>
      <NavigationBar/>
      <MapboxGL.MapView
        ref={c => (this._map = c)}
        onPress={this.onPress}
        centerCoordinate={this.state.coordinates[0]}
        showUserLocation={true}
        zoomLevel={12}
        userTrackingMode={MapboxGL.UserTrackingModes.Follow}
        styleURL={this.state.styleURL}
        style={sheet.matchParent}
        onDidFinishLoadingMap={this.onDidFinishLoadingMap}
        onRegionWillChange={this.onRegionWillChange}
        onRegionDidChange={this.onRegionDidChange}
        onRegionIsChanging={this.onRegionIsChanging}
      >
        {this.state.finishedRendering === false ? <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}>
          <Image source={require('./Assets/foam-map-logo.png')} style={{
            height: 70,
            resizeMode: 'contain',
          }}/>
          <Image source={require('./Assets/foam-splash-design.png')} style={{
            height: 380,
            width: 380,
            resizeMode: 'contain',
          }}/>
        </View> : <View style={{ flex: 1 }}>
          <View style={{
            margin: 20,
            marginTop: 50,
            marginBottom: 0,
            backgroundColor: 'transparent',
          }}>
            <View style={{marginTop: 20, width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
              <TextInput placeholder={'Search'} placeholderTextColor='#636363' style={styles.whiteSearch}/>
              <Image source={require('./Assets/account-icon.png')} style={{ flex: 1, width: 40,height: 40, resizeMode: 'contain'}}/>
            </View>
            <TouchableOpacity onPress={console.log} style={{width: 400, height: 100, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center'}}>
              <Text>Press me</Text>
            </TouchableOpacity>
          </View>
        </View>}
        {/*{this.renderPOIs()}*/}
        {/*{this.renderSignals()}*/}
        {/*{this.renderRegionChange()}*/}
        {/*{this.renderSelectedPoint()}*/}
        <Modalize ref={this.modalRef} handlePosition="outside" height={140}>
          <View style={styles.innerModalBox}>
            <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 7}}>{this.state.selectedPOITitle}</Text>
            <View style={styles.tokenAmount}>
              <Text style={{ color: this.state.selectedPOIColor }}>{parseInt(this.state.selectedPOIStake).toFixed(2)}</Text>
              <View>
                <Text style={{
                  color: this.state.selectedPOIColor,
                  fontSize: 10,
                  fontStyle: 'italic',
                  paddingLeft: 2,
                  paddingRight: 3
                }}>FOAM</Text>
              </View>
              <Text style={{ color: this.state.selectedPOIColor }}>staked</Text>
            </View>

            <TouchableOpacity style={[styles.descriptionButton, { backgroundColor: this.state.selectedPOIColor }]}>
              <Text style={{color: 'white'}}>Challenged Point of Interest</Text>
              <Image source={require('./Assets/caret.png')} style={{resizeMode: 'contain', width: 15}}/>
            </TouchableOpacity>
            <Text>{JSON.stringify(this.state.poiDescription)}</Text>
          </View>
        </Modalize>
      </MapboxGL.MapView>
    </View>
  );
}
}
