import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import sheet from '../styles/sheet';
import colors from '../styles/colors';
import {SF_OFFICE_COORDINATE} from '../utils/index';

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

class WatercolorRasterTiles extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      opacity: 1,
    };

    this.onOpacityChange = this.onOpacityChange.bind(this);
  }

  onOpacityChange(value) {
    this.setState({opacity: value});
  }

  render() {
    const rasterSourceProps = {
      id: 'stamenWatercolorSource',
      url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
      tileSize: 256,
    };

    return (
      <Page {...this.props}>
        <MapboxGL.MapView style={sheet.matchParent}>
          <MapboxGL.Camera
            zoomLevel={16}
            centerCoordinate={SF_OFFICE_COORDINATE}
          />

          <MapboxGL.RasterSource {...rasterSourceProps}>
            <MapboxGL.RasterLayer
              id="stamenWatercolorLayer"
              sourceID="stamenWatercolorSource"
              style={{rasterOpacity: this.state.opacity}}
            />
          </MapboxGL.RasterSource>
        </MapboxGL.MapView>

        <View style={styles.slider}>
          <TouchableOpacity
            onPress={() => this.onOpacityChange(0.2)}
            style={{backgroundColor: colors.primary.blue, height: 20, width: 20}}
          />
          <TouchableOpacity
            onPress={() => this.onOpacityChange(0.6)}
            style={{backgroundColor: colors.secondary.purpleLight, height: 20, width: 20}}
          />
          <TouchableOpacity
            onPress={() => this.onOpacityChange(0.9)}
            style={{backgroundColor: colors.primary.purpleDark, height: 20, width: 20}}
          />
        </View>
      </Page>
    );
  }
}

export default WatercolorRasterTiles;
