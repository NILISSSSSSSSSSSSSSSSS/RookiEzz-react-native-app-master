import React, {Component} from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import {App, px, colors, fontSize} from '../../Constant/style'
import Input from '../../Components/Input'
import Picker from '../../Components/Picker'
import NoticeText from '../../Components/NoticeText'
import Button from '../../Components/Button'
import {inputInt} from '../../Tools/utils'
import { Api_TrustPublish } from '../../Apis/Trust';
import LocalValidate from '../../Components/LocalValidate'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    padding: px.paddingContent,
    paddingTop: 0,
  },
})

interface Props {
  navigation: any
  text: string
}
interface State {
  days: string
  daysError: string
  needPerson: string
  needPersonError: string
}
export default class Recruit extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      days: '',
      daysError: '',
      needPerson: '',
      needPersonError: ''
    }
  }
  inputAmount (value) {
    this.setState({
      needPerson: inputInt(value),
      needPersonError: ''
    })
  }
  changeDay (value) {
    this.setState({
      days: inputInt(value),
      daysError: ''
    })
  }
  async recruit () {
    const days = Number(this.state.days)
    const needPerson = Number(this.state.needPerson)
    if (needPerson <= 0) {
      this.setState({
        needPersonError: '招聘人数必须是非0正整数'
      })
      return
    } else if (days <= 0) {
      this.setState({
        daysError: '招聘人数必须是非0正整数'
      })
      return
    } else {
      let res = await Api_TrustPublish({needPerson, days}, {loading: true})
      if (res.success) {
        this.props.navigation.navigate('Square')
      }
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <Input 
          label='招募人数'
          type='numeric'
          value={this.state.needPerson}
          textChange={this.inputAmount.bind(this)}
        />
        <LocalValidate text={this.state.needPersonError} />
        {/* <Picker
          style={{marginTop: 30}}
          label='招募天数'
          value={this.state.day}
          itemArray={itemArray}
          change={(value) => this.changeDay(value)}
        /> */}
        <Input
          style={{marginTop: 30}}
          label='招募天数'
          type='numeric'
          value={this.state.days}
          textChange={this.changeDay.bind(this)}
        />
        <LocalValidate text={this.state.daysError} />
        <View style={{marginTop: 13}}><Text style={{color: colors.font.label, textAlign: 'right', fontSize: fontSize.small}}>手续费(VOCD)：{Number(this.state.days) * Number(this.state.needPerson) * 10}</Text></View>
        <View style={{marginTop: 66, marginBottom: 16}}><NoticeText text='*信任广场按照您需要招募的人数乘以招募天数乘以10(一天一人花费10VOCD)作为招募手续费'/></View>
        <Button
          pressFun={this.recruit.bind(this)}
          type='light'
        >发布招募</Button>
      </View>
    )
  }
}