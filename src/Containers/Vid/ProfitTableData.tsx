import React, {Component, ReactElement} from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import TableList from '../../Components/TableList'
import Tabs from '../../Components/Tabs'
import { formatDate, formatCurrency } from '../../Tools/utils'
const styles = StyleSheet.create({
})
interface Props {
  rankList: Array<any>
  mine: Array<any>
  changeIndex: Function
}

export default class ProfitTableData extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    const tabs = [
      {
        title: '上次排名'
      },
      {
        title: '我的奖励'
      }
    ]
    const rankListField = [
      {label: '名次', key: 'index_custom'},
      {label: 'VID', key: 'vid'},
      {
        label: '奖金',
        key: 'amount',
        formate: data => formatCurrency(data)
      }
    ]
    const rankListTableComp = (
      <View>
        <TableList 
          field = {rankListField}
          data = {this.props.rankList}
        />
      </View>
    )
    const mineField = [
      {
        label: '日期',
        key: 'createTime',
        formate: data => formatDate(data)
      },
      {
        label: '奖金',
        key: 'amount',
        formate: data => formatCurrency(data)
      },
      {
        label: '状态',
        key: 'hasGet', 
        formate: data => data? '已领取': '尚未领取'
      }
    ]
    const mineTableComp = (
      <View>
        <TableList 
          field = {mineField}
          data = {this.props.mine}
        />
      </View>
    )
    const tabContentArray = [
      (rankListTableComp),
      (mineTableComp)
    ]
    return (
      <Tabs
        changeIndex={this.props.changeIndex}
        tabs={tabs}
        tabContentArray={tabContentArray}
      />
    )
  }
}