/**
 * @format
 */

if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest ?
    global.originalXMLHttpRequest :
    global.XMLHttpRequest;
  global.FormData = global.originalFormData ?
    global.originalFormData :
    global.FormData;
  global.Blob = global.originalBlob ?
    global.originalBlob :
    global.Blob;
  global.FileReader = global.originalFileReader ?
    global.originalFileReader :
    global.FileReader;
}

console.disableYellowBox = true;

import {AppRegistry} from 'react-native';
import App from './App';
import EmbeddedView from './EmbeddedView';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('EmbeddedView', () => EmbeddedView);
