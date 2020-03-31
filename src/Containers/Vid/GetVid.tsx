import React, {Component} from 'react'
import { Text, StyleSheet, View } from 'react-native';
import { colors, fontSize, px, App } from '../../Constant/style';
import Input from '../../Components/Input'
import NoticeText from '../../Components/NoticeText'
import Button from '../../Components/Button'
import { Api_GetVid } from '../../Apis/User';
import LocalValidate from '../../Components/LocalValidate'
import { showToast } from '../../Tools/utils';
import store from '../../Reducers/'
import { setUserBase } from '../../Reducers/User';
import { connect } from 'react-redux';
import { _state, _user } from '../../Constant/stateType';
import { Dispatch } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons'
import {_setItem} from '../../Tools/Storage'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: px.paddingContent,
    paddingTop: 0,
    backgroundColor: App.bg
  },
  noticeContainer: {
    marginTop: 40,
    marginBottom: 20
  }
})

interface Props {
  navigation: any
  userBaseInfo: _user
  setUserBase: Function
}
interface State {
  parentVid: string
  parentVidError: string
}
class GetVid extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      parentVid: '',
      parentVidError: ''
    }
  }
  componentDidMount () {
    this.setState({
      parentVid: this.props.navigation.getParam('parentVid') || ''
    })
  }
  inputVid (value) {
    this.setState({
      parentVid: value,
      parentVidError: ''
    })
  }
  async beVid () {
    if (this.state.parentVid.trim() === '') {
      this.setState({
        parentVidError: '邀请VID不能为空'
      })
      return
    }
    let res = await Api_GetVid(this.state.parentVid, {loading: true})
    console.log('res: ', res);
    if (res.success) {
      showToast('成功')
      let baseInfoMerge = Object.assign(this.props.userBaseInfo, {vid: res.data.vid})
      await _setItem('user', JSON.stringify(baseInfoMerge))
      if (this.props.setUserBase) {
        this.props.setUserBase(baseInfoMerge)
      }
      this.props.navigation.navigate('Tabbars')
    }
  }
  scan () {
    this.props.navigation.navigate('QrCodeScanner')
  }
  render () {
    return (
      <View style={styles.container}>
        <Input
          label='邀请VID'
          textChange={this.inputVid.bind(this)}
          value={this.state.parentVid}
          right={<Icon name='md-expand' size={22} color={colors.font.main} onPress={this.scan.bind(this)} />}
        />
        <LocalValidate text={this.state.parentVidError} />
        <View style={styles.noticeContainer}>
          <NoticeText 
            text='*成为VID需要您向您的信任邀请人发送100个VOCD作为信任'
          />
        </View>
        <Button
          type='light'
          pressFun={this.beVid.bind(this)}
        >申请</Button>
      </View>
    )
  }
}

const mapStateToProps = (state: _state) => {
  return {
    userBaseInfo: state.user
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUserBase: (data: _user) => dispatch(setUserBase(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GetVid as React.ComponentType)