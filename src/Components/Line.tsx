import React, {Component} from 'react'
import { View, Dimensions } from 'react-native'
import { colors, px } from '../Constant/style'

const width = Dimensions.get('window').width - 2 * px.paddingContent

interface Props {
  bg?: string
  width?: number
}
export default class Line extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {

    return (
      <View style={{height: 0.5, backgroundColor: this.props.bg || colors.line.bg, width: this.props.width || width}}></View>
    )
  }
}