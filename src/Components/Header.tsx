import React, {Component} from 'react'
import { Text, StyleSheet, View } from 'react-native';
import { colors, fontSize, px } from '../Constant/style';
import Icon from 'react-native-vector-icons'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: px.paddingHeader,
    paddingRight: px.paddingHeader,
    backgroundColor: 'transparent'
  },
  title: {
    // color: colors.font.main
  }
})

interface Props {
  back?: boolean
  title: string
}

export default class Header extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <View style={styles.container}>
        {this.props.back? <Icon name='ios-arrow-back' size={22} color={colors.font.main} />: <Text></Text>}
        <Text style={styles.title}>{this.props.title}</Text>
        {this.props.back? <Icon name='ios-arrow-back' size={22} color={colors.font.main} />: <Text></Text>}
      </View>
    )
  }
}