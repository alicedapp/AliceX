import React from 'react';
import {
  Animated, Dimensions, Image,
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { decodeGeoHash, onSortOptions, SF_OFFICE_COORDINATE } from '../../Foam/utils';
import {NavigationBar} from "../../../AliceCore/Components/NavigationBar";
import Modalize from "../Components/Modalize";
import moment from "moment";
import Countdown from "../Components/Countdown";
import FirebaseService from "../Services/FirebaseService";
import { Wallet } from "../../../AliceSDK/Web3";
import WizardCard from '../Components/WizardCard';

const ANNOTATION_SIZE = 10;
const isValidCoordinate = geometry => {
  if (!geometry) {
    return false;
  }
  return geometry.coordinates[0] !== 0 && geometry.coordinates[1] !== 0;
};

const { height, width } = Dimensions.get('window');

export default class CheezeMap extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null,
      tabBarVisible: false,
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

    this.modalRef = React.createRef();
    this.poiModal = React.createRef();

    this.state = {
      styleURL: this._mapOptions[0].data,
      swLng: '',
      swLat: '',
      neLng: '',
      neLat: '',
      activeAnnotationIndex: -1,
      previousActiveAnnotationIndex: -1,
      finishedRendering: false,
      backgroundColor: 'blue',
      coordinates: [-69.975482, 41.865860],
      pois: null,
      signals: null,
      selectedPoint: null,
      showPOIModal: false,
      selectedPOITitle: 'Title',
      selectedPOIStake: 'Stake',
      selectedPOIColor: '#FFF',
      modalHeight: 350,
      poiDescription: {},
      selectedSignal: {},
      selectedPOIStatus: '',
      selectedPOIStatusColor: 'white',
      notificationRendered: false,
      renderPOI: true,
      onlineWizards: null
    };

  }

  async componentDidMount() {
    const getCoords = (pos) => {
      const {latitude, longitude} = pos.coords;
      this.setState({coordinates: [parseFloat(longitude.toPrecision(6)), parseFloat(latitude.toPrecision(6))]})
    };
    navigator.geolocation.getCurrentPosition(getCoords, console.error, {enableHighAccuracy: false, timeout: 500});
    MapboxGL.locationManager.start();
    setTimeout(() => this.setState({coordinates: [151.235588, -33.897822]}), 2000);
    try {
      this.fetchOnlineWizards();
    } catch(e) {
      console.log("WIZARD SCREEN ERROR: ", e);
    }

  }

  _refresh = () => {
    this.fetchOnlineWizards();
  };

  fetchOnlineWizards = async () => {
    const onlineWizards = await FirebaseService.getOnlineWizards((await Wallet.getNetwork()).name.toLowerCase());
    console.log('ONLINE WIZARDS: ', onlineWizards);
    this.setState({onlineWizards, fetching: false});
  };

  onPress = (feature) => {
    const coords = feature.geometry.coordinates
    console.log('COORDS: ', coords);
    const coordinate = [parseFloat(coords[0].toPrecision(6)), parseFloat(coords[1].toPrecision(6))];
    console.log('COORDS: ', coordinate)
    this.setState({ selectedPoint: coordinate, coordinates: coordinate, renderPOI: false });
    const modal = this.modalRef.current;
    if (modal) {
      modal.openModal();
    }
  };


  onDidFinishLoadingMap = () => {
    setTimeout(() => this.setState({ finishedRendering: true }), 500);
  };

  onAnnotationSelected = (activeIndex, feature, listingHash, poi) => {
    this.setState({poiDescription: {loading: true}});


    if (this.state.activeIndex === activeIndex) {
      return;
    }

    this._scaleIn = new Animated.Value(0.6);
    Animated.timing(this._scaleIn, { toValue: 1.0, duration: 200 }).start();
    this.setState({ activeAnnotationIndex: activeIndex, selected: true, renderPOI: true  });
  };

  closeModal = () => {

    this.setState({showPOIModal: false})
  };

  onRegionWillChange = (regionFeature) => {

    this.setState({ reason: 'will change', regionFeature }, () => {
      this.setBounds();
    })
  };

  onRegionDidChange = (regionFeature) => {
    this.setState({ reason: 'did change', regionFeature }, () => {
      this.setBounds();
    });
  };

  setBounds = () => {

    const { geometry, properties } = this.state.regionFeature;
    const [neLng, neLat] = properties.visibleBounds[0];
    const [swLng, swLat] = properties.visibleBounds[1];
    this.setState({
      neLat: neLat.toPrecision(6), neLng: neLng.toPrecision(6), swLat: swLat.toPrecision(6), swLng: swLng.toPrecision(6),
    });
  };

  scrollToTop = () => {
    if (this.modal.current) {
      this.modal.current.scrollTo({
        y: 0,
        animated: true,
      });
    }
  };

  renderOnlineWizards() {
    let items = [];
    for (let i = 0; i < this.state.onlineWizards.length; i++) {
      const coordinate = [ 151.235588, -33.897822];
      const title = "CHEEEZEEE";
      const onlineWizard = this.state.onlineWizards[i];
      const id = i+"1";
      items.push(
        <MapboxGL.PointAnnotation
          key={id}
          id={id}
          coordinate={coordinate}
          title={title}
        >
          <TouchableOpacity style={{marginVertical: 10}} key={i} onPress={() => this.startDuel(this.state.wizard, onlineWizard)}>
            <WizardCard style={{height: width - 150, width: width-230}} wizard={onlineWizard}/>
          </TouchableOpacity>
          {/*<MapboxGL.Callout title="This is a sample"/>*/}
        </MapboxGL.PointAnnotation>,
      );
    }
    return items;
  }


  render() {
    const { navigation } = this.props;
    console.log('STATE COORDS: ', this.state.coordinates)
    return (
      <View style={{flex: 1}}>
        <NavigationBar/>
        <MapboxGL.MapView
          ref={c => (this._map = c)}
          onPress={this.onPress}
          showUserLocation={true}
          userTrackingMode={1}
          styleURL={'mapbox://styles/markpereir/cjz2mknyj0vke1cmzo00bs951'}
          style={{flex: 1}}
          onDidFinishLoadingMap={this.onDidFinishLoadingMap}
          onRegionWillChange={this.onRegionWillChange}
          onRegionDidChange={this.onRegionDidChange}
          onRegionIsChanging={this.onRegionIsChanging}
        >
          <MapboxGL.Camera
            zoomLevel={12}
            centerCoordinate={this.state.coordinates}
          />
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 30}}>
            <View style={{height: 50, marginTop: 40, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
              <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>CHEEZYVERSE</Text>
            </View>
          </View>
          {this.state.onlineWizards && this.renderOnlineWizards()}
        </MapboxGL.MapView>
      </View>
    );
  }
}

