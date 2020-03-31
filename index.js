/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './src';
import appName from './app.json';

// 生产环境
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  }
}

AppRegistry.registerComponent(appName[Platform.OS].name, () => App);
