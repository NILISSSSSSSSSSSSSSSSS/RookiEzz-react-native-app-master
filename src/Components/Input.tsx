import React, {Component} from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import Line from './Line'
import {colors, fontSize, px} from '../Constant/style'

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  label: {
    color: colors.font.label,
    fontSize: fontSize.small
  },
  input: {
    fontSize: fontSize.normal
  }
})

interface Props {
  onFocus?: Function
  editable?: boolean
  style?: object
  label: string
  numberOfLines?: number
  textChange?: Function
  multiline?: boolean
  value?: string
  secureTextEntry?: boolean
  type?: any
  right?: React.ReactElement
  minHeight?: number
  laeblAddon?: React.ReactElement
  inputTextColor?: string
}

export default class Input extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <View style={this.props.style}>
        <Text style={styles.label}>{this.props.label}{this.props.laeblAddon || null}</Text>
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
          <TextInput
            onFocus={() => this.props.onFocus? this.props.onFocus(): null}
            style={[styles.input, {color: this.props.inputTextColor || colors.font.main, minHeight: this.props.minHeight || 30, width: this.props.right? (width - 2 * px.paddingContent - 40): (width - 2 * px.paddingContent)}]}
            numberOfLines={this.props.numberOfLines}
            multiline={this.props.multiline}
            secureTextEntry={this.props.secureTextEntry === undefined? false: this.props.secureTextEntry}
            editable={this.props.editable === undefined? true: this.props.editable}
            onChangeText={(text) => this.props.textChange(text)}
            value={this.props.value}
            keyboardType={this.props.type || 'default'}
          />
          <View style={{alignSelf: 'center'}}>{this.props.right}</View>
        </View>
        
        <Line />
        
      </View>
    )
  }
}