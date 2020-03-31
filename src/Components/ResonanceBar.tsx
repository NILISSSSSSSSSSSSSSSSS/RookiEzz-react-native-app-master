import React, {Component} from 'react'
import { Text, StyleSheet, View, Dimensions, ScrollView, InteractionManager } from 'react-native';
import { colors, fontSize, px } from '../Constant/style';
import LinearGradient from 'react-native-linear-gradient'
const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  bar: {
    width: width * 0.15,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: colors.barBg,
    borderRadius: px.radius
  },
  remark: {
    textAlign: 'center',
    color: colors.font.explain,
    marginTop: 20
  },
  remarkCur: {
    textAlign: 'center',
    color: colors.font.main,
    marginTop: 20
  }
})

interface Props {
  layerList: Array<any>
  currentLayerIndex: number
  currentLayerDeliverToken: string
}

const heightArray = [200, 180, 160, 140, 120, 100, 80, 60, 40, 20, 10]
export default class ResonanceBar extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }

  private _scrollView = null
  private timer = null
  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
  }
  componentDidMount () {
    this.timer = setTimeout(() => {
      let x = this.props.currentLayerIndex * (width * 0.15 + 20)
      this._scrollView.scrollTo({x: x, y: 0, animated: true, duration: 500})
    }, 1);
  }

  isCurrentElement (currentLayerIndex: number, index: number) {
    if (this.props.layerList[index].tokenAmount === '0') {
      return null
    }
    if (index === currentLayerIndex) {
      const height = (Number(this.props.currentLayerDeliverToken) / this.props.layerList[index].tokenAmount) * heightArray[index]
      console.log('h', Number(this.props.currentLayerDeliverToken), this.props.layerList[index].tokenAmount)
      return (
        <LinearGradient
          style={{width: width * 0.15, height: height, position: 'relative', borderRadius: px.radius, top: heightArray[index] - height}}
          colors={colors.btns.light.bg}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
        ></LinearGradient>
      )
    }
    if (index < currentLayerIndex) {
      return (
        <LinearGradient
          style={{width: width * 0.15, height: heightArray[index], position: 'relative', borderRadius: px.radius, top: 0}}
          colors={colors.btns.light.bg}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
        ></LinearGradient>
      )
    }
  }
  render () {
    const mockData = this.props.layerList
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={(ref) => this._scrollView = ref}>
        <View style={styles.container}>
          {mockData.map((item, index) => {
            return (
              <View key={index}>
                <View style={[styles.bar, {height: heightArray[index]}]}>
                  {this.isCurrentElement(this.props.currentLayerIndex, index)}
                </View>
                <Text style={styles.remark}>1:{item.rate}</Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
      
    )
  }
}