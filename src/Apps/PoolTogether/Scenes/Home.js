import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

// components
import MapHeader from '../MapExamples/common/MapHeader';

// Styles
import sheet from '../Styles/sheet';
import colors from '../Styles/colors';

// MapExamples
import ShowMap from '../MapExamples/ShowMap';
import SetPitch from '../MapExamples/SetPitch';
import SetHeading from '../MapExamples/SetHeading';
import ShowClick from '../MapExamples/ShowClick';
import FlyTo from '../MapExamples/FlyTo';
import FitBounds from '../MapExamples/FitBounds';
import SetUserTrackingModes from '../MapExamples/SetUserTrackingModes';
import SetUserLocationVerticalAlignment from '../MapExamples/SetUserLocationVerticalAlignment';
import ShowRegionDidChange from '../MapExamples/ShowRegionDidChange';
import CustomIcon from '../MapExamples/CustomIcon';
import YoYo from '../MapExamples/YoYo';
import EarthQuakes from '../MapExamples/EarthQuakes';
import GeoJSONSource from '../MapExamples/GeoJSONSource';
import WatercolorRasterTiles from '../MapExamples/WatercolorRasterTiles';
import TwoByTwo from '../MapExamples/TwoByTwo';
import IndoorBuilding from '../MapExamples/IndoorBuilding';
import QueryAtPoint from '../MapExamples/QueryAtPoint';
import QueryWithRect from '../MapExamples/QueryWithRect';
import ShapeSourceIcon from '../MapExamples/ShapeSourceIcon';
import CustomVectorSource from '../MapExamples/CustomVectorSource';
import ShowPointAnnotation from '../MapExamples/ShowPointAnnotation';
import CreateOfflineRegion from '../MapExamples/CreateOfflineRegion';
import DriveTheLine from '../MapExamples/DriveTheLine';
import ImageOverlay from '../MapExamples/ImageOverlay';
import DataDrivenCircleColors from '../MapExamples/DataDrivenCircleColors';
import ChoroplethLayerByZoomLevel from '../MapExamples/ChoroplethLayerByZoomLevel';
import PointInMapView from '../MapExamples/PointInMapView';
import TakeSnapshot from '../MapExamples/TakeSnapshot';
import TakeSnapshotWithMap from '../MapExamples/TakeSnapshotWithMap';
import GetZoom from '../MapExamples/GetZoom';
import GetCenter from '../MapExamples/GetCenter';
import UserLocationChange from '../MapExamples/UserLocationChange';
import Heatmap from '../MapExamples/Heatmap';
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
