import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';

import config from './Utils/config';

const clientOptions = {accessToken: 'pk.eyJ1IjoibWFya3BlcmVpciIsImEiOiJjancwNDg4eWswNzk1NGJ0Z3V5OGtxZWltIn0.gZ7ev6fQETAFa4J9kao10w'};
const directionsClient = MapboxDirectionsFactory(clientOptions);

export {directionsClient};
