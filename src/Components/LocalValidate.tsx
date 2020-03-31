import React, {Component} from 'react'
import { Text, StyleSheet, View } from 'react-native';
import { colors, fontSize } from '../Constant/style';

const styles = StyleSheet.create({
  text: {
    height: 25,
    lineHeight: 25,
    color: colors.font.error,
    fontSize: fontSize.small,
    marginTop: 5
  }
})

interface Props {
  text: string
}

export default class LocalValidate extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <Text style={styles.text}>{this.props.text}</Text>
    )
  }
}