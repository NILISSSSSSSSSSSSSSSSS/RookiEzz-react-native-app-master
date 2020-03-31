
import React, {Component} from 'react'
import { Text, StyleSheet, View } from 'react-native';
import { colors, fontSize, px } from '../Constant/style';

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingLeft: px.paddingContent
  },
  text: {
    color: colors.font.label,
    fontSize: fontSize.small
  }
})

interface Props {
  text: string
}

export default class SingleTableHeader extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <View style={styles.view}><Text style={styles.text}>{this.props.text}</Text></View>
    )
  }
}