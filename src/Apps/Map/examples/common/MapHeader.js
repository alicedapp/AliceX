import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity} from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  label: {
    fontSize: 24,
    color: colors.secondary.white,
  },
  container: {
    borderBottomWidth: 0,
  },
});

class MapHeader extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    statusBarColor: PropTypes.string,
    statusBarTextTheme: PropTypes.string,
    onBack: PropTypes.func,
  };

  static defaultProps = {
    statusBarTextTheme: 'light-content',
    statusBarColor: colors.primary.blueDark,
    backgroundColor: colors.primary.blue,
  };

  render() {
    const statusBarProps = {
      barStyle: this.props.statusBarTextTheme,
      backgroundColor: this.props.statusBarColor,
    };

    return (
      <TouchableOpacity onPress={this.props.onBack}
        style={styles.container}
      />
    );
  }
}

export default MapHeader;
