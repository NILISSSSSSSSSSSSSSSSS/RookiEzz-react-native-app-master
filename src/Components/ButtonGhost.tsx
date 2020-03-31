import React, {Component} from 'react'
import { TouchableHighlight, Text, View, StyleSheet, Dimensions } from 'react-native'
import {colors, px, fontSize} from '../Constant/style'

interface Props {
  text: string,
  style?: object,
  pressFun: Function
}

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#141421',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: '#CFA56A',
    borderRadius: px.radius
  },
  btnText: {
    color: '#CFA56A',
    fontSize: fontSize.normal
  }
})
export default class ButtonGhost extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <TouchableHighlight 
        onPress={() => this.props.pressFun()}
        style={[this.props.style, styles.btn]}>
          <Text style={styles.btnText}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
}