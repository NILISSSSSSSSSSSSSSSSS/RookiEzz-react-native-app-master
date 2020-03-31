import React, {Component} from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableHighlight } from 'react-native'
import {App, px, colors, fontSize} from '../../Constant/style'
import Button from '../../Components/Button'
import UnderLineLink from '../../Components/UnderLineLink'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    paddingTop: 0,
    paddingBottom: px.paddingContent
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
    marginTop: 48,
    paddingLeft: px.paddingContent,
    paddingRight: px.paddingContent,
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
export default class Vid extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  componentDidMount () {
    this.props.navigation.setParams({title: 'VID'})
  }
  beVid () {
    this.props.navigation.navigate('GetVid')
  }
  enterSquare () {
    this.props.navigation.navigate('Square')
  }
  render () {
    const listData = [
      {
        title: '什么是VOC会员VID',
        des: `
            VOC VID是基于对VOC项目及生态系统抱有信仰，通过以信任为基石的VID链接构建起共识生态，并且在生态中享有高额的理财回报。`
      },
      {
        title: '如何拥有VOC生态VID',
        des: `
            VOC VID的获取可以通过向已拥有VID的其他认证会员邀请的方式获取。任何拥有VID的会员都可以向其他人发起邀请。
            如果你身边没有已经拥有VID的会员您也可以通过我们的信任广场获取VID。`
      }
    ]
    return (
      <ScrollView  style={styles.container}>
        {listData.map((item, index) => {
          const boxBg = index % 2 === 1? styles.boxBg: {}
          return (
          <View key={index} style={[styles.box, boxBg]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.des}>{item.des}</Text>
          </View>
        )})}
        <View style={styles.btnContainer}><Button type='light' pressFun={this.beVid.bind(this)}>成为VID</Button></View>
        <TouchableHighlight 
          onPress={this.enterSquare.bind(this)}
          style={styles.linkContainer}>
          <UnderLineLink
            text='前往信任广场获取VID'
          />
        </TouchableHighlight>
      </ScrollView>
    )
  }
}