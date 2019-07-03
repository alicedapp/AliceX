import React, {Component} from 'react';
import {
  Animated, Image, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Dimensions, View,
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import ExampleMaps from './ExampleMaps';
import Modalize from '../Components/Modalize';

import sheet from '../styles/sheet';
import { decodeGeoHash, onSortOptions } from '../utils';
import Bubble from "../Components/common/Bubble";
import {NavigationBar} from "../../../Components/NavigationBar";

const { height, width } = Dimensions.get('window');

const isValidCoordinate = geometry => {
  if (!geometry) {
    return false;
  }
  return geometry.coordinates[0] !== 0 && geometry.coordinates[1] !== 0;
};


class HomeScreen extends Component {

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

    this.modalRef = React.createRef();

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

  onOpen = () => {

    const modal = this.modalRef.current;
    console.log('modal: ', this.modalRef.current);

    if (modal) {
      modal.openModal();
    }
  };

  componentDidMount() {
    const getCoords = (pos) => {
      const {latitude, longitude} = pos.coords;
      this.setState({coordinates: [[parseFloat(longitude.toPrecision(6)), parseFloat(latitude.toPrecision(6))]]})
    }
    navigator.geolocation.getCurrentPosition(getCoords, console.error, {enableHighAccuracy: false, timeout: 50000});

  }

  onPress(feature) {
    const coords = Object.assign([], this.state.coordinates);
    coords.push(feature.geometry.coordinates);
    const coordinate = [parseFloat(coords[1][0].toPrecision(6)), parseFloat(coords[1][1].toPrecision(6))];
    this.setState({ selectedPoint: coordinate });
  }

  renderSelectedPoint = () => {
    if (this.state.selectedPoint !== null) {
      return (
        <MapboxGL.PointAnnotation
          key={1}
          id={'1'}
          coordinate={this.state.selectedPoint}
        >
          <View style={[{backgroundColor: '#fff'}, styles.annotationContainer]}/>
          <MapboxGL.Callout contentStyle={{borderRadius: 10, backgroundColor: '#fff'}} tipStyle={MapBoxStyles.tip} textStyle={{color: 'white'}} title={'Your POI'} />
        </MapboxGL.PointAnnotation>
      );
    }
  }

  onDidFinishLoadingMap = () => {
    setTimeout(() => this.setState({ finishedRendering: true }), 1500);
  }

  onAnnotationSelected(activeIndex, feature, listingHash) {
    if (this.state.activeIndex === activeIndex) {
      return;
    }

    this._scaleIn = new Animated.Value(0.6);
    Animated.timing(this._scaleIn, { toValue: 1.0, duration: 200 }).start();
    this.setState({ activeAnnotationIndex: activeIndex, selected: true });
    this.getPOIDescription(listingHash)

    if (this.state.previousActiveAnnotationIndex !== -1) {
      this._map.moveTo(feature.geometry.coordinates, 500);
    }
    this.onOpen();
  }

  getPOIDescription = async (listingHash) => {
    if (listingHash) {
      fetch(`https://map-api-direct.foam.space/poi/${listingHash}`)
        .then((response) => response.text())
        .then((poiDescription) => {
          this.setState({ poiDescription: JSON.parse(poiDescription) });
        })
        .catch((err) => {});
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
      fetch(`https://map-api-direct.foam.space/poi/map?swLng=${swLng}&swLat=${swLat}&neLng=${neLng}&neLat=${neLat}`)
        .then((response) => response.text())
        .then((pois) => {
          console.log('POIS: ', pois)
          this.setState({ pois: JSON.parse(pois) });
        })
        .catch((err) => {});
    }
  };

  getSignals = async () => {
    const {
      swLng, swLat, neLat, neLng,
    } = this.state;
    if (swLng) {
      fetch(`https://map-api-direct.foam.space/signal/map?swLng=${swLng}&swLat=${swLat}&neLng=${neLng}&neLat=${neLat}`)
        .then((response) => response.text())
        .then((signals) => {
          console.log('Signals: ', signals);
          this.setState({ signals: JSON.parse(signals) });
        })
        .catch((err) => {});
    }
  };

  closeModal = () => {
    this.setState({showPOIModal: false})
  }

  renderRegionChange() {
    if (
      !this.state.regionFeature ||
      !isValidCoordinate(this.state.regionFeature.geometry)
    ) {
      return (
        <Bubble>
          <Text>Move the map!</Text>
        </Bubble>
      );
    }

    const {geometry, properties} = this.state.regionFeature;
    const neCoord = properties.visibleBounds[0]
      .map(n => n.toPrecision(6))
      .join(', ');
    const swCoord = properties.visibleBounds[1]
      .map(n => n.toPrecision(6))
      .join(', ');
    return (
      <Bubble style={{marginBottom: 100}}>
        <Text>{this.state.reason}</Text>
      </Bubble>
    );
  }

  onRegionWillChange = (regionFeature) => {
    this.setState({ reason: 'will change', regionFeature });
  }

  onRegionDidChange = (regionFeature) => {
    this.setState({ reason: 'did change', regionFeature });
    this.getPOIs();
    this.getSignals();
  }

  onRegionIsChanging = (regionFeature) => {
    this.setState({ reason: 'is changing', regionFeature }, this.setBounds);
  }

  setBounds = () => {
    const { geometry, properties } = this.state.regionFeature;
    const [neLng, neLat] = properties.visibleBounds[0];
    const [swLng, swLat] = properties.visibleBounds[1];
    this.setState({
      neLat: neLat.toPrecision(6), neLng: neLng.toPrecision(6), swLat: swLat.toPrecision(6), swLng: swLng.toPrecision(6),
    });
  };

  renderPOIs() {
    const items = [];
    if (this.state.pois !== null && this.state.pois !== undefined) {
      console.log('got here pois: ', this.state.pois);
      for (let i = 0; i < this.state.pois.length; i++) {
        const { geohash, state, listingHash, name } = this.state.pois[i];
        const [latitude] = decodeGeoHash(geohash).latitude;
        const [longitude] = decodeGeoHash(geohash).longitude;
        const coordinate = [ parseFloat(longitude.toPrecision(6)), parseFloat(latitude.toPrecision(6)) ];
        const title = `${name} ${parseInt(state.deposit)/10e17} FOAM`;
        const id = listingHash;
        let backgroundColor;
        if (state.status.type === 'listing') {
          backgroundColor = '#27AB5F'
        } else {
          backgroundColor = '#2E7CE6'
        }
        items.push(
          <MapboxGL.PointAnnotation
            key={id}
            id={id}
            title="Test"
            selected={this.state.selected && i === 0}
            onSelected={feature => this.onAnnotationSelected(i, feature, id)}
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

  renderSignals() {
    const items = [];
    if (this.state.signals !== null && this.state.signals !== undefined) {
      console.log('got here signals: ', this.state.signals);
      for (let i = 0; i < this.state.signals.length; i++) {
        const { geohash, stake, owner } = this.state.signals[i];
        const [latitude] = decodeGeoHash(geohash).latitude;
        const [longitude] = decodeGeoHash(geohash).longitude;
        const coordinate = [parseFloat(longitude.toPrecision(6)), parseFloat(latitude.toPrecision(6))];
        const title = `Signal: ${owner} ${parseInt(stake)/10e17} FOAM`;
        const id = `pointAnnotation${i}`;
        let backgroundColor = "#FEC76C";

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


class SettingsScreen extends React.Component {
  render() {
    return (
      <ExampleMaps/>
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

