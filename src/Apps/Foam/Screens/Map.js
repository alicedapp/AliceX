import React from 'react';
import {
  Animated, Dimensions, Image,
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

const feature = {"type":"Feature",
    "properties":{"mag":1.3,
      "place":"6km SE of Talkeetna," +
        " Alaska",
      "time":1562633337528,
      "updated":1562633478814,
      "tz":-540,
      "url":"https://earthquake.usgs.gov/earthquakes/eventpage/ak0198q8ecn9",
      "detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak0198q8ecn9.geojson",
      "felt":null,
      "cdi":null,
      "mmi":null,
      "alert":null,
      "status":"automatic",
      "tsunami":0,
      "sig":26,
      "net":"ak",
      "code":"0198q8ecn9",
      "ids":"," +
        "ak0198q8ecn9," +
        "",
      "sources":"," +
        "ak," +
        "",
      "types":"," +
        "geoserve," +
        "origin," +
        "",
      "nst":null,
      "dmin":null,
      "rms":0.55000000000000004,
      "gap":null,
      "magType":"ml",
      "type":"earthquake",
      "title":"M 1.3 - 6km SE of Talkeetna," +
        " Alaska"},
    "geometry":{"type":"Point",
      "coordinates":[-150.00710000000001,
        62.286700000000003,
        14.699999999999999]},
    "id":"ak0198q8ecn9"};

const poi = {
  "state": {
    "status": {
      "listingSince": "2019-01-12T19:54:00Z",
      "type": "listing"
    },
    "createdAt": "2019-01-09T19:54:00Z",
    "deposit": "0x2b5e3af16b1880000"
  },
  "listingHash": "0x566b907de771a02bcd8be7eca8b2a894aa3755b93eb6c2082b3e90d3ff31c292",
  "owner": "0x222861f16354020f62bbfa0a878b2f047a385576",
  "geohash": "drs3jf20m3c7",
  "name": "Amherst Coffee and Whisk(e)y Bar ",
  "tags": ["Nightlife", "Food"]
};

const geoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "objectid": 1,
        "id": 1,
        "uniqueid": "1695.00",
        "address": "230",
        "suffix": " ",
        "street": "Stratford Ave",
        "onstr": "Friendship Ave",
        "fromstr": "Stratford Ave",
        "tostr": "Fairmount St /S",
        "side": "Side",
        "site": "1",
        "spp": "Acer platanoides",
        "dbh": 5,
        "cond": "Good",
        "trunks": 1,
        "mt": "Training Prune",
        "observe": "None",
        "hardscape": "N",
        "inspect": "N",
        "klir": "Vehicle",
        "utilities": "Y",
        "grow": "Tree Lawn",
        "spacesize": 2,
        "loctype": "Street",
        "pghdbsdeTree_Keeperarea": 8,
        "staff": "Kara Masak",
        "inv_date": "2005-02-14T00:00:00.000Z",
        "inv_time": " ",
        "inspect_dt": "2005-02-14T00:00:00.000Z",
        "inspect_tm": "10:18:32",
        "active": 1
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -79.9334671524,
          40.4611126031
        ]
      }
    }
    // additional features
  ]
}


import { decodeGeoHash, onSortOptions, SF_OFFICE_COORDINATE } from '../../Foam/utils';
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import sheet from "../styles/sheet";
import Modalize from "../Components/Modalize";
import exampleIcon from '../Assets/example.png';


const ANNOTATION_SIZE = 10;
const isValidCoordinate = geometry => {
  if (!geometry) {
    return false;
  }
  return geometry.coordinates[0] !== 0 && geometry.coordinates[1] !== 0;
};

const { height, width } = Dimensions.get('window');



const layerStyles = {
  singlePoint: {
    circleColor: 'green',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 5,
    circlePitchAlignment: 'map',
  },

  clusteredPoints: {
    circlePitchAlignment: 'map',

    circleColor: [
      'step',
      ['get', 'point_count'],
      '#51bbd6',
      100,
      '#f1f075',
      750,
      '#f28cb1',
    ],

    circleRadius: ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],

    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },

  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textPitchAlignment: 'map',
  },
};


