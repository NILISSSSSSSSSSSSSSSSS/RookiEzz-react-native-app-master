import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Input from '../../Components/Input'
import { App, px } from '../../Constant/style'
import Button from '../../Components/Button'
import LocalValidate from '../../Components/LocalValidate'
import {Api_SignUp} from '../../Apis/User'
import {password_regex} from '../../Constant/regular'
import {_setItem} from '../../Tools/Storage'
import { connect } from 'react-redux';
import { _state, _user } from '../../Constant/stateType';
import { Dispatch } from 'redux';
import { setUserBase } from '../../Reducers/User';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    padding: px.paddingContent
  }
})
interface Props {
  navigation: any
  setUserBase: Function
}
interface State {
  pwd: string,
  pwdErrMsg: string
  confirmPwd: string
  confirmPwdErrMsg: string
}
class NewWalletPwd extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      pwd: '',
      pwdErrMsg: '',
      confirmPwd: '',
      confirmPwdErrMsg: ''
    }
  }
  pwdChange (value: string) {
    this.setState({
      pwd: value,
      pwdErrMsg: ''
    })
  }
  confirmPwdChange (value: string) {
    this.setState({
      confirmPwd: value,
      confirmPwdErrMsg: ''
    })
  }
  async createWallet () {
    if (!new RegExp(password_regex.exp).test(this.state.pwd)) {
      this.setState({
        pwdErrMsg: password_regex.errorText
      })
    }else if (this.state.pwd !== this.state.confirmPwd) {
      this.setState({
        confirmPwdErrMsg: '两次密码不一致'
      })
    }else {
      // fetch('http://voc.test.net/user/signup', {method: 'POST'}).then(res => res.json()).then(res=>{console.log('res', res)}).catch(err=>{console.log('err',err)})
      let res = await Api_SignUp(this.state.pwd, {loading: true})
      console.log("TCL: NewWalletPwd -> createWallet -> res", res)
      //  接口不通
      // this.props.navigation.navigate('NewWalletMnemonic')
      if (res.success) {
        
        this.props.navigation.navigate('NewWalletMnemonic', {mnemonic: res.data.mnemonic, token: res.data.token})
      }
    }
    
  }
  componentDidMount () {
    this.props.navigation.setParams({title: '创建钱包-输入密码'})
  }
  render () {
    return (
      <View style={styles.container}>
        <Input label='请输入密码' secureTextEntry={true} value={this.state.pwd} textChange={this.pwdChange.bind(this)}></Input>
        <LocalValidate text={this.state.pwdErrMsg}/>
        <Input style={{marginTop: 20}} label='请确认密码' secureTextEntry={true} value={this.state.confirmPwd} textChange={this.confirmPwdChange.bind(this)}></Input>
        <LocalValidate text={this.state.confirmPwdErrMsg}/>
        <Button style={{marginTop: 40}} type='light' pressFun={this.createWallet.bind(this)}>创建钱包</Button>
      </View>
    )
  }
}

const mapStateToProps = (state: _state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUserBase: (data: _user) => dispatch(setUserBase(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewWalletPwd as React.ComponentType)