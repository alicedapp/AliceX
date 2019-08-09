import React from 'react';
import {Alert, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import {onSortOptions} from '../Utils/index';
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import exampleIcon from "../Assets/wzrd-1.png";

const styles = {
  icon: {
    iconImage: exampleIcon,
    iconAllowOverlap: true,
  },
};

class CheezeMap extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarVisible: false,
    };
  };

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this._mapOptions = Object.keys(MapboxGL.StyleURL)
      .map(key => {
        return {
          label: key,
          data: MapboxGL.StyleURL[key],
        };
      })
      .sort(onSortOptions);

    this.state = {
      styleURL: this._mapOptions[0].data,
      featureCollection: MapboxGL.geoUtils.makeFeatureCollection(),
    };

  }

  onPress = async (e) => {
    const feature = MapboxGL.geoUtils.makeFeature(e.geometry);
    feature.id = `${Date.now()}`;

    this.setState({
      featureCollection: MapboxGL.geoUtils.addToFeatureCollection(
        this.state.featureCollection,
        feature,
      ),
    });
  }

  onSourceLayerPress = (e) => {
    const feature = e.nativeEvent.payload;
    console.log('You pressed a layer here is your feature', feature); // eslint-disable-line
  }

  componentDidMount() {
    MapboxGL.locationManager.start();
  }

  componentWillUnmount() {
    MapboxGL.locationManager.dispose();
  }

  onMapChange = (index, styleURL) => {
    this.setState({styleURL});
  }

  onUserMarkerPress = () => {
    Alert.alert('You pressed on the user location annotation');
  }

  render() {
    return (
        <MapboxGL.MapView
          styleURL={'mapbox://styles/markpereir/cjz2mknyj0vke1cmzo00bs951'}
          onPress={this.onPress}
          style={{flex: 1}}
        >
          <NavigationBar/>
          <MapboxGL.Camera followZoomLevel={12} followUserLocation />
          <MapboxGL.ShapeSource
            id="symbolLocationSource"
            hitbox={{width: 20, height: 20}}
            onPress={this.onSourceLayerPress}
            shape={this.state.featureCollection}
          >
            <MapboxGL.SymbolLayer
              id="symbolLocationSymbols"
              minZoomLevel={1}
              style={styles.icon}
            />
          </MapboxGL.ShapeSource>

          <MapboxGL.UserLocation onPress={this.onUserMarkerPress} />
        </MapboxGL.MapView>
    );
  }
}

export default CheezeMap;
