import React, {Component} from 'react'
import {View, StyleSheet, ImageBackground, Dimensions, Text} from 'react-native'
import { App } from '../Constant/style'
import Button from '../Components/Button'
import { AppConfig } from '../Tools/utils'

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

interface Props {
  navigation: any
}

export default class Example extends Component<Props> {
  constructor(props: object) {
    super(props as Props)
  }
  createFun () {
    this.props.navigation.navigate('NewWalletPwd')
  }
  recoverFun () {
    this.props.navigation.navigate('Recovery')
  }
  componentDidMount () {
  }
  render () {
    return (
      <ImageBackground source={require('../Images/laucher.png')} style={[{width: width, height: 'auto'}, styles.container]} resizeMode="cover">
        <Text style={{marginBottom: 20, color: "#fff"}}>Version: {AppConfig.version}</Text>
        <Button type="light" style={{marginBottom: 20}} pressFun={this.createFun.bind(this)}>创建新的钱包</Button>
        <Button type="dark" style={{marginBottom: 40}} pressFun={this.recoverFun.bind(this)}>通过单词恢复</Button>
      </ImageBackground>
    )
  }
}