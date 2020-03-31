import React, {Component} from 'react'
import { Text, StyleSheet, View } from 'react-native';
import { colors, fontSize, px } from '../Constant/style';

const styles = StyleSheet.create({
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    margin: 8,
    borderWidth: 1,
    borderColor: colors.tagBg,
    borderRadius: px.radiusSmall
  },
  text: {
    height: 25,
    lineHeight: 25,
    color: colors.font.main,
    fontSize: fontSize.normal
  }
})

interface Props {
  text: string
  isSelected?: boolean
}

export default class Tag extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <View style={[styles.tag, {backgroundColor: this.props.isSelected? colors.tagBg: 'transparent'}]}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    )
  }
}