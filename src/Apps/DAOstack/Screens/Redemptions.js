import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import { Modalize } from "../Components";
import Icon from "../../../AliceComponents/IconComponent";
import { decodeGeoHash, onSortOptions, SF_OFFICE_COORDINATE } from '../../Foam/utils';

const ANNOTATION_SIZE = 10;


export default class MapComponent extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon={require('../Assets/redemption.png')} size={20}/>,
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

  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1}}>
        <MapboxGL.MapView
          styleURL={this.state.styleURL}
          style={{flex: 1}}
        >
          <MapboxGL.Camera followZoomLevel={12} followUserLocation />
          {/*ref={c => (this._map = c)}*/}
          {/*centerCoordinate={this.state.coordinates[0]}*/}
          {/*showUserLocation={true}*/}
          {/*zoomLevel={12}*/}
          {/*userTrackingMode={MapboxGL.UserTrackingModes.Follow}*/}
          {/*styleURL={this.state.styleURL}*/}
          {/*style={{flex: 1}}*/}
          {/*onDidFinishLoadingMap={this.onDidFinishLoadingMap}*/}
          {/*onRegionWillChange={this.onRegionWillChange}*/}
          {/*onRegionDidChange={this.onRegionDidChange}*/}
          {/*onRegionIsChanging={this.onRegionIsChanging}*/}
        {/*>*/}
          {/*<View style={{ flex: 1, alignItems : 'center', justifyContent: 'center' }}>*/}
            {/*<TouchableOpacity onPress={this.onClick} style={{width: 400, height: 100, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center'}}>*/}
              {/*<Text>Press me</Text>*/}
            {/*</TouchableOpacity>*/}
            {/*{this.state.showBox ? <View style={{width: 20, height: 20, backgroundColor: 'black' }}/> : <></>}*/}
          {/*</View>*/}
          {/*<Modalize ref={this.child}>*/}

          {/*</Modalize>*/}
        </MapboxGL.MapView>
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

{ /* <View style={Styles.whiteBox}> */ }
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
