import React, {Component} from 'react'
import { Text, StyleSheet, View } from 'react-native';
import { colors, fontSize, px } from '../../Constant/style';
import Tabs from '../../Components/Tabs'
import TableList from '../../Components/TableList'
import { formatDate, formatCurrency } from '../../Tools/utils'

const styles = StyleSheet.create({
})

interface Props {
  inviteData: Array<any>
  investData: Array<any>
  changeIndex: Function
}

export default class GainTabsWithTableData extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    const tabs = [
      {
        title: '邀请收益'
      },
      {
        title: '投资收益'
      }
    ]
    const inviteField = [
      {
        label: '日期',
        key: 'createTime',
        formate: data => formatDate(data)
      },
      {label: 'VID', key: 'invitedVid'},
      {label: '级别', key: 'role'},
      {
        label: '收益',
        key: 'amount',
        formate: data => formatCurrency(data)
      }
    ]
    const inviteTableComp = (
      <View>
        <TableList 
          field = {inviteField}
          data = {this.props.inviteData}
        />
      </View>
    )
    const investField = [
      {
        label: '日期',
        key: 'createTime',
        formate: data => formatDate(data, {minuteOver: true})
      },
      {
        label: '投资人收益',
        key: 'investor',
        formate: data => formatCurrency(data)
      },
      {
        label: '股东收益',
        key: 'stockholders',
        formate: data => formatCurrency(data)
      }
    ]
    const investTableComp = (
      <View>
        <TableList
          field={investField}
          data={this.props.investData}
        />
      </View>
    )
    const tabContentArray = [
      (inviteTableComp),
      (investTableComp)
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