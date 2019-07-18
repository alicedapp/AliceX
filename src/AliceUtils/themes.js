// @flow
import { Platform, Dimensions } from 'react-native';

// ==============================
// APP STYLE CONSTANTS
// ==============================

// color
const color = {
  textGrey: '#a7a1a0',
  green: '#03c845',
  darkGrey: '#eae9e2',
  lightGrey: '#f8f7f2',
  yellow: '#FFFF00',
  magenta: '#FF00EC',
  blue: '#17DAD9',
  component: 'white',
  bg: '#1D1D1D',
  bg_text: '#FFFFFF',
  bg_text_sec: '#B4B5B0',
  bg_positive: '#72E762',
  bg_warning: '#FAE265',
  bg_alert: '#ED332B',
  bg_text_positive: '#72E762',
  card_bg: '#F9F9F9',
  card_text: '#1A1A1A',
  card_bg_text_sec: '#B4B5B0'
};

// font sizes
const fontSize = {
  xsmall: 12,
  small: 14,
  default: 17,
  large: 24,
  xlarge: 32,
};



// text styles
const text = {
  greySmall: {
    fontFamily: 'DIN Condensed',
    color: color.textGrey,
    fontSize: 10,
  },
  greyMedium: {
    fontFamily: 'DIN Condensed',
    color: color.textGrey,
  },
  blackSmall: {
    fontFamily: 'DIN Condensed',
    color: 'black',
    fontSize: 10,
  },
  blackMedium: {
    fontFamily: 'DIN Condensed',
    color: 'black',
  },
};

// Component Specific
// ------------------------------

// navbar
const navbar = {
  backgroundColor: 'white',
  buttonColor: color.blue,
  height: Platform.OS === 'ios' ? 64 : 44,
  textColor: color.text,
};

// list header
const listheader = {
  height: 34,
};

// next up
const nextup = {
  height: Platform.OS === 'ios' ? 70 : 110,
};

const statusBarHeight = Platform.OS === 'ios' ? 20 : 24;
const talkPaneAndroidMinScrollAreaHeight = Dimensions.get('window').height - 48;

export {
  color,
  fontSize,
  text,
  navbar,
  nextup,
  listheader,
  talkPaneAndroidMinScrollAreaHeight,
};
