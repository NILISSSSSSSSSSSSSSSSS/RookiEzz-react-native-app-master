import React, {Component} from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ImageBackground } from 'react-native';
import { colors, fontSize, px, App } from '../../Constant/style';
import Line from '../../Components/Line'
import RowList from '../../Components/RowList'
import { Api_TrustNet } from '../../Apis/User';
import { formatCurrency } from '../../Tools/utils'

const {width} = Dimensions.get('window')
const contentWidth = width - 2 * (px.paddingContent + 23)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    padding: px.paddingContent,
    paddingTop: 0,
  },
  cardContainer: {
    backgroundColor: 'green',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 23,
    paddingRight: 23,
    borderRadius: px.cardRadius
  },
  lp: {
    color: '#683018',
    fontSize: fontSize.xl,
    marginLeft: 8,
    fontWeight: 'bold'
  },
  line1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  line1Content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  line1ContentList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  net: {},
  header: {
    marginBottom: 8,
    color: '#683018',
    fontSize: fontSize.small,
    fontWeight: 'bold'
  },
  rowListContainer: {
    marginTop: 17
  },
  rowCell: {
    flexDirection: 'column',
    width: 0.18 * contentWidth,
    alignItems: 'center'
  },
  label: {
    color: '#683018',
    fontSize: fontSize.small
  },
  value: {
    color: '#05020F',
    fontWeight: 'bold'
  }
})

interface Props {
  navigation: any
}
interface State {
  data: {
    directCount: Number
    gpCount: Number
    totalAmount: string
    role: String
    vid: string
    parentVid: string
  }
}
export default class Luck extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      data: {
        directCount: 0,
        gpCount: 0,
        totalAmount: '0',
        role: '',
        vid: '',
        parentVid: ''
      }
    }
  }
  componentDidMount () {
    this.getData()
  }
  async getData () {
    let res = await Api_TrustNet()
    if (res.success) {
      this.setState({
        data: res.data
      })
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.cardContainer}
          source={require('../../Images/goldCard.png')}
          imageStyle={{borderRadius: px.cardRadius}}>
          <View style={styles.line1}>
            <View style={styles.line1Content}>
              <Image source={require('../../Images/Diamond.png')} style={{width: 60, height: 60}}/>
              <Text style={styles.lp}>{this.state.data.role}</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <View style={styles.line1ContentList}>
                <Text style={styles.label}>旗下总额</Text>
                <Text style={[styles.value, {marginLeft: 10}]}>{formatCurrency(this.state.data.totalAmount)}</Text>
              </View>
              <View style={styles.line1ContentList}>
                <Text style={styles.label}>vid</Text>
                <Text style={[styles.value, {marginLeft: 10}]}>{this.state.data.vid}</Text>
              </View>
              <View style={styles.line1ContentList}>
                <Text style={styles.label}>上级vid</Text>
                <Text style={[styles.value, {marginLeft: 10}]}>{this.state.data.parentVid}</Text>
              </View>
            </View>
          </View>
          <View style={styles.net}>
            <Text style={styles.header}>信任网络</Text>
            <Line width={contentWidth} bg='#FFFFFF' />
            <View style={styles.rowListContainer}>
              <RowList>
                <View style={styles.rowCell} >
                  <Text style={styles.label}>直推</Text>
                  <Text style={styles.value}>{this.state.data.directCount}人</Text>
                </View>
                <View style={styles.rowCell} >
                  <Text style={styles.label}>GP</Text>
                  <Text style={styles.value}>{this.state.data.gpCount}人</Text>
                </View>
              </RowList>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}