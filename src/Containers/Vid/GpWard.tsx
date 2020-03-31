import React, {Component} from 'react'
import { Text, StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { colors, fontSize, px, App } from '../../Constant/style';
import GainCard from '../../Components/GainCard'
import GpTabsWithTableData from './GpTabsWithTableData'
import { Api_AwardList, Api_GpStatis, Api_MyAward, Api_ReceiveAward, Api_AwardList_Gp } from '../../Apis/User';
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
    let res = await Api_GpStatis()
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
    this.props.navigation.navigate('Advertisement', {force: 'GP'})
  }
  render () {
    const addon = [
      {
        label: '尚未领取',
        value: `${formatCurrency(this.state.baseData.notGet)}`
      },
      {
        label: '奖金待分配量',
        value: `${formatCurrency(this.state.baseData.waitAmount) || 0} ETH`
      }
    ]
    const des = `
            拥有GP身份的VID可获得分享阶段内沉淀池20%的的ETH奖励，我们通过对优秀GP的奖励机制，为优秀GP增加分配权重，所有GP共同分享。
    `
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <GainCard
            title='累计获奖'
            total={`E ${formatCurrency(this.state.baseData.totalGet)}`}
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
        <View style={styles.tabsContainer}><GpTabsWithTableData current={this.props.data} mine={this.props.data2} changeIndex={this.props.changeIndex}/></View>
      </View>
    )
  }
}
const Api_AwardList_Gp_ = async (options: any) => {
  let res = await Api_AwardList_Gp(options)
  return Promise.resolve(res)
}
const Api_MyAward_Gp= async (options: any) => {
  let res = await Api_MyAward('GP', options)
  return Promise.resolve(res)
}
export default  HocRequestAndMore(GP, Api_AwardList_Gp_, Api_MyAward_Gp)