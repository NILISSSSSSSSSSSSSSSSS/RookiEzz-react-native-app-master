import React, {Component} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Clipboard } from 'react-native'
import {App, px, colors, fontSize} from '../../Constant/style'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import InputWithBanlance from '../../Components/InputWithBanlance'
import LocalValidate from '../../Components/LocalValidate'
import NoticeText from '../../Components/NoticeText'
import { inputFloat } from '../../Tools/utils'
import { Api_Trans } from '../../Apis/User'
import store from '../../Reducers/'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    padding: px.paddingContent,
    paddingTop: 0,
  }
})
interface Props {
  navigation: any
}

interface State {
  currency: string
  address: string
  amount: string
  banlance: string
  errorText: string
}
export default class Transfer extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      currency: this.props.navigation.getParam('currency'),
      address: '',
      amount: '0',
      banlance: '0',
      errorText: ''
    }
  }
  componentDidMount () {
  }
  setAddress (value) {
    this.setState({
      address: value
    })
  }
  async send () {
    if (Number(this.state.amount) > Number(this.state.banlance) || Number(this.state.amount) <= 0) {
      this.setState({
        errorText: '输入金额必须是大于0小于余额的数字'
      })
      return
    } else if (this.state.address.trim() === '') {
      this.setState({
        errorText: '地址不能为空'
      })
      return
    } else if (!store.getState().user.vid) {
      this.setState({
        errorText: '请输入您推荐人VID，或者去信任广场获得VID推荐'
      })
      return
    }
    this.setState({
      errorText: ''
    })
    let res = await Api_Trans({
      amount: this.state.amount,
      currency: this.state.currency,
      to: this.state.address
    }, {loading: true})
    if (res.success) {
      this.props.navigation.navigate('WalletHistory')
    }
  }
  async paste () {
    let address = await Clipboard.getString()
    this.setAddress(address)
  }
  inputAmount (text) {
    this.setState({
      amount: inputFloat(text)
    })
  }
  getBanlance (value: string) {
    this.setState({
      banlance: value
    })
  }
  render () {
    return (
      <View style={styles.container}>
        <InputWithBanlance
          currency={this.state.currency}
          getBanlance={this.getBanlance.bind(this)}
          banlanceCurrency={this.state.currency}
          textChange={this.inputAmount.bind(this)}
        />
        <Input
          style={{marginTop: 20}}
          label='发送到'
          value={this.state.address}
          right={<TouchableOpacity onPress={this.paste.bind(this)}><Text style={{color: colors.font.active}}>粘贴</Text></TouchableOpacity >}
          textChange={this.setAddress.bind(this)}
        />
        <View style={{marginTop: 50, marginBottom: 20}}>
          <NoticeText 
            text='您发送的全部金额将有一部分作为燃油费'
          />
        </View>
        <Button type='dark' pressFun={this.send.bind(this)}>发送</Button>
        <LocalValidate text={this.state.errorText}/>
      </View>
    )
  }
}