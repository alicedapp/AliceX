import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import sheet from '../styles/sheet';
import exampleIcon from '../Assets/example.png';
import yea from '../Assets/location.png';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';

const styles = {
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

const featureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
      properties: {
        icon: exampleIcon,
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
        icon: 'airport-15',
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

const feature = {
  type: 'Feature',
  id: '4',
  geometry: {
    type: 'Point',
    coordinates: [ 151.2596, -33.9100],
  },
};

class ShapeSourceIcon extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  render() {
    return (
      <Page {...this.props}>
        <MapboxGL.MapView style={sheet.matchParent}>
          <MapboxGL.Camera
            zoomLevel={12}
            centerCoordinate={[151.2215, -33.9107]}
          />
          <MapboxGL.ShapeSource
            id="exampleShapeSource"
            shape={featureCollection}
          >
            <MapboxGL.SymbolLayer id={'2'} style={{ iconSize: 1 }} />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </Page>
    );
  }
}

export default ShapeSourceIcon;
