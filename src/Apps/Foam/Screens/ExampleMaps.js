import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import MapHeader from '../Components/common/MapHeader';
// Styles
import sheet from '../styles/sheet';
import colors from '../styles/colors';
// Utils
import {IS_ANDROID} from '../utils/index';
// Examples
import ShowMap from '../Components/ShowMap';
import SetPitch from '../Components/SetPitch';
import SetBearing from '../Components/SetBearing';
import ShowClick from '../Components/ShowClick';
import FlyTo from '../Components/FlyTo';
import FitBounds from '../Components/FitBounds';
import SetUserTrackingModes from '../Components/SetUserTrackingModes';
import SetUserLocationVerticalAlignment from '../Components/SetUserLocationVerticalAlignment';
import ShowRegionChange from '../Components/ShowRegionChange';
import CustomIcon from '../Components/CustomIcon';
import YoYo from '../Components/YoYo';
import EarthQuakes from '../Components/EarthQuakes';
import GeoJSONSource from '../Components/GeoJSONSource';
import WatercolorRasterTiles from '../Components/WatercolorRasterTiles';
import TwoByTwo from '../Components/TwoByTwo';
import IndoorBuilding from '../Components/IndoorBuilding';
import QueryAtPoint from '../Components/QueryAtPoint';
import QueryWithRect from '../Components/QueryWithRect';
import ShapeSourceIcon from '../Components/ShapeSourceIcon';
import CustomVectorSource from '../Components/CustomVectorSource';
import ShowPointAnnotation from '../Components/ShowPointAnnotation';
import CreateOfflineRegion from '../Components/CreateOfflineRegion';
import DriveTheLine from '../Components/DriveTheLine';
import ImageOverlay from '../Components/ImageOverlay';
import DataDrivenCircleColors from '../Components/DataDrivenCircleColors';
import ChoroplethLayerByZoomLevel from '../Components/ChoroplethLayerByZoomLevel';
import PointInMapView from '../Components/PointInMapView';
import TakeSnapshot from '../Components/TakeSnapshot';
import TakeSnapshotWithMap from '../Components/TakeSnapshotWithMap';
import GetZoom from '../Components/GetZoom';
import GetCenter from '../Components/GetCenter';
import UserLocationChange from '../Components/UserLocationChange';

const styles = StyleSheet.create({
  noPermissionsText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: colors.secondary.white,
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
  new ExampleItem('Set Bearing', SetBearing),
  new ExampleItem('Show Click', ShowClick),
  new ExampleItem('Fly To', FlyTo),
  new ExampleItem('Fit Bounds', FitBounds),
  new ExampleItem('Set User Tracking Modes', SetUserTrackingModes),
  new ExampleItem(
    'Set User Location Vertical Alignment',
    SetUserLocationVerticalAlignment,
  ),
  new ExampleItem('Show Region Change', ShowRegionChange),
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
];

class ExampleMaps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetchingAndroidPermission: IS_ANDROID,
      isAndroidPermissionGranted: false,
      activeExample: -1,
    };

    this.renderItem = this.renderItem.bind(this);
    this.onCloseExample = this.onCloseExample.bind(this);
  }

  async componentWillMount() {
    if (IS_ANDROID) {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      this.setState({
        isAndroidPermissionGranted: isGranted,
        isFetchingAndroidPermission: false,
      });
    }
  }

  getActiveItem() {
    if (
      this.state.activeExample < 0 ||
      this.state.activeExample >= Examples.length
    ) {
      return null;
    }
    return Examples[this.state.activeExample];
  }

  onExamplePress(activeExamplePosition) {
    this.setState({activeExample: activeExamplePosition});
  }

  onCloseExample() {
    this.setState({activeExample: -1});
  }

  renderItem({item, index}) {
    return (
      <View style={styles.exampleListItemBorder}>
        <TouchableOpacity onPress={() => this.onExamplePress(index)}>
          <View style={styles.exampleListItem}>
            <Text style={styles.exampleListLabel}>{item.label}</Text>
            <Text>></Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderActiveExample() {
    const item = this.getActiveItem();

    const modalProps = {
      visible: !!item,
      transparent: true,
      animationType: 'slide',
      onRequestClose: this.onCloseExample,
    };

    return (
      <Modal {...modalProps}>
        <SafeAreaView
          style={[sheet.matchParent, {backgroundColor: colors.primary.pink}]}
          forceInset={{top: 'always'}}
        >
          <View style={styles.exampleBackground}>
            {modalProps.visible ? (
              <item.Component
                key={item.label}
                label={item.label}
                onDismissExample={this.onCloseExample}
              />
            ) : null}
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  render() {
    if (IS_ANDROID && !this.state.isAndroidPermissionGranted) {
      if (this.state.isFetchingAndroidPermission) {
        return null;
      }
      return (
        <SafeAreaView
          style={[sheet.matchParent, {backgroundColor: colors.primary.blue}]}
          forceInset={{top: 'always'}}
        >
          <View style={sheet.matchParent}>
            <Text style={styles.noPermissionsText}>
              You need to accept location permissions in order to use this
              example applications
            </Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView
        style={[sheet.matchParent, {backgroundColor: colors.primary.blue}]}
        forceInset={{top: 'always'}}
      >
        <View style={sheet.matchParent}>
          <MapHeader label="React Native Mapbox GL" />

          <View style={sheet.matchParent}>
            <FlatList
              style={styles.exampleList}
              data={Examples}
              keyExtractor={item => item.label}
              renderItem={this.renderItem}
            />
          </View>

          {this.renderActiveExample()}
        </View>
      </SafeAreaView>
    );
  }
}

export default ExampleMaps;
