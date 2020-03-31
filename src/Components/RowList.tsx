import React, {Component} from 'react'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  rowList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

interface Props {
}

export default class RowList extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <View style={styles.rowList}>{this.props.children}</View>
    )
  }
}