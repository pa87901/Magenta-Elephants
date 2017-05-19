/**
 * React Native for Web Starter App
 * Follow me https://twitter.com/grabthecode
 */

import { AppRegistry } from 'react-native';
import App from './app';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('react-root')
});
