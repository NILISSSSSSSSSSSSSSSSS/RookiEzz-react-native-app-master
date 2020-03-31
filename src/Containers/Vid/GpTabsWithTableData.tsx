import React, {Component, ReactElement} from 'react'
import { Text, StyleSheet, View } from 'react-native';
import { colors, fontSize, px } from '../../Constant/style';
import Tabs from '../../Components/Tabs'
import TableList from '../../Components/TableList'
import { formatDate, formatCurrency } from '../../Tools/utils';

const styles = StyleSheet.create({
})

interface Props {
  current: Array<any>
  mine: Array<any>
  changeIndex: Function
}

export default class GpTabsWithTableData extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    const tabs = [
      {
        title: '最近奖单'
      },
      {
        title: '我的奖励'
      }
    ]
    const currentField = [
      {
        label: '时间',
        key: 'createTime',
        formate: data => formatDate(data)
      },
      {label: 'VID', key: 'vid'},
      {
        label: '奖金',
        key: 'amount',
        formate: data => formatCurrency(data)
      }
    ]
    const currentTableComp = (
      <View>
        <TableList 
          field = {currentField}
          data = {this.props.current}
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
      (currentTableComp),
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