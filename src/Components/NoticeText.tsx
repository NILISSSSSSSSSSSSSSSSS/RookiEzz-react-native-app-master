import React, {Component} from 'react'
import { Text, StyleSheet, View } from 'react-native';
import { colors, fontSize, px } from '../Constant/style';

const styles = StyleSheet.create({
  text: {
    color: colors.font.explain,
    fontSize: fontSize.small
  }
})

interface Props {
  style?: object
  text: string
}

export default class NoticeText extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <Text style={[this.props.style, styles.text]}>{this.props.text}</Text>
    )
  }
}