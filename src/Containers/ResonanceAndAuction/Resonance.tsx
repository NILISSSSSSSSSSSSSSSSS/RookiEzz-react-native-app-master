import React, {Component} from 'react'
import { View, StyleSheet, Text, Dimensions, ImageBackground  } from 'react-native'
import {App, px, colors, fontSize} from '../../Constant/style'
import Button from '../../Components/Button'
import ResonanceBar from '../../Components/ResonanceBar'
import { Api_ResonanceInfo } from '../../Apis/User'
import { formatFiat, formatCurrency } from '../../Tools/utils'
import HocWalletBanlance from '../../Components/HocWalletBanlance'

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    justifyContent: 'space-between'
  },
  total: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: px.paddingContent,
    paddingTop: 0,
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
    fontSize: fontSize.large,
    width: 70
  },
  unit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  }
})
interface Props {
  navigation: any
  asset: Array<any>
}
interface State {
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
  }
}
class Resonance extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
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
  componentWillMount () {
    this.props.navigation.setParams({title: '沉淀'})
    this.getData()
  }
  getBanlanceByCurrency (currency: string) {
    let banlance = '0'
    if (this.props.asset.length > 0) {
      let currencyObj = this.props.asset.find(item => item.currency === currency)
      if (currencyObj) {
        banlance = currencyObj.available 
      }
    }
    return banlance
  }
  async getData () {
    let res = await Api_ResonanceInfo({loading: true})
    if (res.success) {
      this.setState({
        baseInfo: res.data
      })
    }
  }
  enter () {
    this.props.navigation.navigate('ResonanceStart', {baseInfo: this.state.baseInfo})
  }
  render () {
    const baseInfo = this.state.baseInfo
    return (
      <View style={styles.container}>
        <View style={styles.total}>
          <Text style={[styles.label, {marginTop: 10}]}>累计沉淀</Text>
          <Text style={[styles.fontExplain, {marginRight: 10, marginTop: 10}]}>E</Text>
          <Text style={[{fontSize: fontSize.xxl, width: width*0.65, color: colors.font.main}]}>{formatCurrency(baseInfo.totalEther)}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: px.paddingContent, paddingRight: px.paddingContent}}>
          <View style={styles.unit}>
            <Text style={styles.label}>当前比率</Text>
            <Text style={styles.value}>1:{baseInfo.layerList[baseInfo.currentLayerIndex].rate}</Text>
          </View>
          <View style={styles.unit}>
            <Text style={[styles.label]}>剩余</Text>
            <Text style={styles.value}>{formatCurrency(baseInfo.currentLayerTokenLeft)}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: px.paddingContent, paddingRight: px.paddingContent}}>
          <View style={styles.unit}>
            <Text style={styles.label}>我的余额</Text>
            <Text style={styles.value}>{formatCurrency(this.getBanlanceByCurrency('VOCK'))}</Text>
          </View>
          <View style={styles.unit}>
            <Text style={styles.label}>沉淀可得</Text>
            <Text style={styles.value}>{formatCurrency(Math.min(Number(this.getBanlanceByCurrency('ETH')) * baseInfo.layerList[baseInfo.currentLayerIndex].rate, Number(baseInfo.currentLayerTokenLeft)))}</Text>
          </View>
        </View>
        {baseInfo.totalLayer> 0 && (
          <ResonanceBar layerList={baseInfo.layerList} currentLayerIndex={baseInfo.currentLayerIndex} currentLayerDeliverToken={baseInfo.currentLayerDeliverToken}/>
        )}
        <ImageBackground source={require('../../Images/Graph.png')} style={{padding: px.paddingContent, paddingTop: 20, flex: 1, justifyContent: 'flex-end'}}><Button type='dark' pressFun={this.enter.bind(this)}>立即沉淀</Button></ImageBackground>
      </View>
    )
  }
}

export default HocWalletBanlance(Resonance)