import React, {Component} from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { colors, fontSize, px } from '../Constant/style';
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#242537',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: px.radiusSmall
  },
  btnText: {
    color: colors.font.main,
    fontSize: fontSize.small
  }
})

interface Props {
  style?: any
  text: string
  pressFun: Function
}

export default class ButtonIcon extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <TouchableHighlight
        style={[styles.btn, this.props.style]}
        onPress={this.props.pressFun.bind(this)}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.btnText, {marginRight: 5}]}>{this.props.text}</Text>
          <Icon name='ios-arrow-dropright' color={styles.btnText.color} size={14}/>
        </View>
      </TouchableHighlight>
    )
  }
}