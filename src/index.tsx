
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Alert, BackHandler, YellowBox, PermissionsAndroid, NativeModules } from 'react-native';
import Loading from './Components/Loading';
import {Provider} from 'react-redux'
import store from './Reducers/'
import Nav from './Containers/Nav'
import { _getItem, _clear } from './Tools/Storage';
import { setUserBase } from './Reducers/User';
import { AppConfig } from './Tools/utils'
import SplashScreen from 'react-native-splash-screen';
var RNFS = require('react-native-fs')

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props {

}
interface updateConfig {
  version: string
  log: string
  link: string
  forceUpdate: boolean
}
export default class App extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  private updateConfig: updateConfig
  componentDidMount () {
    SplashScreen.hide();
    YellowBox.ignoreWarnings([
      'Remote debugger is in a background tab which may cause apps to perform slowly',
      'Require cycle: node_modules/rn-fetch-blob/index.js',
      'Require cycle: node_modules/react-native/Libraries/Network/fetch.js'
    ]);
    this.checkUpdate()
  }
  checkUpdate () {
    fetch('https://dl.vocx.io/voc/update.json')
    .then(response => response.json())
    .then(jsonData => {
      this.updateConfig = jsonData[Platform.OS]
      console.log('this.updateConfig: ', Number(this.updateConfig.version.split('.').join('')), Number(AppConfig.version.split('.').join('')));
      if (Number(this.updateConfig.version.split('.').join('')) > Number(AppConfig.version.split('.').join(''))) {
        this.updateConfirm()
      }
    })
  }
  async checkPermissions () {
    try {
      const permissions = [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]
      const granteds = await PermissionsAndroid.requestMultiple(
        permissions
      );
      if (granteds["android.permission.WRITE_EXTERNAL_STORAGE"] === 'granted' && granteds["android.permission.READ_EXTERNAL_STORAGE"] === 'granted') {
        this.updateAPP()
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  cancelUpdate () {
    // 如果此次更新是修复严重BUG，需要强制更新，而用户拒绝更新，那么就关闭APP
    if (this.updateConfig.forceUpdate) {
      BackHandler.exitApp()
    }
  }
  updateAPP () {
    if (Platform.OS === 'android') {
      console.log('link', this.updateConfig.link);
      // android 更新直接下载并自动安装
      console.warn('更新')
      NativeModules.DownloadApk.downloading(this.updateConfig.link, 'voc.apk');
    }
  }
  updateConfirm () {
    Alert.alert(
      `新版本${this.updateConfig.version}`,
      `${this.updateConfig.log}`,
      [
        { text: '暂不更新', onPress: () => this.cancelUpdate() },
        { text: '立即更新', onPress: () => this.checkPermissions() }
      ]
    )
  }
  render() {
    return (
        <Provider store={store}>
          <Loading />
          <StatusBar translucent={ true } backgroundColor="transparent" barStyle='light-content' />
          <Nav></Nav>
        </Provider>
    );
  }
}
