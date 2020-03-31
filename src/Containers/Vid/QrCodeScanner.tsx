import React, {Component} from 'react'
import { Animated, View, Easing, Text, StyleSheet, DeviceEventEmitter } from 'react-native'
import { RNCamera } from 'react-native-camera'
import ImagePicker from 'react-native-image-picker'
import LocalBarcodeRecognizer from 'react-native-local-barcode-recognizer';
interface Props {
    navigation: any
}
interface State {
  moveAnim: any
  listener: any
  parentVid: string
}
class ScanScreen extends Component<Props, State> {
  constructor(props: object) {
      super(props as Props);
      this.state = {
          moveAnim: new Animated.Value(0),
          listener: null,
          parentVid: ''
      };
  }
  componentWillMount () {
    let _this = this
    let listener = DeviceEventEmitter.addListener('openAlbumEvent', () => {
        _this.openAlbum()
    })
    this.setState({
        listener
    })
  }
  componentWillUnmount () {
    if (this.state.listener) {
        this.state.listener.remove();
      }
  }
  componentDidMount() {
      this.startAnimation();
  }
  openAlbum () {
    const options = {
    };
      
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.launchImageLibrary(options, (response) => {
    console.log('Response = ', response);
    
    if (response.didCancel) {
        console.log('User cancelled image picker');
    } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
    } else {
        const source = response.data;
        this.recoginzeLocal(source)
    }
    });
  }
  recoginzeLocal = async (base64) => {
	// Here is the demoe
    let result = await LocalBarcodeRecognizer.decode(base64, {codeTypes:['ean13','qr']});
    if (result) {
        this.props.navigation.push('GetVid', {parentVid: result})
    }
  }
  startAnimation = () => {
      this.state.moveAnim.setValue(0);
      Animated.timing(
          this.state.moveAnim,
          {
              toValue: -200,
              duration: 1500,
              easing: Easing.linear,
              useNativeDriver: true
          }
      ).start(() => this.startAnimation());
  };
  //  识别二维码
  onBarCodeRead = (result) => {
    console.log('code: ', result.data);
    if (this.state.parentVid.length > 0) {
        return undefined
    }
    if (result) {
        this.setState({
            parentVid: result.data
        })
        this.props.navigation.push('GetVid', {parentVid: result.data})
    }
  };
  render() {
      return (
          <View style={styles.container}>
              <RNCamera
                  style={styles.preview}
                  type={RNCamera.Constants.Type.back}
                  flashMode={RNCamera.Constants.FlashMode.on}
                  barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                  googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}
                  onBarCodeRead={this.onBarCodeRead.bind(this)}
              >
                  <View style={styles.rectangleContainer}>
                      <View style={styles.rectangle}/>
                      <Animated.View style={[
                          styles.border,
                          {transform: [{translateY: this.state.moveAnim}]}]} />
                      <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                  </View>
                  </RNCamera>
          </View>
      );
  }
}

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row'
  },
  preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  rectangleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
  },
  rectangle: {
      height: 200,
      width: 200,
      borderWidth: 1,
      borderColor: '#00FF00',
      backgroundColor: 'transparent'
  },
  rectangleText: {
      flex: 0,
      color: '#fff',
      marginTop: 10
  },
  border: {
      flex: 0,
      width: 200,
      height: 2,
      backgroundColor: '#00FF00',
  }
});