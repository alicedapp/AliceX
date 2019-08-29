import React from 'react';
import {
  Image, ScrollView,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';


import { decodeGeoHash, onSortOptions, SF_OFFICE_COORDINATE } from '../../Foam/utils';
import Modalize from "../Components/Modalize";
import {NavigationBar} from "../../../AliceComponents/NavigationBar";

const ANNOTATION_SIZE = 15;


export default class MapComponent extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null
    }
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
    const {lat, lng} = this.props.navigation.state.params.city

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
      selectedPoint: null,
      coordinates: [lat, lng],
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

  renderCreatePOI = () => {
    if (!this.state.renderPOI) {
      return (
        <View>
          <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 7}}>Create Crypto Friendly Location</Text>
          <Text style={{marginBottom: 10}}>Select an option below to create a location on the map.</Text>
          <TouchableOpacity style={{margin: 10, height: 50, borderBottomWidth: 0.5, alignItems: 'center', borderBottomColor: '#dfdfdf', width: '100%', flexDirection: 'row'}} onPress={() => this.goToCity(city)}>
            <View style={{...styles.iconContainer, backgroundColor: '#ff8e27'}}>
              <Image source={require('../Assets/atm.png')} style={{
                resizeMode: 'contain',
                width: 30,
                height: 30
              }}/>
            </View>
            <Text style={{fontSize: 20}}>ATM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{margin: 10, height: 50, borderBottomWidth: 0.5, alignItems: 'center', borderBottomColor: '#dfdfdf', width: '100%', flexDirection: 'row'}} onPress={() => this.goToCity(city)}>
            <View style={{...styles.iconContainer, backgroundColor: '#428cff'}}>
              <Image source={require('../Assets/bed.png')} style={{
                resizeMode: 'contain',
                width: 30,
                height: 30
              }}/>
            </View>
            <Text style={{fontSize: 20}}>Stay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{margin: 10, height: 50, borderBottomWidth: 0.5, alignItems: 'center', borderBottomColor: '#dfdfdf', width: '100%', flexDirection: 'row'}} onPress={() => this.goToCity(city)}>
            <View style={{...styles.iconContainer, backgroundColor: '#39d557'}}>
              <Image source={require('../Assets/dish.png')} style={{
                resizeMode: 'contain',
                width: 30,
                height: 30
              }}/>
            </View>
            <Text style={{fontSize: 20}}>Restaurant</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  onPress = (feature) => {
    const coords = feature.geometry.coordinates;
    console.log('COORDS: ', coords);
    const coordinate = [parseFloat(coords[0].toPrecision(6)), parseFloat(coords[1].toPrecision(6))];
    console.log('COORDS: ', coordinate);
    this.setState({ selectedPoint: coordinate, coordinates: coordinate, renderPOI: false });
    const modal = this.modalRef.current;
    if (modal) {
      modal.openModal();
    }
  };

  renderSelectedPoint = () => {
    if (this.state.selectedPoint !== null) {
      return (
        <MapboxGL.PointAnnotation
          key={1}
          id={'1'}
          coordinate={this.state.selectedPoint}
        >
          <View style={[{backgroundColor: '#2c77ff'}, styles.annotationContainer]}/>
          <MapboxGL.Callout contentStyle={{borderRadius: 10, backgroundColor: '#fff'}} tipStyle={MapBoxStyles.tip} textStyle={{color: 'white'}} title={'Your POI'} />
        </MapboxGL.PointAnnotation>
      );
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1}}>
        <MapboxGL.MapView
          showUserLocation={true}
          styleURL={this.state.styleURL}
          style={{flex: 1}}
          onPress={this.onPress}
          onDidFinishLoadingMap={this.onDidFinishLoadingMap}
          onRegionWillChange={this.onRegionWillChange}
          onRegionDidChange={this.onRegionDidChange}
          onRegionIsChanging={this.onRegionIsChanging}
        >
          <NavigationBar/>
          <MapboxGL.Camera
            zoomLevel={12}
            centerCoordinate={this.state.coordinates}
            followZoomLevel={12}
            followUserLocation />
          {this.renderSelectedPoint()}
        </MapboxGL.MapView>
        <Modalize ref={this.modalRef} handlePosition="outside" adjustToContentHeight style={{backgroundColor: 'white'}}>
          <View style={styles.innerModalBox}>
            {this.renderCreatePOI()}
          </View>
        </Modalize>
      </View>
    );
  }
}

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
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  innerModalBox: {
    margin: 20,
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
