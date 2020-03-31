import React, {Component} from 'react'
import { Text, StyleSheet, View, ImageBackground, Image } from 'react-native';
import { colors, fontSize, px, App } from '../../Constant/style';
import QRCode from 'react-native-qrcode-svg';
import { Api_MyVid } from '../../Apis/User';
import Button from '../../Components/Button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: px.paddingContent,
    paddingTop: 0,
    backgroundColor: App.bg
  },
  roleText: {
    marginLeft: 10,
    fontSize: fontSize.xl,
    includeFontPadding: false
  },
})

interface Props {
  navigation: any
}

interface State {
  baseData: {
    vid: string
    role: string
  }
}

export default class MyVid extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      baseData: {
        role: '',
        vid: ''
      }
    }
  }
  componentDidMount () {
    this.getBaseData()
  }
  async getBaseData () {
    let res = await Api_MyVid()
    if (res.success) {
      this.setState({
        baseData: res.data
      })
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../Images/goldCard.png')} imageStyle={{ borderRadius: px.cardRadius }} style={{padding: 10, borderRadius: px.cardRadius}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
            <Image
              style={{width: 35, height: 35,}}
              source={require('../../Images/Diamond.png')}
            />
            <Text style={styles.roleText}>{this.state.baseData.role}</Text>
          </View>
          
          <View style={{alignSelf: 'center', marginBottom: 15}}>
            {
              this.state.baseData.vid
              ?<QRCode
                value={this.state.baseData.vid}
                size={120}
                backgroundColor='transparent'/>
              : null }
          </View>

          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text style={{color: colors.font.main, fontSize: fontSize.xl}}>{this.state.baseData.vid}</Text>
          </View>
        </ImageBackground>
        <View style={{}}>
          <Button style={{marginTop: 50}} type="light" pressFun={() => this.props.navigation.navigate('Square')}>前往信任广场</Button>
          <Button style={{marginTop: 20}} type="dark" pressFun={() => this.props.navigation.navigate('TrustNet')}>前往信任网络</Button>
        </View>
      </View>
    )
  }
}