import React from 'react';
import {
  Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions, View,
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import App from './App';


import sheet from './styles/sheet';
import { decodeGeoHash, onSortOptions, SF_OFFICE_COORDINATE } from './utils';

import BaseExamplePropTypes from './components/common/BaseExamplePropTypes';

const { height, width } = Dimensions.get('window');

const isValidCoordinate = geometry => {
  if (!geometry) {
    return false;
  }
  return geometry.coordinates[0] !== 0 && geometry.coordinates[1] !== 0;
};


const ANNOTATION_SIZE = 10;


class HomeScreen extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

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


    this._scaleIn = null;
    this._scaleOut = null;

    this.onPress = this.onPress.bind(this);
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
      finishedRendering: false,
      backgroundColor: 'blue',
      coordinates: [[-73.99155, 40.73581]],
      pois: null,

    };

    this._tabOptions = [
      { label: 'Fly To', data: SF_OFFICE_COORDINATE },
      {
        label: 'Fit Bounds',
        data: [[-74.12641, 40.797968], [-74.143727, 40.772177]],
      },
      { label: 'Zoom To', data: 12 },
    ];

    this.onMapChange = this.onMapChange.bind(this);
  }

  onPress(feature) {
    const coords = Object.assign([], this.state.coordinates);
    coords.push(feature.geometry.coordinates);
    this.setState({ coordinates: coords });
  }

  onDidFinishLoadingMap = () => {
    setTimeout(() => this.setState({ finishedRendering: true }), 1500);
  }

  onAnnotationSelected(activeIndex, feature) {
    if (this.state.activeIndex === activeIndex) {
      return;
    }

    this._scaleIn = new Animated.Value(0.6);
    Animated.timing(this._scaleIn, { toValue: 1.0, duration: 200 }).start();
    this.setState({ activeAnnotationIndex: activeIndex, selected: true });

    if (this.state.previousActiveAnnotationIndex !== -1) {
      this._map.moveTo(feature.geometry.coordinates, 500);
    }
  }

  onAnnotationDeselected(deselectedIndex) {
    const nextState = {};

    if (this.state.activeAnnotationIndex === deselectedIndex) {
      nextState.activeAnnotationIndex = -1;
    }

    this._scaleOut = new Animated.Value(1);
    Animated.timing(this._scaleOut, { toValue: 0.6, duration: 200 }).start();
    nextState.previousActiveAnnotationIndex = deselectedIndex;
    this.setState(nextState);
  }

  getPOIs = async () => {
    const {
      swLng, swLat, neLat, neLng,
    } = this.state;
    if (swLng) {
      fetch(`https://map-api-direct.foam.space/signal/map?swLng=${swLng}&swLat=${swLat}&neLng=${neLng}&neLat=${neLat}`)
        .then((response) => response.text())
        .then((pois) => {
          console.log('POIS: ', pois);
          this.setState({ pois: JSON.parse(pois) });
        })
        .catch((err) => {});
    }
  }

  onRegionWillChange = (regionFeature) => {
    this.setState({ reason: 'will change', regionFeature });
  }

  onRegionDidChange = (regionFeature) => {
    this.setState({ reason: 'did change', regionFeature });
    this.getPOIs();
  }

  onRegionIsChanging = (regionFeature) => {
    this.setState({ reason: 'is changing', regionFeature }, this.setBounds);
  }

  onMapChange = (index, styleURL) => {
    this.setState({ styleURL });
  }

  setBounds = () => {
    const { geometry, properties } = this.state.regionFeature;
    const [neLng, neLat] = properties.visibleBounds[0];
    const [swLng, swLat] = properties.visibleBounds[1];
    this.setState({
      neLat: neLat.toPrecision(6), neLng: neLng.toPrecision(6), swLat: swLat.toPrecision(6), swLng: swLng.toPrecision(6),
    });
  };

  renderAnnotations() {
    const items = [];
    if (this.state.pois !== null && this.state.pois !== undefined) {
      console.log('got here pois: ', this.state.pois);
      for (let i = 0; i < this.state.pois.length; i++) {
        console.log('POI: ', this.state.pois[i]);
        const { geohash } = this.state.pois[i];
        console.log('geohash: ', geohash);
        const [latitude] = decodeGeoHash(geohash).latitude;
        const [longitude] = decodeGeoHash(geohash).longitude;
        const coordinate = [parseFloat(longitude.toPrecision(6)), parseFloat(latitude.toPrecision(6))];
        const title = `Longitude: ${longitude} Latitude: ${latitude}`;
        const id = `pointAnnotation${i}`;
        console.log('COORDINATE: ', coordinate);
        console.log('TITLE: ', title);
        console.log('ID: ', id);

        const animationStyle = {};
        if (i === this.state.activeAnnotationIndex) {
          animationStyle.transform = [{ scale: this._scaleIn }];
        } else if (i === this.state.previousActiveAnnotationIndex) {
          animationStyle.transform = [{ scale: this._scaleOut }];
        }
        let backgroundColor;
        if (i % 2) {
          backgroundColor = '#1279ff'
        } else {
          backgroundColor = '#71d729'
        }

        items.push(
          <MapboxGL.PointAnnotation
            key={id}
            id={id}
            title="Test"
            selected={this.state.selected && i === 0}
            onSelected={feature => this.onAnnotationSelected(i, feature)}
            onDeselected={() => this.onAnnotationDeselected(i)}
            coordinate={coordinate}
          >
            <View style={[{backgroundColor}, styles.annotationContainer]}/>
            <MapboxGL.Callout contentStyle={{borderRadius: 10, backgroundColor}} tipStyle={MapBoxStyles.tip} textStyle={{color: 'white'}} title={title} />
          </MapboxGL.PointAnnotation>,
        );
      }
    }

    return items;
  }

  render() {
    const { navigation } = this.props;
    return (
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
          <Image source={require('./assets/foam-map-logo.png')} style={{
            height: 70,
            resizeMode: 'contain',
          }}/>
          <Image source={require('./assets/foam-splash-design.png')} style={{
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
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity style={{ padding: 3 }} onPress={() => navigation.goBack(null)}>
                <Image source={require('../../Assets/back.png')} style={{
                  resizeMode: 'contain',
                  width: 28,
                  height: 28,
                }}/>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 3 }} onPress={() => navigation.navigate('Apps')}>
                <Image source={require('../../Assets/home.png')} style={{
                  resizeMode: 'contain',
                  width: 28,
                  height: 28,
                }}/>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 3 }} onPress={() => navigation.goBack(null)}>
                <Image source={require('../../Assets/pin.png')} style={{
                  resizeMode: 'contain',
                  width: 28,
                  height: 28,
                }}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
            <View style={styles.blackHeaderModule}>
              <Text style={{ color: 'white' }}>Main Ethereum Network</Text>
            </View>
            <TouchableOpacity style={{ padding: 3 }} onPress={() => navigation.navigate('Maps')}>
              <View style={styles.blackHeaderModule}>
                <Text style={{ color: 'white' }}>100.00</Text>
                <View>
                  <Text style={{
                    color: 'white',
                    fontSize: 10,
                  }}>FOAM</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <TextInput placeholder={'Search'} placeholderTextColor='#636363' style={styles.whiteSearch}/>
        </View>}
        {this.renderAnnotations()}
      </MapboxGL.MapView>
    );
  }
}


class SettingsScreen extends React.Component {
  render() {
    return (
      <App/>
    );
  }
}

export default createBottomTabNavigator({
  FoamHome: HomeScreen,
  Maps: SettingsScreen,
});

const MapBoxStyles = MapboxGL.StyleSheet.create({
  tip: {
    backgroundColor: 'black',
  }
});

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
  blackHeaderModule: {
    flexDirection: 'row',
    padding: 10,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#636363',
    backgroundColor: '#212121',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },
  whiteSearch: {
    margin: 25,
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

{ /* <View style={styles.whiteBox}> */ }
{ /* <View style={{}}> */ }
{ /* <Text style={{ */ }
{ /* fontSize: 20, */ }
{ /* color: 'black', */ }
{ /* }}>Add a POI or Signal for Location Services</Text> */ }
{ /* <Text style={{ fontSize: 14 }}>Click anywhere on the map to start.</Text> */ }
{ /* </View> */ }
{ /* <View style={{}}> */ }
{ /* <TouchableOpacity onPress={() => this.toggleBox(1)}> */ }
{ /* <Text style={{ fontSize: 20 }}>X</Text> */ }
{ /* </TouchableOpacity> */ }
{ /* </View> */ }
{ /* </View> */ }
