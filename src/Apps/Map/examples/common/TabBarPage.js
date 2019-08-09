import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {DAOcolors} from "../../../DAOstack/Utils";
import colors from '../../styles/colors';

import BaseExamplePropTypes from './BaseExamplePropTypes';
import Page from './Page';

const TAB_BAR_HEIGHT = 70;

const styles = StyleSheet.create({
  buttonGroup: {
    height: TAB_BAR_HEIGHT,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: colors.secondary.white,
  },
  scrollableButton: {
    paddingHorizontal: 24,
  },
});

const TabBarPageOptionShape = PropTypes.shape({
  label: PropTypes.string,
  data: PropTypes.any,
});

class TabBarPage extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
    scrollable: PropTypes.bool,
    options: PropTypes.arrayOf(TabBarPageOptionShape).isRequired,
    initialIndex: PropTypes.number.isRequired,
    onOptionPress: PropTypes.func,
  };

  static defaultProps = {
    initialIndex: 0,
    scrollable: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: props.initialIndex,
    };

    this.onOptionPress = this.onOptionPress.bind(this);
  }

  onOptionPress(index) {
    this.setState({currentIndex: index});

    if (typeof this.props.onOptionPress === 'function') {
      const option = this.props.options[index];
      this.props.onOptionPress(index, option.data);
    }
  }

  render() {
    const buttonGroupProps = {
      selectedBackgroundColor: colors.primary.grayFaint,
      containerBorderRadius: 0,
      onPress: this.onOptionPress,
      selectedIndex: this.state.currentIndex,
      buttons: this.props.options.map(o => o.label),
      containerStyle: styles.buttonGroup,
    };

    if (this.props.scrollable) {
      buttonGroupProps.buttonStyle = styles.scrollableButton;
    }

    const view = this.props.scrollable ? (<View style={{flexDirection: 'row'}}>
      {DAOcolors.map((obj, i) => {
        return (
          <TouchableOpacity
            onPress={() => this.onOptionPress(i)}
            style={{backgroundColor: obj.backgroundColor, height: 20, width: 20, alignItems: 'center', justifyContent: 'center'}}
          >
            <Text style={{color: obj.color, fontSize: 5}}>{i}</Text>
          </TouchableOpacity>

        )
      })}
      </View>) : (<></>)

    return (
      <Page {...this.props}>
        {this.props.children}
        {view}
      </Page>
    );
  }
}

export default TabBarPage;
