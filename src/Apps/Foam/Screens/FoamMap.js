import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import sheet from '../../Example/Styles/sheet';
import exampleIcon from '../../Example/Assets/example.png';
import yea from '../../Example/Assets/location.png';

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

const feature = {
  geometry: {
    coordinates: [-0.005178458563847244, 0.004177097297940691],
    type: "Point",
    id: "1567377835616",
  },
  properties: {
    type: "Feature"
  }
}


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

// const feature = {
//   type: 'Feature',
//   id: '4',
//   geometry: {
//     type: 'Point',
//     coordinates: [ 151.2596, -33.9100],
//   },
// };

class ShapeSourceIcon extends React.Component {
  state = {
    features: MapboxGL.geoUtils.makeFeatureCollection(featureCollection.features),
  }

  render() {
    return (
        <MapboxGL.MapView style={sheet.matchParent}>
          <MapboxGL.Camera
            label={true}
            zoomLevel={12}
            centerCoordinate={[151.2215, -33.9107]}
          />
          <MapboxGL.Images images={{example: exampleIcon, assets: ['pin']}} />

        </MapboxGL.MapView>
    );
  }
}

export default ShapeSourceIcon;
