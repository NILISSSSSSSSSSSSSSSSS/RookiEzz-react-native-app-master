import React, {Component} from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import {App, px, colors, fontSize} from '../../Constant/style'
import Button from '../../Components/Button'
import NoticeText from '../../Components/NoticeText'
import InputWithBanlance from '../../Components/InputWithBanlance'
import LocalValidate from '../../Components/LocalValidate'
import Input from '../../Components/Input'
import { inputFloat, AppConfig, formatCurrency } from '../../Tools/utils';
import { Api_BlindPay } from '../../Apis/blind';

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: px.paddingContent,
    paddingTop: 0,
    backgroundColor: App.bg
  },
  label: {
    color: colors.font.explain,
    fontSize: fontSize.small,
    marginRight: 25,
    width: 80
  },
  value: {
    color: colors.font.main,
    fontSize: fontSize.large,
    width: width * 0.2
  },
  unit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  notice: {
    color: colors.font.explain,
    fontSize: fontSize.small
  }
})
interface Props {
  navigation: any
}

interface State {
  banlance: string
  amount: string
  price: string
  auctionInfo: {
    blindStartTime: string
    blindEndTime: string
    highestPrice: string
    lowestPrice: string
    exchangeTotalAmount: string
    myUnitPrice: string
    myExchangeAmount: string
  },
  inputError: string
}
export default class AuctionStart extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      banlance: '0',
      amount: '0',
      price: '0',
      auctionInfo: {
        blindStartTime: '0',
        blindEndTime: '0',
        highestPrice: '0',
        lowestPrice: '0',
        exchangeTotalAmount: '0',
        myUnitPrice: '0',
        myExchangeAmount: '0'
      },
      inputError: ''
    }
  }
  componentWillMount () {
    let auctionInfo = this.props.navigation.getParam('auctionInfo')
    this.setState({
      auctionInfo
    })
  }
  componentDidMount () {
  }
  inputAmount (text) {
    this.setState({
      amount: inputFloat(text)
    })
  }
  inputPrice (text) {
    this.setState({
      price: inputFloat(text)
    })
  }
  getBanlance (value) {
    this.setState({
      banlance: value
    })
  }
  getCoast () {
    if (Number(this.state.amount) === 0 || Number(this.state.price) === 0) {
      return 0
    }
    return formatCurrency((Number(this.state.amount) / Number(this.state.price)))
  }
  auctionSubmit () {
    if (this.getCoast() === 0 || (Number(this.state.amount) / Number(this.state.price)) > Number(this.state.banlance) || Number(this.state.amount) < AppConfig.fixedFee) {
      this.setState({
        inputError: `总花费必须小于余额且大于${AppConfig.fixedFee}`
      })
      return
    }
    if (Number(this.state.auctionInfo.lowestPrice) < (Number(this.state.price) > 0? 1 / Number(this.state.price): 0)) {
      this.setState({
        inputError: `出价汇率必须不小于最低竞价`
      })
      return
    }
    this.setState({
      inputError: ''
    })
    this.auctionStart()
  }
  async auctionStart () {
    let res = await Api_BlindPay({
      unitPrice: (1 / Number(this.state.price)).toString(),
      amount: Number(this.state.amount).toFixed(AppConfig.currencyPrecision)
    }, {loading: true})
    if (res.success) {
      this.props.navigation.navigate('Auction')
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <InputWithBanlance
          currency='VOCD / ETH'
          banlanceCurrency="ETH"
          getBanlance={this.getBanlance.bind(this)}
          textChange={this.inputPrice.bind(this)}
        />
        <View style={[styles.unit, {justifyContent: 'flex-start', marginTop: 10}]}>
          <Text style={styles.label}>汇率</Text>
          <Text style={[styles.value, {width: 'auto'}]}>{formatCurrency(Number(this.state.price) > 0? 1 / Number(this.state.price): 0)} ETH/VOCD</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={styles.unit}>
            <Text style={styles.label}>最低竞价</Text>
            <Text style={styles.value}>{formatCurrency(this.state.auctionInfo.lowestPrice)}</Text>
          </View>
          <View style={styles.unit}>
            <Text style={styles.label}>最高竞价</Text>
            <Text style={styles.value}>{formatCurrency(this.state.auctionInfo.highestPrice)}</Text>
          </View>
        </View>
        <View style={{marginTop: 20, marginBottom: 10}}>
          <Input 
            label="预购VOCD数量"
            value={this.state.amount}
            textChange={this.inputAmount.bind(this)}
          />
        </View>
        <View style={[styles.unit, {justifyContent: 'flex-start'}]}>
          <Text style={styles.label}>竞价花费</Text>
          <Text style={[styles.value, {width: 'auto'}]}>{this.getCoast()}ETH</Text>
        </View>
        <View style={{marginTop: 50, marginBottom: 30}}>
          <NoticeText 
            text={`您发送的全部金额将有一部分作为燃油费(${AppConfig.fixedFee} ETH)`}
          />
        </View>
        <View style={{marginTop: 50}}><Button type='dark' pressFun={this.auctionSubmit.bind(this)}>竞价</Button></View>
        <LocalValidate 
          text={this.state.inputError}
        />
      </View>
    )
  }
}