import {Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {NavigationBar} from "../../../Components/NavigationBar";
import sheet from "../styles/sheet";
import Modalize from "../Components/Modalize";
import React, {Component} from "react";
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import { decodeGeoHash, onSortOptions } from '../utils';

const { height, width } = Dimensions.get('window');


export default class FoamMap extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;

    return {
      tabBarVisible: false,
    };
  };

  constructor(props) {
    super(props);

    this._mapOptions = Object.keys(MapboxGL.StyleURL)
      .map(key => ({
        label: key,
        data: MapboxGL.StyleURL[key],
      }))
      .sort(onSortOptions);

    this.state = {
      styleURL: this._mapOptions[0].data,
      reason: '',
      selected: false,
      regionFeature: undefined,
      swLng: '',
      swLat: '',
      neLng: '',
      neLat: '',
      activeAnnotationIndex: -1,
      previousActiveAnnotationIndex: -1,
      finishedRendering: true,
      backgroundColor: 'blue',
      coordinates: [],
      pois: null,
      signals: null,
      selectedPoint: null,
      showPOIModal: false,
      selectedPOITitle: 'Huntington Garden',
      selectedPOIStake: '500',
      selectedPOIColor: '#2E7CE6',
      modalHeight: 350,
    };
  }

  componentDidMount() {
    const getCoords = (pos) => {
      const {latitude, longitude} = pos.coords;
      this.setState({coordinates: [[parseFloat(longitude.toPrecision(6)), parseFloat(latitude.toPrecision(6))]]})
    }
    navigator.geolocation.getCurrentPosition(getCoords, console.error, {enableHighAccuracy: false, timeout: 50000});

  }
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
            <Image source={require('../Assets/foam-map-logo.png')} style={{
              height: 70,
              resizeMode: 'contain',
            }}/>
            <Image source={require('../Assets/foam-splash-design.png')} style={{
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
                <Image source={require('../Assets/account-icon.png')} style={{ flex: 1, width: 40,height: 40, resizeMode: 'contain'}}/>
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
                <Image source={require('../Assets/caret.png')} style={{resizeMode: 'contain', width: 15}}/>
              </TouchableOpacity>
              <Text>{JSON.stringify(this.state.poiDescription)}</Text>
            </View>
          </Modalize>
        </MapboxGL.MapView>
      </View>
    );
  }
}

const ANNOTATION_SIZE = 10;

const styles = StyleSheet.create({
  annotationContainer: {
    width: ANNOTATION_SIZE,
    height: ANNOTATION_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ANNOTATION_SIZE / 2,
  },
  annotationFill: {
    width: ANNOTATION_SIZE - 3,
    height: ANNOTATION_SIZE - 3,
    borderRadius: (ANNOTATION_SIZE - 3) / 2,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
  tokenAmount: {
    flexDirection: 'row',
    marginBottom: 15
  },
  descriptionButton: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    borderRadius: 50/2,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
  whiteSearch: {
    flex: 3,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#636363',
    backgroundColor: 'white',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },
  modal: {
    margin: 0,
  },
  modalBox: {
    width,
    backgroundColor: 'white',
    borderRadius: 25,
    position: 'absolute',
    bottom: 0
  },
  innerModalBox: {
    margin: 20
  },
  whiteBox: {
    margin: 25,
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#636363',
    backgroundColor: 'white',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },
});
