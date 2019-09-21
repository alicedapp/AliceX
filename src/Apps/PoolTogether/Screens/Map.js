import React from 'react';
import {
  StyleSheet, Image, TouchableOpacity, View,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';


import { decodeGeoHash, onSortOptions, SF_OFFICE_COORDINATE } from '../../Foam/utils';
import {createStackNavigator} from "react-navigation";
import App from "../App";
import {NavigationBar} from "../../../AliceCore/Components/NavigationBar";

const ANNOTATION_SIZE = 10;


class MapComponent extends React.Component {

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
    console.log('Map Options: ', this._mapOptions)

    this.state = {
      styleURL: this._mapOptions[5].data,
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
      coordinates: [[-73.99155, 40.73581]],
      pois: null,
      showBox: false

    };

    this.child = React.createRef();

    this.onMapChange = this.onMapChange.bind(this);
  }

  onClick = () => {
    this.child.current.openModal();
  };

  onDidFinishLoadingMap = () => {
    setTimeout(() => this.setState({finishedRendering: true}), 1500);
  }

  onRegionWillChange = (regionFeature) => {
    this.setState({ reason: 'will change', regionFeature });
  }

  onRegionDidChange = (regionFeature) => {
    this.setState({ reason: 'did change', regionFeature });
  }

  onRegionIsChanging = (regionFeature) => {
    this.setState({ reason: 'is changing', regionFeature }, this.setBounds);
  }

  onMapChange = (index, styleURL) => {
    this.setState({ styleURL });
  }

  setBounds = () => {
    const { geometry, properties } = this.state.regionFeature;
    const [neLng, neLat] = properties.visibleBounds[0];
    const [swLng, swLat] = properties.visibleBounds[1];
    this.setState({
      neLat: neLat.toPrecision(6), neLng: neLng.toPrecision(6), swLat: swLat.toPrecision(6), swLng: swLng.toPrecision(6),
    });
  };

  openExamples = () => {
    this.props.navigation.navigate('MapExamples');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1}}>
        <MapboxGL.MapView
          styleURL={this.state.styleURL}
          style={{flex: 1}}
        >
          <NavigationBar/>
          <MapboxGL.Camera followZoomLevel={12} followUserLocation />
          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', padding: 20}}>
            <TouchableOpacity onPress={this.openExamples} style={{backgroundColor: 'white', height: 50, width: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../Assets/burger.png')} style={{resizeMode: 'contain', height: 20}}/>
            </TouchableOpacity>
          </View>
        </MapboxGL.MapView>
      </View>
    );
  }
}

const MapStack = createStackNavigator({
    Home: {
      screen: MapComponent,
    },
    MapExamples: {
      screen: App,
    },
  },
  {
    headerMode: 'none',
  });

export default MapStack

const MapBoxStyles = StyleSheet.create({
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
});
