import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {
  Dimensions, Image,
  View
} from "react-native";
import sheet from '../../Example/Styles/sheet';
import yea from '../../Example/Assets/location.png';
import green from '../../CheezeWizards/Assets/ready.png';
import yellow from '../../CheezeWizards/Assets/not-ready.png';
import red from '../../CheezeWizards/Assets/out.png';
import { NavigationBar } from "../../../AliceCore/Components";
import { decodeGeoHash, onSortOptions } from "../utils";
import data from './data'

const featureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
      properties: {
        icon: yea,
      },
      geometry: {
        type: 'Point',
        coordinates: [151.227028, -33.882250],
      },
    },
    {
      type: 'Feature',
      id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
      properties: {
        icon: yea,
      },
      geometry: {
        type: 'Point',
        coordinates: [151.279411,   -33.856762],
      },
    },
    {
      type: 'Feature',
      id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
      properties: {
        icon: yea,
      },
      geometry: {
        type: 'Point',
        coordinates: [151.235588, -33.897822],
      },
    },
  ],
};

const yellowStyles = {
  singlePoint: {
    iconImage: yellow,
    iconAllowOverlap: true,
    iconSize: 0.4,
    iconHaloColor: '#ff0000',
    iconHaloWidth: 2

  },
};

const redStyles = {
  singlePoint: {
    iconImage: red,
    iconAllowOverlap: true,
    iconSize: 0.4,
    iconHaloColor: '#ff0000',
    iconHaloWidth: 2

  },
};


