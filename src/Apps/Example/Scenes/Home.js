import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

// components
import MapHeader from '../Examples/common/MapHeader';

// Styles
import sheet from '../Styles/sheet';
import colors from '../Styles/colors';

// Examples
import ShowMap from '../Examples/ShowMap';
import SetPitch from '../Examples/SetPitch';
import SetHeading from '../Examples/SetHeading';
import ShowClick from '../Examples/ShowClick';
import FlyTo from '../Examples/FlyTo';
import FitBounds from '../Examples/FitBounds';
import SetUserTrackingModes from '../Examples/SetUserTrackingModes';
import SetUserLocationVerticalAlignment from '../Examples/SetUserLocationVerticalAlignment';
import ShowRegionDidChange from '../Examples/ShowRegionDidChange';
import CustomIcon from '../Examples/CustomIcon';
import YoYo from '../Examples/YoYo';
import EarthQuakes from '../Examples/EarthQuakes';
import GeoJSONSource from '../Examples/GeoJSONSource';
import WatercolorRasterTiles from '../Examples/WatercolorRasterTiles';
import TwoByTwo from '../Examples/TwoByTwo';
import IndoorBuilding from '../Examples/IndoorBuilding';
import QueryAtPoint from '../Examples/QueryAtPoint';
import QueryWithRect from '../Examples/QueryWithRect';
import ShapeSourceIcon from '../Examples/ShapeSourceIcon';
import CustomVectorSource from '../Examples/CustomVectorSource';
import ShowPointAnnotation from '../Examples/ShowPointAnnotation';
import CreateOfflineRegion from '../Examples/CreateOfflineRegion';
import DriveTheLine from '../Examples/DriveTheLine';
import ImageOverlay from '../Examples/ImageOverlay';
import DataDrivenCircleColors from '../Examples/DataDrivenCircleColors';
import ChoroplethLayerByZoomLevel from '../Examples/ChoroplethLayerByZoomLevel';
import PointInMapView from '../Examples/PointInMapView';
import TakeSnapshot from '../Examples/TakeSnapshot';
import TakeSnapshotWithMap from '../Examples/TakeSnapshotWithMap';
import GetZoom from '../Examples/GetZoom';
import GetCenter from '../Examples/GetCenter';
import UserLocationChange from '../Examples/UserLocationChange';
import Heatmap from '../Examples/Heatmap';
import {NavigationBar} from "../../../AliceCore/Components/NavigationBar";

const styles = StyleSheet.create({
  header: {
    marginTop: 48,
    fontSize: 24,
    textAlign: 'center',
  },
  exampleList: {
    flex: 1,
  },
  exampleListItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  exampleListItem: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exampleListLabel: {
    fontSize: 18,
  },
  exampleBackground: {
    flex: 1,
    backgroundColor: colors.primary.pinkFaint,
  },
});

class ExampleItem {
  constructor(label, Component) {
    this.label = label;
    this.Component = Component;
  }
}

const Examples = [
  new ExampleItem('Show Map', ShowMap),
  new ExampleItem('Set Pitch', SetPitch),
  new ExampleItem('Set Heading', SetHeading),
  new ExampleItem('Show Click', ShowClick),
  new ExampleItem('Fly To', FlyTo),
  new ExampleItem('Fit Bounds', FitBounds),
  new ExampleItem('Set User Tracking Modes', SetUserTrackingModes),
  new ExampleItem(
    'Set User Location Vertical Alignment',
    SetUserLocationVerticalAlignment,
  ),
  new ExampleItem('Show Region Did Change', ShowRegionDidChange),
  new ExampleItem('Custom Icon', CustomIcon),
  new ExampleItem('Yo Yo Camera', YoYo),
  new ExampleItem('Clustering Earthquakes', EarthQuakes),
  new ExampleItem('GeoJSON Source', GeoJSONSource),
  new ExampleItem('Watercolor Raster Tiles', WatercolorRasterTiles),
  new ExampleItem('Two Map Views', TwoByTwo),
  new ExampleItem('Indoor Building Map', IndoorBuilding),
  new ExampleItem('Query Feature Point', QueryAtPoint),
  new ExampleItem('Query Features Bounding Box', QueryWithRect),
  new ExampleItem('Shape Source From Icon', ShapeSourceIcon),
  new ExampleItem('Custom Vector Source', CustomVectorSource),
  new ExampleItem('Show Point Annotation', ShowPointAnnotation),
  new ExampleItem('Create Offline Region', CreateOfflineRegion),
  new ExampleItem('Animation Along a Line', DriveTheLine),
  new ExampleItem('Image Overlay', ImageOverlay),
  new ExampleItem('Data Driven Circle Colors', DataDrivenCircleColors),
  new ExampleItem('Choropleth Layer By Zoom Level', ChoroplethLayerByZoomLevel),
  new ExampleItem('Get Pixel Point in MapView', PointInMapView),
  new ExampleItem('Take Snapshot Without Map', TakeSnapshot),
  new ExampleItem('Take Snapshot With Map', TakeSnapshotWithMap),
  new ExampleItem('Get Current Zoom', GetZoom),
  new ExampleItem('Get Center', GetCenter),
  new ExampleItem('User Location Updates', UserLocationChange),
  new ExampleItem('Heatmap', Heatmap),
];

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null
    }
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  onExamplePress(activeExamplePosition) {
    this.props.navigation.navigate('Demo', Examples[activeExamplePosition]);
  }

  renderItem({item, index}) {
    return (
      <View style={styles.exampleListItemBorder}>
        <TouchableOpacity onPress={() => this.onExamplePress(index)}>
          <View style={styles.exampleListItem}>
            <Text style={styles.exampleListLabel}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={sheet.matchParent}>
        <NavigationBar/>
        <MapHeader label="React Native Mapbox GL" />

        <View style={sheet.matchParent}>
          <FlatList
            style={styles.exampleList}
            data={Examples}
            keyExtractor={item => item.label}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

export default Home;
