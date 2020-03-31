import React, {Component} from 'react'
import { Text, View, StyleSheet } from 'react-native';
import InputWithBanlance from '../../Components/InputWithBanlance'
import Button from '../../Components/Button'
import { px, App } from '../../Constant/style';
import { Api_Subscription } from '../../Apis/User';
import LocalValidate from '../../Components/LocalValidate'

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
  amount: string
  banlance: string
  errorInput: string
}
export default class Subscribe extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      amount: '0',
      banlance: '0',
      errorInput: ''
    }
  }
  inputAmount(value) {
    this.setState({
      amount: value
    })
  }
  getBanlance (value) {
    this.setState({
      banlance: value
    })
  }
  async subscribe () {
    if (Number(this.state.banlance) < Number(this.state.amount)) {
      this.setState({
        errorInput: '输入金额应当小于可用余额'
      })
      return
    }
    let res = await Api_Subscription(this.state.amount, {loading: true})
    if (res.success) {
      this.props.navigation.goBack()
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <InputWithBanlance
          currency="VOCD"
          getBanlance={this.getBanlance.bind(this)}
          textChange={this.inputAmount.bind(this)}
        />
        <LocalValidate text={this.state.errorInput || ''}/>
        <View style={{marginTop: 40}}><Button type="light" pressFun={this.subscribe.bind(this)}>申购</Button></View>
      </View>
    )
  }
}