class FoamMap extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarVisible: false,
      header: null
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
    this.poiModal = React.createRef();

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
      coordinates: [-69.975482, 41.865860],
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
      notificationRendered: false,
      renderPOI: true,
      features: MapboxGL.geoUtils.makeFeatureCollection(featureCollection.features),
      featureCollection: {},
      poiCollection: {},
      signalCollection: {},
    };

  }

  componentDidMount() {
    this.search('port of')
    const getCoords = (pos) => {
      const {latitude, longitude} = pos.coords;
      this.setState({coordinates: [parseFloat(longitude.toPrecision(6)), parseFloat(latitude.toPrecision(6))]})
    };
    navigator.geolocation.getCurrentPosition(getCoords, console.error, {enableHighAccuracy: false, timeout: 500});
  }


  onRegionChange = async (regionFeature) => {
    const { geometry, properties } = regionFeature;
    const [neLng, neLat] = properties.visibleBounds[0];
    const [swLng, swLat] = properties.visibleBounds[1];
    const coords = {neLat, neLng, swLat, swLng};
    this.setState({
      neLat: neLat.toPrecision(6), neLng: neLng.toPrecision(6), swLat: swLat.toPrecision(6), swLng: swLng.toPrecision(6),
    });
    const pois = await this.getPOIs(coords);
    const signals = await this.getSignals(coords);
    // console.log('FETCHED SIGNALS: ', pois)
    // console.log('FETCHED POIs: ', signals)

    this.mapboxConverter(pois, signals);

  };

  onRegionWillChange = (regionFeature) => {

    this.setState({ reason: 'will change', regionFeature }, () => {
      this.setBounds();
      // this.getPOIs();
      // this.getSignals();
    })
  };

  onRegionDidChange = (regionFeature) => {
    this.setState({ reason: 'did change', regionFeature }, () => {
      this.setBounds();
      // this.getPOIs();
      // this.getSignals();
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

  search = async text => {
    const results = await fetch(`https://map-api-direct.foam.space/search/text?neLat=56.33711662831405&neLng=18.99660742187471&q=${text}&swLat=42.96750550985229&swLng=-1.723607421874735`);
    // console.log(`SEARCH RESULTS FROM: ${text}`, await results.json());
  };


  mapboxConverter = (pois, signals) => {
    const convertedPOIs = pois.map((poi, i) => {
      const {geohash, listingHash, name, type} = poi;
      const {longitude, latitude} = decodeGeoHash(geohash);

      return {
        "type": "Feature",
        "properties": {
          "ids": `,${listingHash},`,
          "types": ",geoserve,nearby-cities,origin,phase-data,scitech-link,",
          "title": name,
          "type": type
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            longitude[0],
            latitude[0]
          ]
        },
        "id": listingHash
      };
    });
    const convertedSignals = signals.map((signal, i) => {
      const {geohash, cst, name, stake, type, radius} = signal;
      const {longitude, latitude} = decodeGeoHash(geohash);
      return {
        "type": "Feature",
        "properties": {
          "ids": `,${cst},`,
          "types": ",geoserve,nearby-cities,origin,phase-data,scitech-link,",
          "title": name,
          "stake": stake,
          "type": type,
          "radius":radius,
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            longitude[0],
            latitude[0]
          ]
        },
        "id": cst
      };

    });

    // console.log('CONVERTED SIGNALS: ', convertedSignals)
    // console.log('CONVERTED POIs: ', convertedPOIs)

    Array.prototype.push.apply(convertedPOIs,convertedSignals);

    this.setState({
      poiCollection: {
        "type": "FeatureCollection",
        "metadata": {
          "title": "FOAM Points of Interest",
        },
        "features": convertedPOIs
      },
      signalCollection: {
        "type": "FeatureCollection",
        "metadata": {
          "title": "FOAM Signals",
        },
        "features": convertedSignals
      },
    })

  };

  onDidFinishLoadingMap = () => {
    setTimeout(() => this.setState({ finishedRendering: true }), 500);
  };


  getPOIs = async (coords) => {
    const {
      swLng, swLat, neLat, neLng,
    } = coords;
    if (swLng) {
      return fetch(`https://map-api-direct.foam.space/poi/map?swLng=${swLng}&swLat=${swLat}&neLng=${neLng}&neLat=${neLat}`)
        .then((response) => response.text())
        .then((pois) => {
          this.setState({ pois: JSON.parse(pois)});
          return JSON.parse(pois);
        })
        .catch((err) => {});
    }
  };

  getSignals = async (coords) => {
    const {
      swLng, swLat, neLat, neLng,
    } = coords;

    if (swLng) {
      return fetch(`https://map-api-direct.foam.space/signal/map?swLng=${swLng}&swLat=${swLat}&neLng=${neLng}&neLat=${neLat}`)
        .then((response) => response.text())
        .then((signals) => {
          this.setState({ signals: JSON.parse(signals)});
          return JSON.parse(signals);
        })
        .catch((err) => {});
    }
  };

  onPress = (feature) => {
    const coords = feature.geometry.coordinates;
    // console.log('COORDS: ', coords);
    const coordinate = [parseFloat(coords[0].toPrecision(6)), parseFloat(coords[1].toPrecision(6))];
    // console.log('COORDS: ', coordinate);
    this.setState({ selectedPoint: coordinate, coordinates: coordinate, renderPOI: false });
    const modal = this.modalRef.current;
    if (modal) {
      modal.openModal();
    }
  };


  render() {
    // console.log('POIS: ', this.state.pois);
    // console.log('SIGNALS: ', this.state.signals);
    // console.log('FEATURE COLLECTION: ', this.state.featureCollection);
    return (
      <View style={{flex: 1}}>
        <MapboxGL.MapView
          style={sheet.matchParent}
          onRegionDidChange={this.onRegionChange}
          onPress={this.onPress}
          showUserLocation={true}
          userTrackingMode={1}
          styleURL={this.state.styleURL}
          onDidFinishLoadingMap={this.onDidFinishLoadingMap}
          onRegionWillChange={this.onRegionWillChange}
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

          </View>}
          <MapboxGL.Camera
            label={true}
            zoomLevel={12}
            centerCoordinate={[151.2215, -33.9107]}
          />
          <MapboxGL.ShapeSource
            id="pointsOfInterest"
            shape={this.state.poiCollection && this.state.poiCollection}
          >
            <MapboxGL.SymbolLayer
              id="pointOfInterest"
              style={yellowStyles.singlePoint}
            />
            <MapboxGL.Callout containerStyle={{width: 100, height: 100, backgroundColor: '#fff'}} contentStyle={{borderRadius: 10, backgroundColor: 'green'}} textStyle={{color: 'white'}} title={"Hello"} />
          </MapboxGL.ShapeSource>
          <MapboxGL.ShapeSource
            id="signals"
            shape={this.state.signalCollection && this.state.signalCollection}
          >
            <MapboxGL.SymbolLayer
              id="signal"
              style={redStyles.singlePoint}
            />
          </MapboxGL.ShapeSource>

        </MapboxGL.MapView>
      </View>
    );
  }
}

export default FoamMap;
