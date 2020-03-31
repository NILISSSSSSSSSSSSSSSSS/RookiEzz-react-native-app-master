import React, {Component} from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableHighlight } from 'react-native'
import {App, px, colors, fontSize} from '../../Constant/style'
import Button from '../../Components/Button'
import store from '../../Reducers/'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    paddingTop: 0,
  },
  box: {
    paddingLeft: px.paddingContent,
    paddingRight: px.paddingContent,
    paddingTop: 10,
    paddingBottom: 15
  },
  boxBg: {
    backgroundColor: colors.listBg
  },
  title: {
    color: colors.font.main,
    fontSize: fontSize.xl
  },
  des: {
    color: colors.font.des,
    fontSize: fontSize.large,
    lineHeight: 25,
    marginTop: -10
  },
  btnContainer: {
    marginTop: 25
  },
  linkContainer: {
    marginTop: 30,
    paddingRight: px.paddingContent,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
interface Props {
  navigation: any
}
export default class ResonanceAndAuction extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  componentDidMount () {
    this.props.navigation.setParams({title: '沉淀&盲拍'})
  }
  auction () {
    if (store.getState().user.vid) {
      this.props.navigation.navigate('Auction')
    } else {
      this.props.navigation.navigate('Vid')
    }
  }
  render () {
    const listData = [
      {
        title: '通过沉淀获得VOCK',
        des: `
                沉淀是一种基于智能合约的公平公正的获取VOCK的途径，不需要你具备任何身份，只需要您拥有VOCK钱包，并且在VOCK钱包中充入了ETH即可参加，沉淀交易按照先到先得的方式进行`,
        button: {
          text: '前往沉淀',
          pressFun: () => this.props.navigation.navigate('Resonance')
        }
      },
      {
        title: '荷兰盲拍',
        des: `
                VOC每个月都会进行一次竞价拍卖，拍卖价为拍卖开始时沉淀价格的60%，所有VID持有者都可进行竞价拍卖，拍卖竞价结束后，按照价格依次拍卖成功获得VOCD`,
        button: {
          text: '前往盲拍',
          pressFun: this.auction.bind(this)
        }
      }
    ]
    return (
      <View style={styles.container}>
      <ScrollView >
        {listData.map((item, index) => {
          const boxBg = index % 2 === 1? styles.boxBg: {}
          return (
          <View key={index} style={[styles.box, boxBg]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.des}>{item.des}</Text>
            <View style={styles.btnContainer}><Button type='light' pressFun={item.button.pressFun}>{item.button.text}</Button></View>
          </View>
        )})}
      </ScrollView>
      </View>
    )
  }
}