import React, {Component} from 'react'
import { View, StyleSheet, Text, ImageBackground, ScrollView, RefreshControl, Image } from 'react-native'
import {App, px, colors, fontSize} from '../../Constant/style'
import CurrencyListItem from '../../Components/CurrencyListItem'
import { Api_Asset } from '../../Apis/User';
import { formatFiat, formatCurrency } from '../../Tools/utils';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    padding: px.paddingContent,
    paddingTop: 0,
    color: colors.font.main
  },
  asset: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: px.cardRadius,
    height: 150,
    justifyContent: 'space-between',
    marginBottom: 20
  }
})
interface Props {
  navigation: any
}
interface State {
  asset: Array<object>
  total: number
  refreshing: boolean
}
export default class Wallet extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      asset: [],
      total: 0,
      refreshing: false
    }
  }
  // private _navListener
  // componentWillUnmount () {
  //   this._navListener.remove()
  // }
  // componentWillMount () {
  //   this._navListener = this.props.navigation.addListener('didFocus', () => this.getAsset())
  // }
  componentDidMount () {
    // this.props.navigation.setParams({title: '钱包'})
    this.getAsset()
  }
  goHistory (currency: string) {
    this.props.navigation.navigate('WalletHistory', {currency: currency})
  }
  async getAsset () {
    this.setState({refreshing: true})
    let res = await Api_Asset(['ETH', 'VOCD', 'VOCK'])
    this.setState({refreshing: false})
    if (res.success) {
      let total = 0
      res.data.forEach(item => total += Number(item.value * item.available))
      this.setState({
        asset: res.data,
        total: total
      })
    }
  }
  assetFilterByCurreny (currency) {
    let sel = this.state.asset.find(item => item.currency === currency)
    return sel
  }
  _onRefresh () {
    this.getAsset()
  }
  render () {
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <ImageBackground source={require('../../Images/goldCard.png')} imageStyle={{ borderRadius: px.cardRadius }} style={styles.asset}>
            <View ><Text style={{fontSize: fontSize.normal, color: colors.font.main}}>资产总值</Text></View>
            <View>
              <View style={{alignSelf: 'flex-end'}}><Text style={{fontSize: fontSize.xl, color: colors.font.main, fontWeight: 'bold'}}>¥{formatFiat(this.state.total)}</Text></View>
              {/* <View style={{alignSelf: 'flex-end', marginTop: 10}}><Text style={{fontSize: fontSize.normal, color: colors.font.main}}>2.744 BTC</Text></View> */}
            </View>
          </ImageBackground>
          
          <View>
            <CurrencyListItem
              pressFun={() => this.goHistory('ETH')}
              currency='ETH'
              icon = {<Image source={require('../../Images/eth.png')} style={{width: 80, height: 70}} />}
              amount={formatCurrency(this.assetFilterByCurreny('ETH')? this.assetFilterByCurreny('ETH').available: 0)}
              price={formatFiat(this.assetFilterByCurreny('ETH')? this.assetFilterByCurreny('ETH').value * this.assetFilterByCurreny('ETH').available: 0)}
            ></CurrencyListItem>
            <CurrencyListItem
              pressFun={() => this.goHistory('VOCD')}
              currency='VOCD'
              icon = {<Image source={require('../../Images/vocd.png')} style={{width: 20, height: 20, marginLeft: 30, marginRight: 28}} />}
              amount={formatCurrency(this.assetFilterByCurreny('VOCD')? this.assetFilterByCurreny('VOCD').available: 0)}
              price={formatFiat(this.assetFilterByCurreny('VOCD')? this.assetFilterByCurreny('VOCD').value * this.assetFilterByCurreny('VOCD').available: 0)}
            ></CurrencyListItem>
            <CurrencyListItem
              pressFun={() => this.goHistory('VOCK')}
              currency='VOCK'
              icon = {<Image source={require('../../Images/vock.png')} style={{width: 20, height: 20, marginLeft: 30, marginRight: 28}} />}
              amount={formatCurrency(this.assetFilterByCurreny('VOCK')? this.assetFilterByCurreny('VOCK').available: 0)}
              price={formatFiat(this.assetFilterByCurreny('VOCK')? this.assetFilterByCurreny('VOCK').value * this.assetFilterByCurreny('VOCK').available: 0)}
            ></CurrencyListItem>
          </View>
        </ScrollView>
      </View>
    )
  }
}