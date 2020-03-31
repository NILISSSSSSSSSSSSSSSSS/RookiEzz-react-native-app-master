import React, {Component} from 'react'
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native'
import {colors, fontSize, px} from '../Constant/style'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: colors.listBg,
    borderRadius: px.radius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    marginTop: 20
  },
  RowFlexBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  currency: {
    color: colors.font.main,
    fontSize: fontSize.xl,
    fontWeight: 'bold'
  },
  price: {
    color: colors.font.active,
    fontSize: fontSize.small,
    textAlign: 'right'
  },
  whiteFont: {
    color: colors.font.main,
    fontSize: fontSize.large
  }
})

interface Props {
  style?: object
  currency: string
  amount: number
  price: number,
  pressFun: Function
  icon: any
}

export default class CurrencyListItem extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <TouchableHighlight onPress={() => this.props.pressFun()}>
        <View style={[this.props.style, styles.container]}>
          <View style={styles.RowFlexBox}>
            {this.props.icon}
            <Text style={styles.currency}>{this.props.currency}</Text>
          </View>
          <View style={styles.RowFlexBox}>
            <View style={{marginRight: 10}}>
              <Text style={styles.whiteFont}>{this.props.amount}</Text>
              <Text style={styles.price}>¥{this.props.price}</Text>
            </View>
            <Icon name='ios-arrow-forward' size={20} style={{color: colors.arrowColor}}/>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}