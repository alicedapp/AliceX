import React from 'react';
import {
  Animated, Dimensions, Image,
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';


import { decodeGeoHash, onSortOptions, SF_OFFICE_COORDINATE } from '../../Foam/utils';
import {NavigationBar} from "../../../Components/NavigationBar";
import Bubble from "../Components/common/Bubble";
import sheet from "../styles/sheet";
import Modalize from "../Components/Modalize";

const ANNOTATION_SIZE = 10;
const isValidCoordinate = geometry => {
  if (!geometry) {
    return false;
  }
  return geometry.coordinates[0] !== 0 && geometry.coordinates[1] !== 0;
};

const { height, width } = Dimensions.get('window');


export default class MapComponent extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
  };

  constructor(props) {
    super(props);

    this._mapOptions = Object.keys(MapboxGL.StyleURL)
      .map(key => ({
        label: key,
        data: MapboxGL.StyleURL[key],
      }))
      .sort(onSortOptions);

    this.modalRef = React.createRef();

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
      selectedPOITitle: 'Title',
      selectedPOIStake: 'Stake',
      selectedPOIColor: '#FFF',
      modalHeight: 350,
      poiDescription: {},
      selectedSignal: {},
      selectedPOIStatus: '',
      selectedPOIStatusColor: 'white'
    };

  }

  onOpen = (itemDescription) => {
    if (itemDescription === 'signal') {
      this.setState({selectedPOIColor: '#FEC76C', selectedPOIStatus: 'Signal', selectedPOIStatusColor: 'black'});
    } else if (itemDescription === 'applied') {
      this.setState({selectedPOIColor: '#2E7CE6', selectedPOIStatus: 'Pending Point of Interest', selectedPOIStatusColor: 'white'})
    } else {
      this.setState({selectedPOIColor: '#27AB5F', selectedPOIStatus: 'Verified Point of Interest', selectedPOIStatusColor: 'white'})
    }
    const modal = this.modalRef.current;

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

  onPress = (feature) => {
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

  onAnnotationSelected = (activeIndex, feature, listingHash, poi) => {
    console.log('being called at the same time?');

    if (this.state.activeIndex === activeIndex) {
      return;
    }

    this._scaleIn = new Animated.Value(0.6);
    Animated.timing(this._scaleIn, { toValue: 1.0, duration: 200 }).start();
    this.setState({ activeAnnotationIndex: activeIndex, selected: true });
    this.getPOIDescription(listingHash, poi);

    // if (this.state.previousActiveAnnotationIndex !== -1) {
    //   this._map.moveTo(feature.geometry.coordinates, 500);
    // }
    this.onOpen(poi.state.status.type);
  }

  onSignalSelected = (activeIndex, feature, signal) => {
    console.log('this shouldn\'t be selected');
    if (this.state.activeIndex === activeIndex) {
      return;
    }

    this._scaleIn = new Animated.Value(0.6);
    Animated.timing(this._scaleIn, { toValue: 1.0, duration: 200 }).start();
    this.setState({ activeAnnotationIndex: activeIndex, selected: true });
    this.setState({selectedSignal: signal});
    // if (this.state.previousActiveAnnotationIndex !== -1) {
    //   this._map.moveTo(feature.geometry.coordinates, 500);
    // }
    this.onOpen('signal');
  }

  getPOIDescription = async (listingHash, poiData) => {
    console.log('le poiData: ', poiData);
    let poiObj = {...poiData};
    console.log('LISTING HASH: ', listingHash)
    if (listingHash) {
      fetch(`https://map-api-direct.foam.space/poi/${listingHash}`)
        .then((response) => response.text())
        .then((poiDescription) => {
          const poiDesc = JSON.parse(poiDescription);
          console.log('POI DESCRIPTION: ', poiDescription);
          poiObj = {...poiObj, ...poiDesc};
          console.log('POI OBJECT: ', poiObj);
          this.setState({ poiDescription: poiObj });
        })
        .catch((err) => {});
    }

  };

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
      for (let i = 0; i < this.state.pois.length; i++) {
        const { geohash, state, listingHash, name, owner, tags } = this.state.pois[i];
        const [latitude] = decodeGeoHash(geohash).latitude;
        const [longitude] = decodeGeoHash(geohash).longitude;
        const coordinate = [ parseFloat(longitude.toPrecision(6)), parseFloat(latitude.toPrecision(6)) ];
        const stake = parseInt(state.deposit)/10e17;
        const title = `${name} ${stake} FOAM`;
        const id = listingHash;
        const poi = {geohash, state, listingHash, name, owner, tags, latitude, longitude, stake};
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
            onSelected={feature => this.onAnnotationSelected(i, feature, id, poi)}
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
      for (let i = 0; i < this.state.signals.length; i++) {
        const { createdAt, cst, nftAddress, radius, tokenId, geohash, stake, owner } = this.state.signals[i];
        const [latitude] = decodeGeoHash(geohash).latitude;
        const [longitude] = decodeGeoHash(geohash).longitude;
        const coordinate = [parseFloat(longitude.toPrecision(6)), parseFloat(latitude.toPrecision(6))];
        const title = `Signal: ${owner} ${parseInt(stake)/10e17} FOAM`;
        const signal = {createdAt, cst, nftAddress, radius, tokenId, geohash, owner, latitude, longitude, stake};
        const id = `pointAnnotation${i}`;
        let backgroundColor = "#FEC76C";

        items.push(
          <MapboxGL.PointAnnotation
            key={id}
            id={id}
            title="Test"
            selected={this.state.selected && i === 0}
            onSelected={feature => this.onSignalSelected(i, feature, cst, signal)}
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
            </View>
          </View>}
          <TouchableOpacity onPress={() => this.setState({showBox: !this.state.showBox})} style={{width: 400, height: 100, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center'}}>
            <Text>Press me</Text>
          </TouchableOpacity>
          {this.state.showBox ? <View style={{width: 20, height: 20, backgroundColor: 'black' }}/> : <></>}

          {this.renderPOIs()}
          {this.renderSignals()}
          {this.renderRegionChange()}
          {this.renderSelectedPoint()}
          <Modalize ref={this.modalRef} handlePosition="outside" height={140}>
            <View style={styles.innerModalBox}>
              <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 7}}>{this.state.poiDescription.name}</Text>
              <View style={styles.tokenAmount}>
                <Text style={{ color: this.state.selectedPOIColor }}>{parseInt(this.state.poiDescription.stake).toFixed(2)}</Text>
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
                <Text style={{color: this.state.selectedPOIStatusColor}}>{this.state.selectedPOIStatus}</Text>
                <Image source={require('../Assets/caret.png')} style={{resizeMode: 'contain', width: 15}}/>
              </TouchableOpacity>
              <Text style={{fontWeight: '500'}}>Address</Text>
              {this.state.poiDescription.data && <Text style={{marginBottom: 5}}>{this.state.poiDescription.data.data.address.toUpperCase()}</Text>}
              {this.state.poiDescription.data && <Text style={{color: 'grey', fontSize: 13, marginBottom: 25}}>Longitude and Latitude: {this.state.poiDescription.longitude.toFixed(3)} N, {this.state.poiDescription.latitude.toFixed(3)}W</Text>}
              <Text style={{fontWeight: '500', marginBottom: 8}}>Description</Text>
              {this.state.poiDescription.data && <Text style={{marginBottom: 20}}>{this.state.poiDescription.data.data.description}</Text>}
              <Text style={{fontWeight: '500', marginBottom: 8}}>Tags</Text>
              {this.state.poiDescription.tags && <View style={{marginBottom: 20, flexDirection: 'row', }}>
                {this.state.poiDescription.tags.map((tag, i) => {
                  return (
                    <View key={i} style={{ paddingLeft: 10, paddingRight: 10, marginRight: 10, backgroundColor: '#f1f1f1', height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{fontSize: 16, color: '#7e7e7e'}}>{tag}</Text>
                    </View>
                  )
                })}
                </View>}
                {this.state.poiDescription.data && <Text style={{fontWeight: '500', marginBottom: 20}}>Phone: <Text style={{fontWeight: '200'}}>{this.state.poiDescription.data.data.phone}</Text></Text>}
                {this.state.poiDescription.data && <Text style={{fontWeight: '500', marginBottom: 20}}>Web: <Text style={{fontWeight: '200'}}>{this.state.poiDescription.data.data.web}</Text></Text>}

            </View>
          </Modalize>
        </MapboxGL.MapView>
      </View>

    );
  }
}

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

  tokenAmount: {
    flexDirection: 'row',
    marginBottom: 15
  },
  descriptionButton: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 25,
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
