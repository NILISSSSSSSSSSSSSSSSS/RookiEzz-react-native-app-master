import React, {Component} from 'react'
import { Text, StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { colors, fontSize, px, App } from '../../Constant/style';
import GainCard from '../../Components/GainCard'
import ProfitTableData from './ProfitTableData'
import { Api_AwardList, Api_TopStatis, Api_MyAward, Api_ReceiveAward } from '../../Apis/User';
import HocRequestAndMore from '../../Components/HocRequestAndMore'
import { formatCurrency, showToast } from '../../Tools/utils'
import { Api_Detail } from '../../Apis/Bid';

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg
  },
  cardContainer: {
    paddingLeft: px.paddingContent,
    paddingRight: px.paddingContent
  },
  desView: {
    marginTop: 18,
    paddingLeft: px.paddingContent,
    paddingRight: px.paddingContent
  },
  desText: {
    color: colors.font.label,
    fontSize: fontSize.large,
    lineHeight: 25
  },
  tabsContainer: {
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
    points: number
    rank: number
    totalGet: string
    notGet: string
    value: string
    role: string
    waitAmount: string
  }
}
class Profit extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      baseData: {
        points: 0,
        rank: 0,
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
  componentDidMount () {
  }
  async getBaseData () {
    let res = await Api_TopStatis()
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
    //     this.props.navigation.navigate('Advertisement', {force: 'TOP'})
    //   } else {
    //     // 不存在，直接领取
    //     let res = await Api_ReceiveAward('TOP', {loading: true})
    //     if (res.success) {
    //       showToast('领取成功')
    //     }
    //   }
    // }
    this.props.navigation.navigate('Advertisement', {force: 'TOP'})
  }
  render () {
    const addon = [
      {
        label: '累计获奖',
        value: `${formatCurrency(this.state.baseData.totalGet)}`
      },
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
            基于VID在信任网络中的位置以及VID下层信任网络的情况和人数，通过加权计算方法计算出VID的信用积分，将沉淀池中上一个区块周50%的ETH分配给前30名
    `
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <GainCard
            title='信任积分'
            total={`${formatCurrency(this.state.baseData.points)}`}
            usd={`目前排名${this.state.baseData.rank}`}
            role={`${this.state.baseData.role}`}
            addon={addon}
            notGet={this.state.baseData.notGet}
            get={this.get.bind(this)}
          />
        </View>
        <View style={styles.desView}>
          <Text style={styles.desText}>{des}</Text>
        </View>
        <View style={styles.tabsContainer}><ProfitTableData rankList={this.props.data} mine={this.props.data2} changeIndex={this.props.changeIndex}/></View>
      </View>
    )
  }
}
const Api_AwardList_Top = async () => {
  let res = await Api_AwardList('TOP10')
  return Promise.resolve(res)
}
const Api_MyAward_Top = async (options: any) => {
  let res = await Api_MyAward('TOP10', options)
  return Promise.resolve(res)
}
export default  HocRequestAndMore(Profit, Api_AwardList_Top, Api_MyAward_Top, false)