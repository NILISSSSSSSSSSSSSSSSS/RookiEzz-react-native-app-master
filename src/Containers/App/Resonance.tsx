import React, {Component} from 'react'
import { View, StyleSheet, Text, Dimensions, ImageBackground  } from 'react-native'
import {App, px, colors, fontSize} from '../../Constant/style'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import ResonanceBar from '../../Components/ResonanceBar'

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg
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
}
export default class Resonance extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  componentDidMount () {
    this.props.navigation.setParams({title: '沉淀'})
  }
  enter () {
    this.props.navigation.navigate('ResonanceStart')
  }
  inputWord () {}
  inputPwd () {}
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.total}>
          <Text style={[styles.label, {marginTop: 10}]}>累计沉淀</Text>
          <Text style={[styles.fontExplain, {marginRight: 10, marginTop: 10}]}>E</Text>
          <Text style={[{fontSize: fontSize.xxl, width: width*0.65, color: colors.font.main}]}>4,048,91</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: px.paddingContent, paddingRight: px.paddingContent}}>
          <View style={styles.unit}>
            <Text style={styles.label}>当前比率</Text>
            <Text style={styles.value}>1:983</Text>
          </View>
          <View style={styles.unit}>
            <Text style={[styles.label]}>剩余</Text>
            <Text style={styles.value}>123123</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: px.paddingContent, paddingRight: px.paddingContent}}>
          <View style={styles.unit}>
            <Text style={styles.label}>我的余额</Text>
            <Text style={styles.value}>20.1222</Text>
          </View>
          <View style={styles.unit}>
            <Text style={styles.label}>沉淀可得</Text>
            <Text style={styles.value}>123123</Text>
          </View>
        </View>
        <ResonanceBar />
        <ImageBackground source={require('../../Images/Graph.png')} style={{padding: px.paddingContent, paddingTop: 40, marginTop: 10, flex: 1}}><Button type='dark' pressFun={this.enter.bind(this)}>立即沉淀</Button></ImageBackground>
      </View>
    )
  }
}