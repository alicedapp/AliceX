import { Platform } from 'react-native';

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

export const decodeGeoHash = (geohash) => {
  function refine_interval(interval, cd, mask) {
    if (cd & mask) {
      interval[0] = (interval[0] + interval[1]) / 2;
    } else {
      interval[1] = (interval[0] + interval[1]) / 2;
    }
  }

  const BITS = [16, 8, 4, 2, 1];
  const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';
  let is_even = 1;
  const lat = [];
  const lon = [];
  lat[0] = -90.0;
  lat[1] = 90.0;
  lon[0] = -180.0;
  lon[1] = 180.0;
  let lat_err = 90.0;
  let lon_err = 180.0;
  for (let i = 0; i < geohash.length; i++) {
    const c = geohash[i];
    const cd = BASE32.indexOf(c);
    for (let j = 0; j < 5; j++) {
      const mask = BITS[j];
      if (is_even) {
        lon_err /= 2;
        refine_interval(lon, cd, mask);
      } else {
        lat_err /= 2;
        refine_interval(lat, cd, mask);
      }
      is_even = !is_even;
    }
  }
  lat[2] = (lat[0] + lat[1]) / 2;
  lon[2] = (lon[0] + lon[1]) / 2;
  return { latitude: lat, longitude: lon };
};


export const challengedPOI = {
  "name":"Cape Cod National Seashore Visitor Center",
  "stake":"0x0",
  "address":"400 Nauset Road, Eastham, Massachusetts 02642, United States",
  "longitude":-69.97270938009024,
  "latitude":41.8372811190784,
  "description":"National Park Office and National Seashore Museum with trailheads leading to the marshlands of the national seashore.  ",
  "tags":["Government", "Attraction"],
  "phone":"(508) 255-3421",
  "web":"nps.gov",
  "owner":"0x09527e337f3cccc1bd688037a66b8516b319e31d",
  "loading":false
};
