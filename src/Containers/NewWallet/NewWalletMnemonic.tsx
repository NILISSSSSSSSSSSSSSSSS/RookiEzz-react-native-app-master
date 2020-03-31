import React, {Component} from 'react'
import { View, StyleSheet, Text, ScrollView, Clipboard, Alert } from 'react-native'
import RowList from '../../Components/RowList'
import Tag from '../../Components/Tag'
import {App, px, colors, fontSize} from '../../Constant/style'
import Button from '../../Components/Button'
import ExportMnemonic from '../../Components/ExportMnemonic'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    padding: px.paddingContent
  },
  explain: {
    color: colors.font.explain,
    fontSize: fontSize.small
  }
})
interface Props {
  navigation: any
}
export default class NewWalletMnemonic extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  componentDidMount () {
    this.props.navigation.setParams({title: '创建钱包-助记词'})
  }
  remebered () {
    Alert.alert(
      '温馨提示',
      '为了方便下次登录，您可以将助记词复制下来，粘贴在您的记事本中',
      [
        {text: '不用了', onPress: () => {
          this.props.navigation.navigate('NewWalletLast', {mnemonic: this.props.navigation.getParam('mnemonic') , token: this.props.navigation.getParam('token')})
        }, style: 'cancel'},
        {text: '复制', onPress: () => {
          Clipboard.setString(this.props.navigation.getParam('mnemonic'))
          this.props.navigation.navigate('NewWalletLast', {mnemonic: this.props.navigation.getParam('mnemonic') , token: this.props.navigation.getParam('token')})
        }},
      ],
      { cancelable: false }
    )
    
  }
  render () {
    const words = this.props.navigation.getParam('mnemonic')
    return (
      <ScrollView style={styles.container}>
        <RowList>
          {words.split(' ').map(item => 
            <Tag key={item} text={item} />
          )}
        </RowList>
        <View style={{marginTop: 20, marginBottom: 40}}><Text style={styles.explain}>*请记录这些单词和您之前输入的密码</Text></View>
        {/* <ExportMnemonic mnemonic={this.props.navigation.getParam('mnemonic')}/> */}
        <Button style={{marginTop: 20}} type='light' pressFun={this.remebered.bind(this)}>下一步</Button>
      </ScrollView>
    )
  }
}