import React, {Component} from 'react'
import {  View, Text, Dimensions, ART, StyleSheet } from 'react-native'
import { formatDate, expireTime, formatCurrency } from '../Tools/utils';
import {App, px, colors, fontSize} from '../Constant/style'

const {
  Surface,
  Shape,
  Group,
  Path
} = ART
const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  clock: {
    alignItems: 'center'
  },
  clockTextContainer: {
    position: "absolute",
    top: 55,
    alignItems: 'center',
    zIndex: 999999999
  },
})
interface Props {
  info: {
    blindStartTime: string
    blindEndTime: string
    highestPrice: string
    lowestPrice: string
    exchangeTotalAmount: string
    myUnitPrice: string
    myExchangeAmount: string
  },
  btnCanClickHandle: Function
}
interface State {
  artClock: any
  timer: any
  expireTime: string
}
export default class ArtClock extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      artClock: null,
      timer: null,
      expireTime: '00:00:00'
    }
  }
  componentDidMount () {
    console.log('componentDidMount: ');
    let timer = setInterval(this.artClock.bind(this), 1000)
    this.setState({
      timer
    })
  }
  componentWillUnmount () {
    clearInterval(this.state.timer)
  }
  componentWillMount () {
  }
  dataReverse (data) {
    return Number(data) === 0? 0: 1 / Number(data)
  }
  degreesToRadians(degrees) {
    if (degrees !== 0 && degrees % 360 === 0) { // 360, 720.
      return Math.PI * 2;
    }
    return (degrees * (Math.PI / 180)) % (Math.PI * 2);
  }
  createArcPath(startAngle, endAngle, or, startY) {
    const path = new Path();

    // 弧度角度
    const sa = this.degreesToRadians(startAngle);
    const ea = this.degreesToRadians(endAngle);

    // 以弧度表示的中心弧角
    const ca = sa > ea
      ? ((Math.PI * 2) - sa) + ea
      : ea - sa;

    // 正弦和餘弦值
    const ss = Math.sin(sa);
    const es = Math.sin(ea);
    const sc = Math.cos(sa);
    const ec = Math.cos(ea);

    // 對比差異
    const ds = es - ss;
    const dc = ec - sc;
    const dr = 0 - or;

    const large = ca > Math.PI;
    path.move(Dimensions.get('window').width * 0.6 / 2, startY) // 起點
      .arc(or * ds, or * -dc, or, or, large) // 外弧
    return path;
  }
  artClock () {
    console.log('计时器')
    let endDate = new Date(this.props.info.blindEndTime) as any
    let startDate = new Date(this.props.info.blindStartTime) as any
    let curDate = new Date() as any
    if (endDate <= curDate || startDate >= curDate) {
      this.props.btnCanClickHandle(false)
      return
    }
    let {hour, minute, second} = expireTime(this.props.info.blindStartTime, this.props.info.blindEndTime)
    this.props.btnCanClickHandle(true)
    this.setState({
      expireTime: `${hour}:${minute}:${second}`,
      artClock: this.drawAnimation()
    })
  }
  drawBackGround () {
    const width = Dimensions.get('window').width * 0.6
    const drawCircle = (radius: number, y: number, strokeWidth: number, color: string) => {
      let path = Path()
      path.moveTo(width / 2, y)
      .arc(0, radius * 4, radius)
      .arc(0, radius * -4, radius)
      return <Shape d={path} stroke={color} strokeWidth={strokeWidth} strokeCap="butt" />
    }
    const drawDevide = () => {
      let path = Path()
      let x0 = width / 2
      let y0 = 110
      for (let i = 0; i < 12; i++) {
        let rad = 2 * Math.PI / 12 * i
        let x = x0 + Math.cos(rad) * 103
        let y = y0 + Math.sin(rad) * 103
        path.moveTo(x0, y0).
        lineTo(x, y)
      }
      
      return <Shape d={path} stroke="rgba(255,255,255,.1)" strokeWidth={2} />
    }
    return (
      <Group>
        {drawCircle(40, 30, 6, '#252437')}
        {drawCircle(38, 34, 4, '#191A2A')}
        {drawCircle(50, 10, 8, '#252437')}
        {drawCircle(48, 14, 6, '#191A2A')}
        {/* {drawDevide()} */}
      </Group>
    )
  }
  drawAnimation () {
    let path = Path()
    let pathInner = Path()
    let pathLarge = Path()
    let pathLargeInner = Path()
    let {hour, minute, second} = expireTime(this.props.info.blindStartTime, this.props.info.blindEndTime)
    let endAngle = (60 - Number(second)) / 60 * 360
    let endAngleInner = endAngle
    let endDate = new Date(this.props.info.blindEndTime) as any
    let startDate = new Date(this.props.info.blindStartTime) as any
    let totalMinute = (endDate - startDate) / 1000 / 60
    let endAngleLarge = ( totalMinute - ( Number(minute) + Number(hour) * 60 ) )/ totalMinute * 360
    let endAngleLargeInner = endAngleLarge
    path = this.createArcPath(0, endAngle, 80, 30)
    pathInner = this.createArcPath(0, endAngleInner, 76, 34)
    pathLarge = this.createArcPath(0, endAngleLarge, 100, 10)
    pathLargeInner = this.createArcPath(0, endAngleLargeInner, 97, 12)
    return (
      <Group>
        <Shape d={path} stroke={'#51526B'} strokeWidth={6} strokeCap="butt" />
        <Shape d={pathInner} stroke={'#202033'} strokeWidth={4} strokeCap="butt"/>
        <Shape d={pathLarge} stroke={'#F7B627'} strokeWidth={8} strokeCap="butt" />
        <Shape d={pathLargeInner} stroke={'#584424'} strokeWidth={6} strokeCap="butt" />
      </Group>
    )
  }
  render () {
    return (
      <View style={styles.clock}>
        <Surface width={Dimensions.get('window').width * 0.6} height={Dimensions.get('window').width * 0.6}>
        <Group>
          {this.drawBackGround()}
          {this.state.artClock}
        </Group>
      </Surface>
        <View style={styles.clockTextContainer}>
            <Text style={{color: colors.font.main, fontSize: fontSize.xl, marginBottom: 5}}>{this.state.expireTime}</Text>
            <Text style={{color: colors.font.label, fontSize: fontSize.xs, marginBottom: 18}}>出价剩余时间</Text>
            <Text style={{color: '#F5FF30', fontSize: fontSize.xl, marginBottom: 5}}>{formatCurrency(this.props.info.highestPrice)}</Text>
            <Text style={{color: colors.font.label, fontSize: fontSize.xs}}>当前最高价</Text>
          </View>
      </View>
    )
  }
}