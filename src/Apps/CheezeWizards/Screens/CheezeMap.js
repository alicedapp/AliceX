import React from 'react';
import {Alert, View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Modal from '../Components/Modal'
import {onSortOptions} from '../Utils/index';
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import Button from '../Components/Button'
import wzrd1Icon from "../Assets/wzrd-1.png";
import wzrd2Icon from "../Assets/wzrd-2.png";

const { height, width } = Dimensions.get('window');

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const wzrd1 = {
  icon: {
    iconImage: "../Assets/wzrd-1.png",
    iconAllowOverlap: true,
  },
};

const wzrd2 = {
  icon: {
    iconImage: "../Assets/wzrd-2.png",
    iconAllowOverlap: true,
  },
};

const wzrd3 = {
  icon: {
    iconImage: "../Assets/wzrd-3.png",
    iconAllowOverlap: true,
  },
};

const wzrd4 = {
  icon: {
    iconImage: "../Assets/wzrd-4.png",
    iconAllowOverlap: true,
  },
};

const wzrd5 = {
  icon: {
    iconImage: "../Assets/wzrd-5.png",
    iconAllowOverlap: true,
  },
};

const featureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: '12340',
      properties: {
        icon: "../Assets/wzrd-1.png",
      },
      geometry: {
        type: 'Point',
        coordinates: [151.227028, -33.882250],
      },
    },
    {
      type: 'Feature',
      id: '12341',
      properties: {
        icon: "../Assets/wzrd-2.png",
      },
      geometry: {
        type: 'Point',
        coordinates: [ 151.221550, -33.910745],
      },
    },
    {
      type: 'Feature',
      id: '12342',
      properties: {
        icon: "../Assets/wzrd-3.png",
      },
      geometry: {
        type: 'Point',
        coordinates: [151.259662, -33.910013],
      },
    },
    {
      type: 'Feature',
      id: '12343',
      properties: {
        icon: "../Assets/wzrd-4.png",
      },
      geometry: {
        type: 'Point',
        coordinates: [151.279411,   -33.856762],
      },
    },
    {
      type: 'Feature',
      id: '12344',
      properties: {
        icon: {
          iconImage: "../Assets/wzrd-5.png",
          iconAllowOverlap: true,
        },
      },
      geometry: {
        type: 'Point',
        coordinates: [151.235588, -33.897822],
      },
    },
  ],
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
      featureCollection: MapboxGL.geoUtils.makeFeatureCollection(featureCollection.features),
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
  };

  onSourceLayerPress = (e) => {
    const feature = e.nativeEvent.payload;
    console.log('You pressed a layer here is your feature', feature); // eslint-disable-line
  }

  componentDidMount() {
    MapboxGL.locationManager.start();
    setTimeout(() => this.setState({coordinates: [151.235588, -33.897822]}), 2000);
  }

  componentWillUnmount() {
    MapboxGL.locationManager.dispose();
  }

  toggleModal = () => {
    ReactNativeHapticFeedback.trigger("selection", options);
    this.setState({modalVisible: !this.state.modalVisible})
  };

  onUserMarkerPress = () => {
    Alert.alert('You pressed on the user location annotation');
  };

  onMapChange = (index, styleURL) => {
    this.setState({styleURL});
  }


  render() {
    return (
      <MapboxGL.MapView
        styleURL={'mapbox://styles/markpereir/cjz2mknyj0vke1cmzo00bs951'}
        onPress={this.onPress}
        style={{flex: 1,}}
      >
        <MapboxGL.Camera followZoomLevel={12} followUserLocation />
        <NavigationBar/>
        <MapboxGL.ShapeSource
          id="exampleShapeSource"
          shape={featureCollection}
        >
          {/*<MapboxGL.SymbolLayer id={'12340'} style={{ iconSize: 1, iconImage: wzrd1Icon  }} />*/}
          <MapboxGL.SymbolLayer id={'12341'} style={{ iconSize: 1, iconImage: wzrd2Icon  }} />
        </MapboxGL.ShapeSource>
        <MapboxGL.UserLocation onPress={this.onUserMarkerPress} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 30}}>
          <View style={{height: 50, marginTop: 40, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
            <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>CHEEZYVERSE</Text>
          </View>
          <Modal isVisible={this.state.modalVisible} backdropOpacity={0.3} onBackdropPress={this.toggleModal} style={{alignSelf: 'center', paddingTop: 200}}>
            <View style={{height: width - 10, width: width-80, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'black', ...styles.sharpShadow}}>
              <Image source={require('../Assets/tournament.png')} style={{
                height: width - 11,
                width: width - 81,
                resizeMode: 'contain',
              }}/>
            </View>
            <Button onPress={this.toggleModal} style={{flex: 1}}>
              <View style={{ height: 50, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
                <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>New Tournament</Text>
              </View>
            </Button>
          </Modal>
        </View>
      </MapboxGL.MapView>
    );
  }
}

export default CheezeMap;

const styles = StyleSheet.create({
  sharpShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 0,
    shadowOpacity: 1,

  }
});
