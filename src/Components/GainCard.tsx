import React, {Component} from 'react'
import { Text, StyleSheet, View, Image, TouchableWithoutFeedback, ImageBackground, Dimensions, Alert } from 'react-native';
import { colors, fontSize, px } from '../Constant/style';
import Icon from 'react-native-vector-icons/Feather'

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 23,
    borderRadius: px.cardRadius,
    position: 'relative'
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  gain: {
    alignItems: 'flex-start',
    maxWidth: 0.5 * width
  },
  titleText: {
    color: '#683018'
  },
  currencyText: {
    color: '#05020F',
    paddingRight: 50,
    fontSize: fontSize.xl
  },
  usdText: {
    color: '#683018',
    fontSize: fontSize.xs
  },
  role: {
    flexDirection: 'row',
    marginRight: 20
  },
  roleText: {
    marginLeft: 10,
    fontSize: fontSize.xl,
    includeFontPadding: false
  },
  addon: {
    alignItems: 'flex-start',
    marginTop: 25
  },
  addonCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  addonLabel: {
    color: '#683018',
    fontSize: fontSize.small,
    includeFontPadding: false,
    marginRight: 15
  },
  addonValue: {
    color: '#05020F',
    includeFontPadding: false,
    fontSize: fontSize.normal
  },
  get: {
    position: 'absolute',
    right: 0
  },
  text: {
    color: colors.font.explain,
    fontSize: fontSize.small
  }
})

interface Props {
  style?: object
  title: string
  total: string
  usd: string
  role: string
  gpDowngraded?: boolean
  addon: any
  get: Function
  notGet: string
}

interface State {
  getBtnTop: number
}

export default class GainCard extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      getBtnTop: 0
    }
  }
  private popover
  showPop () {
    Alert.alert(
      '',
      '当您的身份由GP降LP时，说明您的信任网络中有新产生的GP，且旗下申购基金已不足50万VOCD，此时，不再享受每天ETH分红资格；不再拥有GP股东收益权限，直到旗下申购基金再次≥50万（除去GP）VOCD时再恢复GP股东收益',
      [{text: '确认'}]
    )
  }
  get () {
    this.props.get()
  }
  _onLayout (e: any) {
    let {height} = e.nativeEvent.layout
    this.setState({
      getBtnTop:  height / 2 - 40
    })
  }
  componentDidMount () {

  }
  render () {
    return (
      <ImageBackground source={require('../Images/goldCard.png')} imageStyle={{ borderRadius: px.cardRadius }} style={styles.container} onLayout={(e) => this._onLayout(e)}>
        <View style={styles.head}>
          <View style={styles.gain}>
            <Text style={styles.titleText}>{this.props.title}</Text>
            
            {/* <View style={{alignSelf: 'flex-end'}}><Text style={{fontSize: fontSize.small}}>{this.props.usd}</Text></View> */}
          </View>
          <View style={styles.role}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../Images/Diamond.png')}
            />
            <Text style={styles.roleText}>{this.props.role}</Text>
            {this.props.gpDowngraded && <Icon style={{marginLeft: 5}} name="help-circle" size={16} color={colors.font.main} onPress={this.showPop.bind(this)}/>}
          </View>
        </View>
        <Text style={styles.currencyText}>{this.props.total}</Text>
        <View style={styles.addon}>
          {this.props.addon.map(item => (
            <View key={item.label} style={styles.addonCell}>
              <Text style={styles.addonLabel}>{item.label}</Text>
              <Text style={styles.addonValue}>{item.value}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.get, {top: this.state.getBtnTop}]}>
        {Number(this.props.notGet) === 0?
          <Image
            style={{width: 40, height: 80}}
            source={require('../Images/get-na.png')}
          />:
          <TouchableWithoutFeedback onPress={this.get.bind(this)}>
            <Image
              style={{width: 40, height: 80}}
              source={require('../Images/get.png')}
            />
          </TouchableWithoutFeedback>
        }
        </View>
      </ImageBackground>
    )
  }
}