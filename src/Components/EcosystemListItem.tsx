import React, {Component} from 'react'
import { Text, StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import { colors, fontSize, px } from '../Constant/style';
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: px.radius,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.listBg,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4
  }
})

interface Props {
  navigation?: any
  pressFun?: Function
  style?: object
  title: string
  label: string
  img: any
  isLink?: boolean
  uri?: string
}

export default class EcosystemListItem extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  linkTo () {
    if (this.props.isLink) {
      this.props.pressFun()
    } else {
      this.props.navigation.navigate('LinkUri', {uri: this.props.uri})
    }
  }
  render () {
    return (
      <TouchableWithoutFeedback onPress={() => this.linkTo()} >
        <View style={[styles.container, this.props.style]}>
          <Image
            source={this.props.isLink? this.props.img: {uri: this.props.img}}
            style={{width: 30, height: 30, borderRadius: 10}}
          />
          <View style={{marginLeft: 28, flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
            <Text style={{marginBottom: 4, fontSize: fontSize.normal, color: colors.font.main}}>{this.props.title}</Text>
            <Text style={{color: colors.font.label}}>{this.props.label}</Text>
          </View>
          {this.props.isLink? <Icon name='ios-arrow-forward' color={colors.font.main} size={24}/>: null}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}