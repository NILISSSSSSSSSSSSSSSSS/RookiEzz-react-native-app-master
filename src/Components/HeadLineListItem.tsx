import React, {Component} from 'react'
import { Text, StyleSheet, View, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { colors, fontSize, px } from '../Constant/style';
import { encryption } from '../Tools/utils'

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4
  },
  hasBg: {
    backgroundColor: colors.listBg
  },
  tag: {
    borderRadius: 20
  }
})

interface Props {
  pressFun?: Function
  style?: object
  title: string
  date: string
  gain: number
  index: number
  vid: string
  nickname?: string
}

export default class HeadLineListItem extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.pressFun()} >
        <View style={[styles.container, this.props.style, this.props.index % 2 === 0? styles.hasBg: {}]}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18}}>
            <Text style={{color: colors.font.label, fontSize: fontSize.small}}>{this.props.nickname || `VID ${encryption(this.props.vid, 3)}`} 发布于{this.props.date}</Text>
            <LinearGradient
              style={styles.tag}
              colors={colors.btns.light.bg}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            >
              <Text style={{color: colors.font.main, textAlign: 'center', lineHeight: 23, paddingLeft: 8, paddingRight: 8}}>NEW</Text>
            </LinearGradient>
          </View>
          <Text style={{fontSize: fontSize.large, color: colors.font.main, lineHeight: 24}}>{this.props.title}</Text>
          <View style={{marginTop: 22, flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text style={{marginRight: 12, color: colors.font.explain}}>观看收益</Text>
            <Text style={{color: colors.font.explain}}>{this.props.gain} VOCD/次</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}