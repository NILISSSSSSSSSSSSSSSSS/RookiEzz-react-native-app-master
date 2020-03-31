import React, {Component} from 'react'
import { View, StyleSheet, Text, ScrollView, Clipboard } from 'react-native'
import {App, px, colors, fontSize} from '../../Constant/style'
import QRCode from 'react-native-qrcode-svg';
import Button from '../../Components/Button'
import RecentTradeList from './RecentTradeList'
import ButtonGhost from '../../Components/ButtonGhost'
import { Api_Address } from '../../Apis/User';
import HocRequestAndMore from '../../Components/HocRequestAndMore'
import { Api_Records } from '../../Apis/User'
import { showToast } from'../../Tools/utils'
import store from '../../Reducers/'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    paddingTop: 0,
    alignItems: 'center'
  },
  address: {
    paddingLeft: px.paddingContent,
    paddingRight: px.paddingContent,
    marginTop: 30,
    textAlign: 'center',
    color: colors.font.main
  }
})
interface Props {
  navigation: any
  data: Array<any>
}

interface State {
  currency: string
  address: string
}

let currency = ''
class History extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = ({
      currency: this.props.navigation.getParam('currency'),
      address: ''
    })
  }
  componentDidMount () {
    currency = this.state.currency
    this.props.navigation.setParams({title: this.state.currency})
    this.getAddress()
  }
  componentWillUpdate () {
    console.log("TCL: History -> componentWillUpdate -> componentWillUpdate")
  }
  copy () {
    Clipboard.setString(this.state.address)
    showToast('复制成功')
  }
  sendTo () {
    this.props.navigation.navigate('Transfer', {currency: this.state.currency})
  }
  async getAddress () {
    let res = await Api_Address(this.state.currency)
    console.log('res: ', res.data[0].address);
    if (res.success) {
      this.setState({
        address: res.data[0].address
      })
    }
  }
  render () {
    return (
      <View style={styles.container}>
        {this.state.address?
        <QRCode
          value={this.state.address}
          size={120}
          backgroundColor='white'/>: null}
        <Text style={styles.address}>{this.state.address}</Text>
        <View style={{flexDirection: 'row', width: '60%', marginTop: 10, justifyContent: 'space-between'}}>
          <ButtonGhost text='一键复制' pressFun={this.copy.bind(this)} style={{}}/>
          <ButtonGhost text='区块浏览器' pressFun={() => this.props.navigation.navigate('LinkUri', {uri: `https://etherscan.io/address/${this.state.address}`})} />
        </View>
        <Button style={{marginTop: 30}} type='dark' pressFun={this.sendTo.bind(this)}>发送给他人</Button>
        <RecentTradeList data={this.props.data} vid={store.getState().user.vid}/>
      </View>
    )
  }
}


const Api_Records_DATA = async (options: any) => {
  console.log('currencycurrency', currency)
  let res = await Api_Records(currency, options)
  return Promise.resolve(res)
}

export default HocRequestAndMore(History, Api_Records_DATA)