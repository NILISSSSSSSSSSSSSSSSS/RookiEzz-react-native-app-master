import React, {Component, ReactElement} from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import TableList from '../../Components/TableList'
import { colors } from '../../Constant/style';
import { Api_Records } from '../../Apis/User';
import { tradeType } from '../../Constant/enum'
import { formatCurrency, formatDate } from '../../Tools/utils'
const styles = StyleSheet.create({
  rowList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
interface Props {
  data: Array<any>
  vid: any
}
interface State {
}
export default class RecentTradeList extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
  }
  componentWillReceiveProps (nextProps) {
  }
  componentDidMount () {
    // this.getData({page: 0, limit: 10})
  }
  render () {
    
    const field = [
      {
        label: '日期',
        key: 'createTime',
        formate: data => formatDate(data, {timezone: '0', time: true}) //给账本数据设置服务器时间，不加时区，数据库数据错误导致
      },
      {
        label: '类型',
        key: 'reason',
        formate: data => tradeType[data]
      },
      {
        label: '收支',
        key: ['changeAmount', 'currency'],
        formate: (data)=>{
          let style = {}
          if (data[0].indexOf('-') > -1) {
            style = {color: colors.font.sell}
          } else {
            style = {color: colors.font.buy}
          }
          return <Text style={[style]}>{formatCurrency(data[0])} {data[1]}</Text>
        }
      }
    ]
    return (
      <TableList
        tableName={`最近交易 ${this.props.vid? `(vid: ${this.props.vid})`: null}`}
        data={this.props.data}
        field={field}
      />
    )
  }
}