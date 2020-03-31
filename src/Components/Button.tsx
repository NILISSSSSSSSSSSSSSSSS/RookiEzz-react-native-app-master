import React, {Component} from 'react'
import { TouchableHighlight, Text, View, StyleSheet, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {colors, px} from '../Constant/style'

interface Props {
  type: string
  style?: object
  disabled?: boolean
  pressFun: Function
}

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
  btn: {
    width: width - px.paddingContent * 2,
    height: 40,
    lineHeight: 40,
    textAlign: 'center'
  },
  btnContainer: {
    borderRadius: px.radius
  }
})
export default class Button extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <TouchableHighlight 
      onPress={() => (!this.props.disabled) && this.props.pressFun()}
      style={this.props.style}>
        {
          this.props.type==='light'?
          (<LinearGradient
            style={styles.btnContainer}
            colors={colors.btns[this.props.type].bg}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            >
            <Text style={[{ color: colors.btns[this.props.type].color }, styles.btn]}>{this.props.children}</Text>
          </LinearGradient>):
          <View style={[{ backgroundColor: colors.btns[this.props.type].bg }, styles.btnContainer]}>
            <Text style={[{ color: colors.btns[this.props.type].color }, styles.btn]}>{this.props.children}</Text>
          </View>
        }
      </TouchableHighlight>
    )
  }
}