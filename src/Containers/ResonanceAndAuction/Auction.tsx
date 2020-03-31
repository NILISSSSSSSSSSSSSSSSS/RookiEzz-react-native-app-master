import React, {Component} from 'react'
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native'
import {App, px, colors, fontSize} from '../../Constant/style'
import Button from '../../Components/Button'
import { Api_BlindInfo } from '../../Apis/blind';
import { formatFiat, formatDate, formatCurrency, showToast } from '../../Tools/utils';
import ArtClock from '../../Components/ArtClock'

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    padding: px.paddingContent,
    paddingTop: 0
  },
  total: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20
  },
  label: {
    color: colors.font.explain,
    fontSize: fontSize.small,
    textAlign: 'left',
    width: 80
  },
  fontExplain: {
    color: colors.font.explain
  },
  value: {
    color: colors.font.main,
    fontSize: fontSize.normal
  },
  unit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
interface Props {
  navigation: any
}
interface State {
  artClock: any
  btnCanClick: boolean
  info: {
    blindStartTime: string
    blindEndTime: string
    highestPrice: string
    lowestPrice: string
    exchangeTotalAmount: string
    myUnitPrice: string
    myExchangeAmount: string
  }
}
export default class Auction extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      artClock: null,
      btnCanClick: false,
      info: {
        blindStartTime: '0',
        blindEndTime: '0',
        highestPrice: '0',
        lowestPrice: '0',
        exchangeTotalAmount: '0',
        myUnitPrice: '0',
        myExchangeAmount: '0'
      }
    }
  }
  private _navListener
  componentWillUnmount () {
    this._navListener.remove()
  }
  componentWillMount () {
    this._navListener = this.props.navigation.addListener('didFocus', () => this.autionInfo())
  }
  componentDidMount () {
    console.log('componentDidMount: ');
  }
  async autionInfo () {
    let res = await Api_BlindInfo()
    if (res.success) {
      this.setState({
        info: res.data
      })
    }
  }
  auction () {
    if (!this.state.btnCanClick) {
      showToast('活动尚未开始或已结束')
      return
    }
    this.props.navigation.navigate('AuctionStart', {auctionInfo: this.state.info})
  }
  dataReverse (data) {
    return Number(data) === 0? 0: 1 / Number(data)
  }
  btnCanClickHandle (value: boolean) {
    this.setState({
      btnCanClick: value
    })
  }
  render () {
    let info = this.state.info
    return (
      <ScrollView style={styles.container}>
        {info.blindStartTime === '0'? null: <ArtClock info={this.state.info} btnCanClickHandle={this.btnCanClickHandle.bind(this)}/>}
        <View style={styles.total}>
          <Text style={styles.label}>本期拍卖额</Text>
          
          <Text style={[styles.value, {fontSize: fontSize.xxl, marginLeft: 10}]}>{formatFiat(info.exchangeTotalAmount, 0)}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',  marginTop: 15}}>
          <View style={styles.unit}>
            <Text style={styles.label}>最高出价</Text>
            <Text style={styles.value}>{formatCurrency(info.highestPrice)} ETH</Text>
          </View>
          <View style={styles.unit}>
            <Text style={[styles.label]}>竞拍底价</Text>
            <Text style={styles.value}>{formatCurrency(info.lowestPrice)} ETH</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Text style={styles.label}>拍卖开始</Text>
          <Text style={styles.value}>{formatDate(info.blindStartTime, {time: true})}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Text style={styles.label}>拍卖结束</Text>
          <Text style={styles.value}>{formatDate(info.blindEndTime, {time: true})}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#242537',marginTop: 20}}>
          <View>
            <Text style={styles.label}>我的出价</Text>
            <Text style={[styles.value, {marginTop: 12}]}>{formatCurrency(info.myUnitPrice)} ETH</Text>
          </View>
          <View style={{width: 1, height: 20, backgroundColor: '#191A2A'}}></View>
          <View>
            <Text style={styles.label}>预购数量</Text>
            <Text style={[styles.value, {marginTop: 12}]}>{formatCurrency(info.myExchangeAmount)} VOCD</Text>
          </View>
        </View>
        <Button style={{marginTop: 38, marginBottom: 10}} type="dark" pressFun={this.auction.bind(this)}>立刻竞价/修改竞价</Button>
      </ScrollView>
    )
  }
}