import React, { Component } from 'react';

import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
  InteractionManager,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';

const DOWN_ARROW = require('../../Widgets/Assets/down-white.png');
const UP_ARROW = require('../../Widgets/Assets/up-white.png');

import PropTypes from 'prop-types';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

class Item extends Component {
  static animated;
  static defaultProps = {
    contentVisible: false,
    backgroundColor: 'transparent',
    titleBackground: 'transparent',
    contentBackground: 'transparent',
    underlineColor: '#d3d3d3',
    visibleImage: UP_ARROW,
    invisibleImage: DOWN_ARROW,
  };

  static propTypes = {
    contentVisible: PropTypes.bool,
    backgroundColor: PropTypes.string,
    titleBackground: PropTypes.string,
    contentBackground: PropTypes.string,
    underlineColor: PropTypes.string,
    visibleImage: PropTypes.any,
    invisibleImage: PropTypes.any,
    image: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      contentVisible: props.contentVisible,
      headerheight: 30,
      contentHeight: 0,
    };
  }

  render() {
    return (
      <Animated.View style={[
        styles.container,
        {
          height: this.animated,
          backgroundColor: 'transparent',
        },
        this.props.style,
      ]}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.onPress}
        >
          <View
            onLayout={ this.onAnimLayout }
          >
            <View style={{...styles.header, backgroundColor: this.props.backgroundColor}}>
                <Image source={this.props.image} style={{resizeMode: 'contain', maxHeight: 20, maxWidth: 140,}}/>
            </View>
            <Image source={
              this.state.contentVisible
                ? this.props.visibleImage
                : this.props.invisibleImage
            } style={styles.icons}/>
          </View>
        </TouchableOpacity>
        <View
          onLayout={this.onLayout}
        >
          <View
            style={[
              styles.contentChild,
            ]}
          >
            { this.props.children }
          </View>
        </View>
      </Animated.View>
    );
  }

  runAnimation = () => {
    const initialValue = this.state.contentVisible
      ? this.state.headerHeight + this.state.contentHeight : this.state.headerHeight;
    const finalValue = this.state.contentVisible
      ? this.state.headerHeight : this.state.contentHeight + this.state.headerHeight;

    this.setState({
      contentVisible: !this.state.contentVisible,
    });

    this.animated.setValue(initialValue);
    Animated.spring(
      this.animated,
      {
        toValue: finalValue,
      },
    ).start();
  }

  onAnimLayout = (evt) => {
    const headerHeight = evt.nativeEvent.layout.height;
    if (!this.state.isMounted && !this.props.contentVisible) {
      this.animated = new Animated.Value(headerHeight);
      this.setState({
        isMounted: true,
        headerHeight,
      });
      return;
    } else if (!this.state.isMounted) {
      InteractionManager.runAfterInteractions(() => {
        this.animated = new Animated.Value(headerHeight + this.state.contentHeight);
      });
    }
    this.setState({ headerHeight, isMounted: true });
  }

  onLayout = (evt) => {
    const contentHeight = evt.nativeEvent.layout.height;
    this.setState({ contentHeight });
  }

  onPress = () => {
    ReactNativeHapticFeedback.trigger("selection", {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false
    });
    this.runAnimation();
  }
}

export default Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  header: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 44
  },
  icons: {
    width: 15,
    height: 15,
    position: 'absolute',
    top: 14,
    right: 16,
    resizeMode: 'contain'
  },
  underline: {
    width: '100%',
    height: 1,
    position: 'absolute',
    top: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contentChild: {
    padding: 12,
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  contentTxt: {
    color: 'black',
    marginLeft: 8,
    fontSize: 12,
  },
  contentFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 12,
  },

});
