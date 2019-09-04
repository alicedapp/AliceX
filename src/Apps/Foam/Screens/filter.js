const poi = {
  "state": {
    "status": {
      "listingSince": "2019-02-22T16:23:29Z",
      "type": "listing"
    },
    "createdAt": "2019-02-19T16:23:29Z",
    "deposit": "0x56bc75e2d63100000"
  },
  "listingHash": "0x93b4ccb117b0c5ebbeb68dd48d5c5056cda363ba38dab7ae8fc7625c9f43c5e9",
  "owner": "0x8214e4ab4fd9212b7e14d97cc0bba6b9f4c37feb",
  "geohash": "s14kmjv9y8s6",
  "name": "Tarkwa Bay",
  "tags": [
    "Nightlife",
    "Attraction",
    "Food"
  ]
};

const basicFeature = {
  type: 'Feature',
  id: listingHash,
  properties: {
    icon: yea,
  },
  geometry: {
    type: 'Point',
    coordinates: [151.279411, -33.856762],
  },
};



const signal = {
  "cst": "0x0661a22088f60194c64aeb4ff6dccf0c870b277db95111e17135140a7bbaebdb",
  "createdAt": "2018-12-04T17:24:57Z",
  "radius": "0x3e8",
  "stake": "0x21e19e0c9bab2400000",
  "tokenId": "0x1",
  "owner": "0xab2a19c49ea7422b2889566b96767b67436f582e",
  "geohash": "dr5rs8vrcqm5",
  "nftAddress": "0x36f16a0d35b866cdd0f3c3fa39e2ba8f48b099d2"
};

const {longitude, latitude} = decodeGeoHash(geohash);

const signalToMapbox = {
  "type": "Feature",
  "properties": {
    "ids": `,${cst},`,
    "types": ",geoserve,nearby-cities,origin,phase-data,scitech-link,",
    "title": name,
    "stake": stake,
    "type": type,
    "radius":radius,
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      longitude,
      latitude
    ]
  },
  "id": cst
};
