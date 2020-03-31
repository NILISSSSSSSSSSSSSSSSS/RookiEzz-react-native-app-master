import React, {Component} from 'react'
import { View, Text, TextInput, StyleSheet, Picker } from 'react-native'
import Line from './Line'
import {colors, fontSize} from '../Constant/style'

const styles = StyleSheet.create({
  label: {
    color: colors.font.label,
    fontSize: fontSize.small
  },
  input: {
    color: colors.font.main,
    fontSize: fontSize.normal
  }
})

interface Props {
  style?: object
  label: string
  value: string
  change: Function
  itemArray: Array<any>
}

export default class Input extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <View style={this.props.style}>
        <Text style={styles.label}>{this.props.label}</Text>
        <Picker
          mode="dropdown"
          selectedValue={this.props.value}
          onValueChange={(value) => this.props.change(value)}>
          {this.props.itemArray.map(item => (
            <Picker.Item  key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
        <Line />
      </View>
    )
  }
}