const styled = {
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

const MapBoxStyles = StyleSheet.create({
  tip: {
    backgroundColor: 'black',
  },
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
    flexDirection: 'row',
    alignItems: 'center',
    flex: 5,
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

  tokenAmount: {
    flexDirection: 'row',
  },
  descriptionButton: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 25,
    borderRadius: 50/2,
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
  registerButton: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 25,
    borderRadius: 50/2,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },

  modal: {
    margin: 0,
  },
  modalBox: {
    width,
    backgroundColor: 'white',
    borderRadius: 25,
    position: 'absolute',
    bottom: 0
  },
  innerModalBox: {
    margin: 20,
  },
  modal__header: {
    paddingVertical: 15,
    marginHorizontal: 15,

    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },

  modal__headerText: {
    fontSize: 15,
    fontWeight: '200',
  },

  content: {
    paddingHorizontal: 15,
  },

  content__row: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 15,

    borderBottomColor: '#f9f9f9',
    borderBottomWidth: 1,
  },

  content__avatar: {
    width: 38,
    height: 38,

    marginRight: 15,

    overflow: 'hidden',

    backgroundColor: '#eee',
    borderRadius: 19,
  },

  content__name: {
    fontSize: 16,
  },

  content__button: {
    alignItems: 'center',
    justifyContent: 'center',

    marginVertical: 20,
  },
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
