import {Platform} from 'react-native';
export { default as colors } from './colors';

export const IS_ANDROID = Platform.OS === 'android';
export const DEFAULT_CENTER_COORDINATE = [-77.036086, 38.910233];
export const SF_OFFICE_COORDINATE = [-122.400021, 37.789085];

export function onSortOptions(a, b) {
  if (a.label < b.label) {
    return -1;
  }

  if (a.label > b.label) {
    return 1;
  }

  return 0;
}

export const switchcase = cases => key =>
  cases.hasOwnProperty(key) ? cases[key] : undefined;

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const toFixed = (x) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10,e-1);
      x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10,e);
      x += (new Array(e+1)).join('0');
    }
  }
  return x;
};

export const getSalt = () => {
  const min = 1000000000000000000000000000000000000000000000000000000000000000;
  const max = 9999999999999999999999999999999999999999999999999999999999999999;
  return toFixed(getRandomInt(min, max).toString());
};

export const wizardExample = {
  affinity: 4,
  ascending: false,
  ascensionOpponent: 0,
  challengeId: "_2n0d9iqgm",
  commitmentHash: "0x1622b6cf449d957f76ea1d5dcbf71fed069ffa87ec3301458a8da644276eca56",
  currentDuel: "0x0000000000000000000000000000000000000000000000000000000000000000",
  id: "6089",
  maxPower: 112403401767147,
  molded: false,
  moveSet: "0x0203040203000000000000000000000000000000000000000000000000000000",
  nonce: 0,
  otherCommit: "0x1622b6cf449d957f76ea1d5dcbf71fed069ffa87ec3301458a8da644276eca56",
  owner: "0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB",
  power: 112403401767147,
  ready: true,
};
