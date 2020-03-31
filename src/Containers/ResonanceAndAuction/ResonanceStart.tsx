import React, {Component} from 'react'
import { View, StyleSheet, Text, Dimensions, Alert } from 'react-native'
import {App, px, colors, fontSize} from '../../Constant/style'
import Button from '../../Components/Button'
import NoticeText from '../../Components/NoticeText'
import InputWithBanlance from '../../Components/InputWithBanlance'
import LocalValidate from '../../Components/LocalValidate'
import { inputFloat, formatCurrency, AppConfig, showToast, debounce } from '../../Tools/utils'
import { Api_Resonance, Api_MyResonanceInfo } from '../../Apis/User'

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
  limitAmount: string
  baseInfo: {
    totalLayer: number
    currenLayer: number
    totalEther: string
    currentLayerDeliverToken: string
    currentLayerTokenLeft: string
    layerList: [
      {
        rate: number
        tokenAmount: string
      }
    ]
    currentLayerIndex: number
  },
  amount: string,
  errorText: string
}
export default class ResonanceStart extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      errorText: '',
      amount: '0',
      banlance: '0',
      limitAmount: '0',
      baseInfo: {
        totalLayer: 0,
        currenLayer: 0,
        totalEther: '0',
        currentLayerDeliverToken: '0',
        currentLayerTokenLeft: '0',
        layerList: [
          {
            rate: 0,
            tokenAmount: '0'
          }
        ],
        currentLayerIndex: 0
      }
    }
  }
  componentDidMount () {
    this.MyResonanceInfo()
    let baseInfo = this.props.navigation.getParam('baseInfo')
    this.setState({
      baseInfo
    })
  }
  async MyResonanceInfo () {
    let res = await Api_MyResonanceInfo()
    if (res.success) {
      this.setState({
        limitAmount: res.data.limitAmount
      })
    }
  }
  async send () {
    console.log('send')
    if (Number(this.state.amount) > Number(this.state.banlance)) {
      this.setState({
        errorText: `输入的值必须是小于钱包余额的数`
      })
      return
    }
    if (Number(this.state.amount) <= AppConfig.fixedFee) {
      this.setState({
        errorText: `输入的值必须是大于${(AppConfig.fixedFee)}的数`
      })
      return
    }
    let res = await Api_Resonance(Number(this.state.amount).toFixed(AppConfig.currencyPrecision), {loading: true})
    if (res.success) {
      Alert.alert(
        '提示',
        '沉淀交易完成时间受以太坊拥堵情况影响，可能需要较长时间，请耐心等待',
        [
          {text: '确认', onPress: () => {this.props.navigation.push('Resonance')}}
        ]
      )
    }
  }
  inputAmount (text) {
    this.setState({
      amount: inputFloat(text)
    })
  }
  getBanlance (value) {
    this.setState({
      banlance: value
    })
  }
  render () {
    let baseInfo = this.state.baseInfo
    return (
      <View style={styles.container}>
        <InputWithBanlance
          currency='ETHER'
          banlanceCurrency="ETH"
          getBanlance={this.getBanlance.bind(this)}
          textChange={this.inputAmount.bind(this)}
        />
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={styles.unit}>
            <Text style={styles.label}>当前比率</Text>
            <Text style={styles.value}>1: {baseInfo.layerList[baseInfo.currentLayerIndex].rate}</Text>
          </View>
          <View style={styles.unit}>
            <Text style={styles.label}>沉淀可获得</Text>
            <Text style={styles.value}>{formatCurrency(Math.min(Number(this.state.amount) * baseInfo.layerList[baseInfo.currentLayerIndex].rate, Number(baseInfo.currentLayerTokenLeft)))}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={styles.unit}>
            <Text style={styles.label}>可沉淀额度</Text>
            <Text style={styles.value}>{formatCurrency(this.state.limitAmount)}</Text>
          </View>
        </View>
        <View style={{marginTop: 50, marginBottom: 30}}>
          <NoticeText 
            text={`您发送的全部金额将有一部分作为燃油费(${AppConfig.fixedFee} ETH)`}
          />
        </View>
        <View style={{}}><Button type='dark' pressFun={() => debounce(this.send.bind(this), 10000)}>立即沉淀</Button></View>
        <LocalValidate text={this.state.errorText}/>
      </View>
    )
  }
}