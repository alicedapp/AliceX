import React from 'react';
import { Alert, View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from "react-native";
import MapboxGL from '@react-native-mapbox-gl/maps';
import {onSortOptions} from '../Utils/index';
import wzrd2Icon from "../Assets/wzrd-2-1.png";
import db from "../../../AliceSDK/Socket";
import FirebaseService from "../Services/Firebase/FirebaseService";
import { Wallet } from "../../../AliceSDK/Web3";
import WizardCard from "../Components/WizardCard";
const ANNOTATION_SIZE = 10;

const { height, width } = Dimensions.get('window');

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const wzrd1 = {
  icon: {
    iconImage: "../Assets/wzrd-1-1-1.png",
    iconAllowOverlap: true,
  },
};

const wzrd2 = {
  icon: {
    iconImage: "../Assets/wzrd-2-1.png",
    iconAllowOverlap: true,
  },
};

const wzrd3 = {
  icon: {
    iconImage: "../Assets/wzrd-3-1.png",
    iconAllowOverlap: true,
  },
};

const wzrd4 = {
  icon: {
    iconImage: "../Assets/wzrd-4-1.png",
    iconAllowOverlap: true,
  },
};

const wzrd5 = {
  icon: {
    iconImage: "../Assets/wzrd-2-2.png",
    iconAllowOverlap: true,
  },
};


const layerStyles = {
  singlePoint: {
    iconImage: wzrd2Icon,
    iconAllowOverlap: true,
    iconSize: 0.5

  },
}

// const iconStyle = {
//   icon: {
//     iconImage: 'wizard',
//     iconSize: 0.5
//   },
// };

const iconStyle = {
  icon:  {
    // iconImage: 'wizard1',
    // iconImage: 'wizard2',
    // iconImage: 'wizard3',
    // iconImage: 'wizard4',
    // iconImage: 'wizard5',
    iconImage: 'mold1',
    // iconImage: 'mold2',
    iconSize: 0.5
  },
};


const featureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: '12340',
      icon: {
        iconImage: 'example',
        iconSize: 0.5
      },
      properties: {
        icon: {
          iconImage: 'example',
          iconSize: 0.5
        },
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
        icon: {
          iconImage: 'wizard',
          iconSize: 0.5
        },
      },
      geometry: {
        type: 'Point',
        coordinates: [ 151.221550, -33.910745],
      },
    },

  ],
};



class CheezeMap extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null,
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
    console.log('FEAT: ', MapboxGL.geoUtils.addToFeatureCollection(
      this.state.featureCollection,
      feature,
    )).toString();
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

  async componentDidMount() {
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
  };

  startDuel = async (myWizard, challengedWizard) => {
    console.log('CHAllenged wizard: ', challengedWizard)
    this.props.navigation.navigate('CheezeWizards/Duel', {wizard: myWizard, challengedWizard});
    myWizard.challengeId = '_' + Math.random().toString(36).substr(2, 9);
    db.collection("users").doc(challengedWizard.owner).set(myWizard);
  };

  renderOnlineWizards() {
    let items = [];
    for (let i = 0; i < this.state.onlineWizards.length; i++) {
      const coordinate = [37.80, -122.41];
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
          <View style={[styles.annotationContainer]}/>
          {/*<WizardCard style={{height: width - 150, width: width-230}} wizard={onlineWizard}/>*/}
          {/*<MapboxGL.Callout title="This is a sample"/>*/}
        </MapboxGL.PointAnnotation>,
      );
    }
    return items;
  }

  render() {
    return (
      <MapboxGL.MapView
        styleURL={'mapbox://styles/markpereir/cjz2mknyj0vke1cmzo00bs951'}
        onPress={this.onPress}
        style={{flex: 1,}}
      >
               <MapboxGL.Camera followZoomLevel={12} followUserLocation />
        <MapboxGL.UserLocation onPress={this.onUserMarkerPress} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 30}}>
          <View style={{height: 50, marginTop: 40, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', ...styles.sharpShadow}}>
            <Text style={{fontSize: 20, fontFamily: 'Exocet'}}>CHEEZYVERSE</Text>
          </View>
        </View>
        {this.state.onlineWizards && this.renderOnlineWizards()}

      </MapboxGL.MapView>
    );
  }
}

export default CheezeMap;

const styles = StyleSheet.create({
  annotationContainer: {
    width: ANNOTATION_SIZE,
    height: ANNOTATION_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ANNOTATION_SIZE / 2,
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
