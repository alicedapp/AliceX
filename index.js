/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import EmbeddedView from './EmbeddedView';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('EmbeddedView', () => EmbeddedView);
