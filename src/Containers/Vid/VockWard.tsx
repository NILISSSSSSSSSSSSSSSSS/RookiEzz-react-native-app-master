import React, {Component} from 'react'
import { Text, StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { colors, fontSize, px, App } from '../../Constant/style';
import GainCard from '../../Components/GainCard'
import VockTabsWithTableData from './VockTabsWithTableData'
import { Api_AwardList, Api_TopStatis, Api_MyAward, Api_ReceiveAward, Api_AwardList_Vock } from '../../Apis/User';
import HocRequestAndMore from '../../Components/HocRequestAndMore'
import { formatCurrency, showToast } from '../../Tools/utils'
import { Api_Detail } from '../../Apis/Bid';

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    paddingTop: 0
  },
  cardContainer: {
    paddingLeft: px.paddingContent,
    paddingRight: px.paddingContent
  },
  desView: {
    marginTop: 24,
    paddingLeft: px.paddingContent,
    paddingRight: px.paddingContent
  },
  desText: {
    color: colors.font.label,
    fontSize: fontSize.large,
    lineHeight: 25
  },
  tabsContainer: {
    marginTop: 20,
    flex: 1
  }
})

interface Props {
  navigation: any
  data: Array<any>
  data2: Array<any>
  changeIndex: Function
}
interface State {
  baseData: {
    totalGet: string
    notGet: string
    value: string
    role: string
    waitAmount: string
  }
}

class GP extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      baseData: {
        totalGet: '0',
        notGet: '0',
        value: '0',
        role: '',
        waitAmount: '0'
      }
    }
  }
  private _navListener
  componentWillUnmount () {
    this._navListener.remove()
  }
  componentWillMount () {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this.getBaseData()
    })
  }
  async getBaseData () {
    let res = await Api_TopStatis()
    console.log(res)
    if (res.success) {
      this.setState({
        baseData: res.data
      })
    }
  }
  async get () {
    // let res = await Api_Detail({},{loading: true})
    // //  存在可读广告
    // if (res.success) {
    //   if (res.data) {
    //     this.props.navigation.navigate('Advertisement', {force: 'GP'})
    //   } else {
    //     // 不存在，直接领取
    //     let res = await Api_ReceiveAward('GP', {loading: true})
    //     if (res.success) {
    //       showToast('领取成功')
    //     }
    //   }
    // }
    this.props.navigation.navigate('Advertisement', {force: 'TOP_VOCK'})
  }
  render () {
    const addon = [
      {
        label: '尚未领取',
        value: `${formatCurrency(this.state.baseData.notGet)}`
      },
      {
        label: '',
        value: ``
      }
    ]
    const des = `
            基于VID在信任网络中的位置以及VID下层信任网络的情况和人数，通过加权计算方法计算出VID的能量积分VOCK数量
    `
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <GainCard
            title='累计获奖'
            total={`VOCK ${formatCurrency(this.state.baseData.totalGet)}`}
            usd={`≈ ${Number(this.state.baseData.totalGet) * Number(this.state.baseData.value)} USD`}
            role={`${this.state.baseData.role}`}
            addon={addon}
            notGet={this.state.baseData.notGet}
            get={this.get.bind(this)}
          />
        </View>
        <View style={styles.desView}>
          <Text style={styles.desText}>{des}</Text>
        </View>
        <View style={styles.tabsContainer}><VockTabsWithTableData current={this.props.data} mine={this.props.data2} changeIndex={this.props.changeIndex}/></View>
      </View>
    )
  }
}
const Api_AwardList_Vock_ = async () => {
  let res = await Api_AwardList('TOP_VOCK')
  return Promise.resolve(res)
}
const Api_MyAward_Vock= async (options: any) => {
  let res = await Api_MyAward('TOP_VOCK', options)
  return Promise.resolve(res)
}
export default  HocRequestAndMore(GP, Api_AwardList_Vock_, Api_MyAward_Vock, false)