export default class MapComponent extends React.Component {

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
      selectedPOIStatusColor: 'white',
      notificationRendered: false
    };

  }

  onOpen = (itemDescription) => {

    if (itemDescription === 'signal') {
      this.setState({selectedPOIColor: '#FEC76C', selectedPOIStatus: 'Signal', selectedPOIStatusColor: 'black'});
    } else if (itemDescription === 'applied') {
      this.setState({selectedPOIColor: '#2E7CE6', selectedPOIStatus: 'Pending Point of Interest', selectedPOIStatusColor: 'white'})
    } else if (itemDescription === 'challenged') {
      this.setState({selectedPOIColor: '#f47f67', selectedPOIStatus: 'Challenged Point of Interest', selectedPOIStatusColor: 'white'})
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
    };
    navigator.geolocation.getCurrentPosition(getCoords, console.error, {enableHighAccuracy: false, timeout: 50000});
  }

  onPress = (feature) => {
    const coords = Object.assign([], this.state.coordinates);
    coords.push(feature.geometry.coordinates);
    const coordinate = [parseFloat(coords[1][0].toPrecision(6)), parseFloat(coords[1][1].toPrecision(6))];
    this.setState({ selectedPoint: coordinate });
  };

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
  };

  renderNotification = () => {
    if (this.props.navigation.state.params && this.modalRef.current && this.state.finishedRendering && !this.state.notificationRendered) {
      this.setState({poiDescription: this.props.navigation.state.params.poi, notificationRendered: true});
      this.onOpen('challenged');
      console.log('navigation: ', this.props.navigation.state.params.poi);
    }
  };


  onDidFinishLoadingMap = () => {
    setTimeout(() => this.setState({ finishedRendering: true }), 1500);
  };

  onAnnotationSelected = (activeIndex, feature, listingHash, poi) => {
    this.setState({poiDescription: {loading: true}});


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
  };

  getPOIDescription = async (_listingHash, poiData) => {

    if (poiData.name) {
      const {name, longitude, latitude, owner, status, listingHash} = poiData;
      if (_listingHash) {
        console.log('getting', _listingHash, poiData)
        fetch(`https://map-api-direct.foam.space/poi/${_listingHash}`)
          .then((response) => response.text())
          .then((poiDescription) => {
            const data = JSON.parse(poiDescription).data;
            console.log('got1: ', data);
            const stake = data.state.deposit;
            console.log('got2: ', stake);
            const { description, tags, phone, web, address } = data.data;
            console.log('got3: ', description, tags, phone, web);
            const poiObj = {name, stake, address, longitude, latitude, description, tags, phone, web, owner, status, loading: false};
            console.log('got4: ', JSON.stringify(poiObj));
            this.setState({ poiDescription: poiObj });
          })
          .catch((err) => {});
      }

    } else {
      console.log('no poi data from map annotation')
    }
  };

  onSignalSelected = (activeIndex, feature, cst, signal) => {
    this.setState({poiDescription: {loading: true}});
    if (this.state.activeIndex === activeIndex) {
      return;
    }

    this._scaleIn = new Animated.Value(0.6);
    Animated.timing(this._scaleIn, { toValue: 1.0, duration: 200 }).start();
    this.setState({ activeAnnotationIndex: activeIndex, selected: true });
    this.getSignalDescription(signal, cst);
    // if (this.state.previousActiveAnnotationIndex !== -1) {
    //   this._map.moveTo(feature.geometry.coordinates, 500);
    // }
    this.onOpen('signal');
  }

  getSignalDescription = async (signal, cst) => {
    if (signal.nftAddress) {
      signal = {...signal, loading: false};
      // const {createdAt, cst, geohash, longitude, latitude, nftAddress, owner, radius, stake, tokenId} = signal;
      this.setState({poiDescription: signal})
    }

  };

  onAnnotationDeselected = (deselectedIndex) => {
    // const nextState = {};
    //
    // if (this.state.activeAnnotationIndex === deselectedIndex) {
    //   nextState.activeAnnotationIndex = -1;
    // }
    //
    // this._scaleOut = new Animated.Value(1);
    // Animated.timing(this._scaleOut, { toValue: 0.6, duration: 200 }).start();
    // nextState.previousActiveAnnotationIndex = deselectedIndex;
    // this.setState(nextState);
  }

  onSignalDeselected = (deselectedIndex) => {
    // const nextState = {};
    //
    // if (this.state.activeAnnotationIndex === deselectedIndex) {
    //   nextState.activeAnnotationIndex = -1;
    // }
    //
    // this._scaleOut = new Animated.Value(1);
    // Animated.timing(this._scaleOut, { toValue: 0.6, duration: 200 }).start();
    // nextState.previousActiveAnnotationIndex = deselectedIndex;
    // this.setState(nextState);
  };



  getPOIs = async () => {
    const {
      swLng, swLat, neLat, neLng,
    } = this.state;
    if (swLng) {
      fetch(`https://map-api-direct.foam.space/poi/map?swLng=${swLng}&swLat=${swLat}&neLng=${neLng}&neLat=${neLat}`)
        .then((response) => response.text())
        .then((pois) => {
          this.setState({ pois: JSON.parse(pois) }, this.renderPOIs);
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
          this.setState({ signals: JSON.parse(signals) }, this.renderSignals);
        })
        .catch((err) => {});
    }
  };

  closeModal = () => {

    this.setState({showPOIModal: false})
  };

  onRegionWillChange = (regionFeature) => {

    this.setState({ reason: 'will change', regionFeature }, () => {
      this.setBounds();
      this.getPOIs();
      this.getSignals();
    })
  };

  onRegionDidChange = (regionFeature) => {
    this.setState({ reason: 'did change', regionFeature }, () => {
      this.setBounds();
      this.getPOIs();
      this.getSignals();
    });
  };

  setBounds = () => {

    const { geometry, properties } = this.state.regionFeature;
    const [neLng, neLat] = properties.visibleBounds[0];
    const [swLng, swLat] = properties.visibleBounds[1];
    this.setState({
      neLat: neLat.toPrecision(6), neLng: neLng.toPrecision(6), swLat: swLat.toPrecision(6), swLng: swLng.toPrecision(6),
    });
  };

  renderPOIs = () => {
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
        } else if (state.status.type === 'challenged') {
          backgroundColor = '#f47f67'
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
  };

  renderSignals = () => {
    const items = [];
    if (this.state.signals !== null && this.state.signals !== undefined) {
      for (let i = 0; i < this.state.signals.length; i++) {
        const { createdAt, cst, nftAddress, radius, tokenId, geohash, stake, owner } = this.state.signals[i];
        const [latitude] = decodeGeoHash(geohash).latitude;
        const [longitude] = decodeGeoHash(geohash).longitude;
        const coordinate = [parseFloat(longitude.toPrecision(6)), parseFloat(latitude.toPrecision(6))];
        const title = `Signal ${parseInt(stake)/10e17} FOAM`;
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
            onDeselected={() => this.onSignalDeselected(i)}
            coordinate={coordinate}
          >
            <View style={[{backgroundColor}, styles.annotationContainer]}/>
            <MapboxGL.Callout contentStyle={{borderRadius: 10, backgroundColor}} tipStyle={MapBoxStyles.tip} textStyle={{color: 'black'}} title={title} />
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
          showUserLocation={true}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          styleURL={this.state.styleURL}
          style={{flex: 1}}
          onDidFinishLoadingMap={this.onDidFinishLoadingMap}
          onRegionWillChange={this.onRegionWillChange}
          onRegionDidChange={this.onRegionDidChange}
          onRegionIsChanging={this.onRegionIsChanging}
        >
          <MapboxGL.Camera
            zoomLevel={12}
            centerCoordinate={[-69.975482, 41.865860]}
            // centerCoordinate={this.state.coordinates[0]}
          />
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
              <View style={{marginTop: 20, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <TextInput placeholder={'Search'} placeholderTextColor='#636363' style={styles.whiteSearch}/>
                <Image source={require('../Assets/account-icon.png')} style={{ flex: 1, width: 40,height: 40, resizeMode: 'contain'}}/>
              </View>
            </View>
          </View>}
          {this.renderSignals()}
          {this.renderPOIs()}
          {this.renderNotification()}
          {this.renderSelectedPoint()}
          <Modalize ref={this.modalRef} handlePosition="outside" adjustToContentHeight style={{backgroundColor: 'white'}}>
            <View style={styles.innerModalBox}>
              <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 7}}>{this.state.poiDescription.name}</Text>
              {this.state.poiDescription.stake && <View style={styles.tokenAmount}>
                <Text style={{ color: this.state.selectedPOIColor }}>{parseInt(this.state.poiDescription.stake)/10e17.toFixed(2)}</Text>
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
              </View>}

              <TouchableOpacity style={[styles.descriptionButton, { backgroundColor: this.state.selectedPOIColor }]}>
                {this.state.poiDescription.loading ? <Text style={{color: this.state.selectedPOIStatusColor}}>Loading</Text> : <Text style={{color: this.state.selectedPOIStatusColor}}>{this.state.selectedPOIStatus}</Text>}
                {this.state.poiDescription.loading ? <Image source={require('../Assets/location.png')} style={{resizeMode: 'contain', width: 15}}/> :
                  <Image source={require('../Assets/caret.png')} style={{resizeMode: 'contain', width: 15}}/>}
              </TouchableOpacity>

              {this.state.poiDescription.address && <Text style={{fontWeight: '500'}}>Address</Text>}
              {this.state.poiDescription.address && <Text style={{marginBottom: 5}}>{this.state.poiDescription.address.toUpperCase()}</Text>}
              {this.state.poiDescription.latitude && <Text style={{color: 'grey', fontSize: 13, marginBottom: 25}}>Longitude and Latitude: {this.state.poiDescription.longitude.toFixed(3)} N, {this.state.poiDescription.latitude.toFixed(3)}W</Text>}
              {this.state.poiDescription.description && <Text style={{fontWeight: '500', marginBottom: 8}}>Description</Text>}

              {this.state.poiDescription.description && <Text style={{marginBottom: 20}}>{this.state.poiDescription.description}</Text>}
              {this.state.poiDescription.tags && <Text style={{fontWeight: '500', marginBottom: 8}}>Tags</Text>}
              {this.state.poiDescription.tags && <View style={{marginBottom: 20, flexDirection: 'row', }}>
                {this.state.poiDescription.tags.map((tag, i) => {
                  return (
                    <View key={i} style={{ paddingLeft: 10, paddingRight: 10, marginRight: 10, backgroundColor: '#f1f1f1', height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{fontSize: 16, color: '#7e7e7e'}}>{tag}</Text>
                    </View>
                  )
                })}
              </View>}
              {!!this.state.poiDescription.phone && <View style={{flexDirection: 'row'}}><Text style={{fontWeight: '500', marginBottom: 20}}>Phone: </Text><Text style={{fontWeight: '200'}}>{this.state.poiDescription.phone}</Text></View>}
              {!!this.state.poiDescription.web && <View style={{flexDirection: 'row'}}><Text style={{fontWeight: '500', marginBottom: 20}}>Web: </Text><Text style={{fontWeight: '200'}}>{this.state.poiDescription.web}</Text></View>}
            </View>
          </Modalize>
        </MapboxGL.MapView>
      </View>

    );
  }
}

const styled = {
  icon: {
    iconImage: ['get', 'icon'],

    iconSize: [
      'match',
      ['get', 'icon'],
      'example',
      1.2,
      'airport-15',
      1.2,
      /* default */ 1,
    ],
  },
};

const MapBoxStyles = StyleSheet.create({
  tip: {
    backgroundColor: 'black',
  },
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
    flexDirection: 'row',
    alignItems: 'center',
    flex: 5,
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
    margin: 20,
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

