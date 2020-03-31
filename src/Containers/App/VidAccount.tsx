import React, {Component} from 'react'
import { Text, StyleSheet, View, Dimensions, ScrollView, Alert } from 'react-native';
import { colors, fontSize, px, App } from '../../Constant/style';
import NoticeText from '../../Components/NoticeText'
import ButtonGhost from '../../Components/ButtonGhost'
import GainCard from '../../Components/GainCard'
import ButtonIcon from '../../Components/ButtonIcon'
import GainTabsWithTableData from '../Vid/GainTabsWithTableData'
import {isBottom, formatDate, showToast, formatCurrency} from '../../Tools/utils'
import HocRequestAndMore from '../../Components/HocRequestAndMore'
import { Api_InviteList, Api_InvestList, Api_VidStatis, Api_RedeemNotice, Api_Redeem, Api_ReceiveAward } from '../../Apis/User'
import store from '../../Reducers/'
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
  btns1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    paddingLeft: px.paddingContent,
    paddingRight: px.paddingContent
  },
  label: {
    color: colors.font.explain,
    fontSize: fontSize.small,
    width: 80
  },
  value: {
    color: colors.font.main,
    fontSize: fontSize.normal,
    width: 70
  },
  unit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btns2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingLeft: px.paddingContent,
    paddingRight: px.paddingContent
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
  statis: {
    inviteTotal: string
    investTotal: string
    value: string
    subTotal: string
    allSubTotal: string
    role: string
    gpDowngraded: boolean
    notGet: string
    waitAmount: string
  }
  redeemNotice: {
    total: string
    lastTime: string
    rate: number
    nextRate: number
    nextRateNeedDays: number
  }
}

class VidAccount extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      statis: {
        inviteTotal: '',
        investTotal: '',
        value: '',
        subTotal: '',
        allSubTotal: '',
        role: '',
        gpDowngraded: false,
        notGet: '',
        waitAmount: ''
      },
      redeemNotice: {
        total: '',
        lastTime: '',
        rate: 0,
        nextRate: 0,
        nextRateNeedDays: 0
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
      this.getRedeemNotice()
    })
  }
  componentDidMount () {
    this.props.navigation.setParams({title: 'VID'})
  }
  async getBaseData () {
    let res = await Api_VidStatis()
    if (res.success) {
      this.setState({
        statis: res.data
      })
    }
  }
  async getRedeemNotice () {
    let res = await Api_RedeemNotice()
    if (res.success) {
      this.setState({
        redeemNotice: res.data
      })
    }
  }
  async redeem () {
    let res = await Api_Redeem({loading: true})
    if (res.success) {
      showToast('操作成功')
      //  重新拉取数据，刷新页面数据
      this.getBaseData()
      this.getRedeemNotice()
    }
  }
  subscribe() {
    this.props.navigation.navigate('Subscribe')
  }
  myVid () {
    this.props.navigation.navigate('MyVid')
  }
  async get () {
    // let res = await Api_Detail({},{loading: true})
    // //  存在可读广告
    // if (res.success) {
    //   if (res.data) {
    //     this.props.navigation.navigate('Advertisement', {force: 'VID_AWARD'})
    //   } else {
    //     // 不存在，直接领取
    //     let res = await Api_ReceiveAward('VID_AWARD', {loading: true})
    //     if (res.success) {
    //       showToast('领取成功')
    //     }
    //   }
    // }
    this.props.navigation.navigate('Advertisement', {force: 'VID_AWARD'})
  }
  showRedeem () {
    if (Number(this.state.redeemNotice.total) === 0) {
      showToast('对不起，您暂无可赎回的基金')
      return
    }
    Alert.alert(
      '赎回基金',
      `
        赎回总额： ${formatCurrency(this.state.redeemNotice.total)} \n
        最近一次申购时间： ${formatDate(this.state.redeemNotice.lastTime)} \n
        当前赎回手续费： ${this.state.redeemNotice.rate * 100} % \n
        下阶段赎回手续费： ${this.state.redeemNotice.nextRate * 100} % \n
        距离下阶段(天)： ${this.state.redeemNotice.nextRateNeedDays} \n
      `,
      [
        {text: '暂不赎回', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '确认赎回', onPress: () => this.redeem()},
      ],
      { cancelable: false }
    )
  }
  render () {
    const addon = [
      {
        label: '邀请收益',
        value: `${formatCurrency(this.state.statis.inviteTotal) || 0} VOCD`
      },
      {
        label: '投资收益',
        value: `${formatCurrency(this.state.statis.investTotal) || 0} VOCD`
      },
      {
        label: '奖金待分配量',
        value: `${formatCurrency(this.state.statis.waitAmount) || 0} VOCD`
      }
    ]
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <GainCard
            title='累计收益'
            total={`V ${formatCurrency(Number(this.state.statis.inviteTotal) + Number(this.state.statis.investTotal))}`}
            usd={`≈ ${(Number(this.state.statis.inviteTotal) + Number(this.state.statis.investTotal)) * Number(this.state.statis.value)} USD`}
            role={`${this.state.statis.role}`}
            gpDowngraded={this.state.statis.gpDowngraded}
            addon={addon}
            notGet={this.state.statis.notGet}
            get={this.get.bind(this)}
          />
          <Text style={{color: colors.font.main, marginTop: 10, alignSelf: 'flex-end', fontSize: fontSize.small}}>48小时未领取将返还收益池重新分配</Text>
        </View>
        <View style={styles.btns1}>
          {/* <ButtonIcon 
            pressFun={() => this.props.navigation.navigate('Luck')}
            text='LUCKY30'
          />
          <ButtonIcon
            pressFun={() => this.props.navigation.navigate('Profit')}
            text='Top30'
          />
          <ButtonIcon
            pressFun={() => this.props.navigation.navigate('GpWard')}
            text='GP奖励'
          /> */}
          <ButtonIcon
            pressFun={() => this.props.navigation.navigate('VockWard')}
            text='VOCK奖励'
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 24, paddingRight: px.paddingContent, paddingLeft: px.paddingContent, justifyContent: 'space-between'}}>
          <View style={styles.unit}>
            <Text style={styles.label}>申购总额</Text>
            <Text style={styles.value}>{formatCurrency(this.state.statis.subTotal)}</Text>
          </View>
          <View style={styles.unit}>
            <Text style={styles.label}>旗下申购</Text>
            <Text style={styles.value}>{formatCurrency(this.state.statis.allSubTotal)}</Text>
          </View>
        </View>
        <View style={styles.btns2}>
          <ButtonGhost
            text='赎回基金'
            pressFun={this.showRedeem.bind(this)}
          ></ButtonGhost>
          <ButtonGhost
            text='我的VID'
            pressFun={this.myVid.bind(this)}
          ></ButtonGhost>
          <ButtonGhost
            text='申购基金'
            pressFun={this.subscribe.bind(this)}
          ></ButtonGhost>
        </View>
        <View style={styles.tabsContainer}><GainTabsWithTableData inviteData={this.props.data} investData={this.props.data2} changeIndex={this.props.changeIndex}/></View>
      </View>
    )
  }
}

const Api_InviteList_Page = async (options: any) => {
  let res = await Api_InviteList(options)
  return Promise.resolve(res)
}
const Api_InvestList_Page = async (options: any) => {
  let res = await Api_InvestList(options)
  return Promise.resolve(res)
}

export default HocRequestAndMore(VidAccount, Api_InviteList_Page, Api_InvestList_Page)