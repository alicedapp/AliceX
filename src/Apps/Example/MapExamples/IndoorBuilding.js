import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import sheet from '../Styles/sheet';
import colors from '../Styles/colors';
import indoorMapGeoJSON from '../Assets/indoor_3d_map.json';

import Page from './common/Page';
import BaseExamplePropTypes from './common/BaseExamplePropTypes';

const styles = StyleSheet.create({
  slider: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    maxHeight: 60,
    paddingHorizontal: 24,
  },
});

const layerStyles = {
  building: {
    fillExtrusionOpacity: 0.5,
    fillExtrusionHeight: ['get', 'height'],
    fillExtrusionBase: ['get', 'base_height'],
    fillExtrusionColor: ['get', 'color'],
    // fillExtrusionColorTransition: {duration: 2000, delay: 0},
  },
};

class IndoorBuilding extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      sliderValue: -80,
    };

    this.onSliderChange = this.onSliderChange.bind(this);
  }

  onSliderChange(value) {
    this.setState({sliderValue: value});
  }

  render() {
    return (
      <Page {...this.props}>
        <MapboxGL.MapView
          ref={ref => (this.map = ref)}
          style={sheet.matchParent}
        >
          <MapboxGL.Camera
            zoomLevel={16}
            pitch={40}
            heading={20}
            centerCoordinate={[-87.61694, 41.86625]}
          />

          <MapboxGL.Light style={{position: [5, 90, this.state.sliderValue]}} />

          <MapboxGL.ShapeSource
            id="indoorBuildingSource"
            shape={indoorMapGeoJSON}
          >
            <MapboxGL.FillExtrusionLayer
              id="building3d"
              style={layerStyles.building}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>

        <View style={styles.slider}>
          <TouchableOpacity
            onPress={() => this.onOpacityChange(20)}
            style={{backgroundColor: colors.primary.blue, height: 20, width: 20}}
          />
          <TouchableOpacity
            onPress={() => this.onOpacityChange(60)}
            style={{backgroundColor: colors.secondary.purpleLight, height: 20, width: 20}}
          />
          <TouchableOpacity
            onPress={() => this.onOpacityChange(90)}
            style={{backgroundColor: colors.primary.purpleDark, height: 20, width: 20}}
          />
        </View>
      </Page>
    );
  }
}

export default IndoorBuilding;
