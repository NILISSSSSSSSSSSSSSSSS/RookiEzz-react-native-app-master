import React, {Component} from 'react'
import { Text, StyleSheet, View, Dimensions, TextInput } from 'react-native';
import { colors, fontSize, px } from '../Constant/style';
import { Api_Asset } from '../Apis/User';
import { formatCurrency, inputFloat } from '../Tools/utils';

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 100
  },
  left: {
    width: width * 0.6,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: colors.line.bg,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  right: {
    width: width * 0.4 - 22 - px.paddingContent
  },
  explainFont: {
    color: colors.font.explain,
    fontSize: fontSize.normal
  }
})

interface Props {
  currency: string
  textChange: Function
  getBanlance?: Function
  banlanceCurrency?: string
}

interface State {
  banlance: string
  amount: string
}

export default class InputWithBanlance extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      banlance: '0',
      amount: '0',
    }
  }
  componentDidMount () {
    this.getBanlance()
  }
  textChange (value) {
    const amount = inputFloat(value)
    this.setState({
      amount: amount
    })
    this.props.textChange(amount)
  }
  async getBanlance () {
    let res = await Api_Asset([this.props.banlanceCurrency || 'VOCD'])
    if (res.success && res.data.length > 0) {
      this.setState({
        banlance: res.data[0].available
      })
      this.props.getBanlance(res.data[0].available)
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <TextInput
            style={{height: 100, flex: 1, fontSize: 30, color: colors.font.main, textAlign: 'center'}}
            value={this.state.amount}
            onChangeText={(text) => this.textChange(text)}
          />
          <View style={{alignSelf: 'flex-end'}}><Text style={styles.explainFont}>{this.props.currency}</Text></View>
        </View>
        <View style={styles.right}>
          <Text style={styles.explainFont}>可用余额</Text>
          <Text style={styles.explainFont} numberOfLines={2} ellipsizeMode='tail'>{this.props.banlanceCurrency || 'V'} {formatCurrency(this.state.banlance)}</Text>
        </View>
      </View>
    )
  }
}