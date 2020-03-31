import React, {Component} from 'react'
import { Text, View, StyleSheet, ScrollView, Linking, ImageBackground, TouchableHighlight, Alert, Dimensions } from 'react-native';
import InputWithBanlance from '../../Components/InputWithBanlance'
import ButtonGhost from '../../Components/ButtonGhost'
import { px, App, colors, fontSize } from '../../Constant/style';
import { Api_Detail, Api_Read } from '../../Apis/Bid';
import { formatDate, showToast } from '../../Tools/utils';
import Toast from 'react-native-root-toast';
import { Api_ReceiveAward } from '../../Apis/User';
import UnderLineLink from '../../Components/UnderLineLink'
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview'

const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: 'lucida grande',
  },
  container: {
    flex: 1,
    backgroundColor: App.bg
  }
})
interface Props {
  navigation: any
}
interface State {
  data: {
    _id: string
    vid?: string
    unitPrice: string
    viewAward: string
    title: string
    content: string
    link: string
    hasRead?: boolean
    createTime: string
    contentIsLink: boolean
    nickname?: string
  }
  intervalTime: number
  force: any
}

export default class Advertisement extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      data: {
        _id: '',
        vid: '',
        unitPrice: '',
        viewAward: '',
        title: '',
        content: '',
        link: '',
        hasRead: false,
        createTime: '',
        contentIsLink: false,
        nickname: ''
      },
      intervalTime: 5,
      force: this.props.navigation.getParam('force')
    }
  }
  interval = null
  componentDidMount () {
    const adId = this.props.navigation.getParam('adId')
    this.getData(adId)
  }
  componentWillUnmount () {
    this.interval && clearInterval(this.interval)
  }
  async openLink () {
    let canOpen = await Linking.canOpenURL(this.state.data.link)
    if (!canOpen) {
      showToast(`无效链接，请确认链接地址是否正确(${this.state.data.link})`)
    } else {
      // Linking.openURL(this.state.data.link)
      this.props.navigation.navigate('LinkUri', {uri: this.state.data.link})
    }
  }
  async readNotify () {
    const adId = this.state.data._id
    if (adId) {
      let res = await Api_Read({adId, force: Boolean(this.state.force)}, {loading: true})
      if (res.success) {
        this.receiveAward()
      }
    } else {
      this.receiveAward()
    }
    
  }
  async receiveAwardPost () {
    let res = await Api_ReceiveAward(this.state.force, {loading: true})
    if (res.success) {
      showToast('收益领取成功')
      this.props.navigation.goBack()
    }
  }
  async receiveAward () {
    if (this.state.force) {
      // if (this.state.force !== 'VID_AWARD') {
      //   Alert.alert(
      //     '',
      //     '收益将在当晚凌晨前陆续到账，区块链交易可能存在延迟，请耐心等候',
      //     [
      //       {text: '确定', onPress: () => {this.receiveAwardPost()}}
      //     ]
      //   )
      // } else {
      //   this.receiveAwardPost()
      // }
      this.receiveAwardPost()
    } else {
      showToast('收益领取成功')
      this.props.navigation.goBack()
    }
  }
  renderGainBtn () {
    return (
      <TouchableHighlight
        onPress={this.readNotify.bind(this)}
      >
        <UnderLineLink style={{color: colors.font.main}} text="获取收益"></UnderLineLink>
      </TouchableHighlight>
    )
  }
  renderUnread () {
    if (this.state.intervalTime > 0) {
      return <Text style={{color: '#CFA56A'}}>{`剩余${this.state.intervalTime}秒即可获得收益`}</Text>
    } else {
      return this.renderGainBtn()
    }
  }
  async getData (adId: string) {
    let res = await Api_Detail({adId: adId})
    if (res.success && res.data) {
      this.setState({
        data: res.data
      }, () => {
        if (!res.data.hasRead && this.state.data._id !== '') {
          this.interval = setInterval(() => {
            let intervalTime = this.state.intervalTime - 1
            if (intervalTime <= 0) {
              clearInterval(this.interval)
              //  显示获取收益的按钮
            }
            this.setState({
              intervalTime: intervalTime
            })
          }, 1000)
        }
      })
    }
  }
  render () {
    return (
      this.state.data._id?
      (
        <View style={{flex: 1}}>
          <ImageBackground style={{height: 70, justifyContent: 'center'}} source={require('../../Images/background.png')}>
          <View style={{paddingRight: px.paddingHeader, alignItems: 'flex-end', marginBottom: 14}}>
          {this.state.data.link? (<ButtonGhost text='打开链接' pressFun={this.openLink.bind(this)} />): null}
          </View>
          <View style={{paddingLeft: px.paddingHeader, paddingRight: px.paddingHeader, flexDirection: 'row', justifyContent:'space-between'}}>
            {!this.state.force? <Text style={{color: colors.font.label}}>观看受益    {this.state.data.viewAward} VOCD/次</Text>: null}
            <View>
              {
                this.state.force?
                (this.state.data.hasRead? this.renderGainBtn(): this.renderUnread()):
                (this.state.data.hasRead? <Text style={{color: '#CFA56A'}}>广告已读</Text>: this.renderUnread())
              }
            </View>
          </View>
          </ImageBackground>
          <View style={styles.container}>
              {
                this.state.data.contentIsLink
                ?(<WebView source={{uri: this.state.data.content}}></WebView>)
                :(
                  <ScrollView style={{ padding: px.paddingContent}}>
                    <Text style={{fontSize: fontSize.xl, color: colors.font.main, textAlign: 'center', marginBottom: 8, lineHeight: 35}}>{this.state.data.title}</Text>
                    <Text style={{fontSize: fontSize.normal, color: colors.font.label,  textAlign: 'center', marginBottom: 16}}>{this.state.data.nickname || `VID ${this.state.data.vid}`} 发布于{formatDate(this.state.data.createTime)}</Text>
                    <HTML textSelectable={true} baseFontStyle={{color: colors.font.main, lineHeight: 25}} html={this.state.data.content} imagesMaxWidth={Dimensions.get('window').width} />
                  </ScrollView>
                )
              }
            
          </View>
        </View>
      ):
      (
        <View style={{flex: 1, backgroundColor: App.bg}}>
          <ImageBackground style={{height: 70, justifyContent: 'center'}} source={require('../../Images/background.png')}>
            <View style={{paddingRight: px.paddingHeader, alignItems: 'flex-end', marginBottom: 14}}>
                {this.renderGainBtn()}
            </View>
          </ImageBackground>
        </View>
      )
    )
  }
}