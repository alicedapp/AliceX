import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {
  Dimensions,
  View
} from 'react-native';
import sheet from '../../Example/Styles/sheet';
import yea from '../../Example/Assets/location.png';
import green from '../../CheezeWizards/Assets/ready.png';
import yellow from '../../CheezeWizards/Assets/not-ready.png';
import red from '../../CheezeWizards/Assets/out.png';
import {NavigationBar} from "../../../AliceCore/Components";
import {decodeGeoHash} from "../utils";
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
  circles: {
    circleRadius: [
      'interpolate',
      ['exponential', 1.75],
      ['zoom'],
      12,
      2,
      22,
      180,
    ],

    circleColor: [
      'match',
      ['get', 'ethnicity'],
      'listed',
      '#fbb03b',
      'Black',
      '#223b53',
      'Hispanic',
      '#e55e5e',
      'Asian',
      '#3bb2d0',
      '#ccc',
    ],
  },

  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textPitchAlignment: 'map',
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
  circles: {
    circleRadius: [
      'interpolate',
      ['exponential', 1.75],
      ['zoom'],
      12,
      2,
      22,
      180,
    ],

    circleColor: [
      'match',
      ['get', 'ethnicity'],
      'listed',
      '#fbb03b',
      'Black',
      '#223b53',
      'Hispanic',
      '#e55e5e',
      'Asian',
      '#3bb2d0',
      '#ccc',
    ],
  },

  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textPitchAlignment: 'map',
  },
};


class ShapeSourceIcon extends React.Component {
  state = {
    features: MapboxGL.geoUtils.makeFeatureCollection(featureCollection.features),
    pois: {},
    signals: {},
    featureCollection: {},
    poiCollection: {},
    signalCollection: {},

  };

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
    console.log('FETCHED SIGNALS: ', pois)
    console.log('FETCHED POIs: ', signals)

    this.mapboxConverter(pois, signals);

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

    console.log('CONVERTED SIGNALS: ', convertedSignals)
    console.log('CONVERTED POIs: ', convertedPOIs)

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
          "title": "FOAM Points of Interest",
        },
        "features": convertedSignals
      },
    })

  }

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

  render() {
    console.log('POIS: ', this.state.pois);
    console.log('SIGNALS: ', this.state.signals);
    console.log('FEATURE COLLECTION: ', this.state.featureCollection);
    return (
      <View style={{flex: 1}}>
               <MapboxGL.MapView
          style={sheet.matchParent}
          onRegionDidChange={this.onRegionChange}
        >
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

export default ShapeSourceIcon;
