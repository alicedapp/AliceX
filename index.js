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

import {AppRegistry, Alert} from 'react-native';
import App from './App';
import EmbeddedView from './EmbeddedView';
import {name as appName} from './app.json';
import {Navigation} from "./src/AliceSDK/Navigation";
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';

const exceptionhandler = (error, isFatal) => {
  Navigation.goHome();
  Alert.alert(
    'App Crashed',
    error,
    [
      {text: 'OK'},
    ],
  );
};

setNativeExceptionHandler(exceptionhandler);
setJSExceptionHandler(exceptionhandler);

AppRegistry.registerComponent('EmbeddedView', () => EmbeddedView);
AppRegistry.registerComponent(appName, () => App);
