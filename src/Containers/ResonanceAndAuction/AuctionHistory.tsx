import React, {Component} from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { colors, fontSize, px, App } from '../../Constant/style';
import TableList from '../../Components/TableList'
import HocRequestAndMore from '../../Components/HocRequestAndMore'
import { Api_BlindHistory } from '../../Apis/blind';
import { formatDate, formatCurrency } from '../../Tools/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    paddingBottom: px.paddingContent
  },
  join: {
    color: '#00BD9A',
    textDecorationLine: 'underline'
  },
  text: {
    height: 25,
    lineHeight: 25,
    color: colors.font.main,
    fontSize: fontSize.normal
  }
})

interface Props {
  navigation: any
  data: Array<any>
}

class AuctionHistory extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  goApplyVid () {
    this.props.navigation.navigate('GetVid')
  }
  endTime (dateObj) {
    dateObj = new Date(dateObj)
    const year = dateObj.getFullYear() + 1
    const month = dateObj.getMonth() + 1 < 10? `0${dateObj.getMonth() + 1}`: `${dateObj.getMonth() + 1}`
    const date = dateObj.getDate() < 10? `0${dateObj.getDate()}`: `${dateObj.getDate()}`
    return `${year}-${month}-${date}`

  }
  render () {
    const field = [
      {
        label: '时间',
        key: 'createTime',
        textStyle: () => {
          return {color: '#FF6960'}
        },
        formate: data => formatDate(data, {year: true})
      },
      {
        label: '赎回日',
        key: 'createTime',
        formate: data => this.endTime(data)
      },
      {
        label: '单价/数量',
        key: ['unitPrice', 'amount'],
        formate: (data) => {
          return (<View style={{alignSelf: 'flex-start'}}><Text>{formatCurrency(data[0])} ETH</Text><Text>{formatCurrency(data[1])} VOCD</Text></View>)
        }
      },
      {
        label: '',
        key: 'status',
        formate: (data) => {
          switch (data) {
            case 'PROCESS': 
              return <Text>竞拍中</Text>
            case 'FAIL': 
              return <Text style={{color: colors.font.label}}>竞拍失败</Text>
            case 'LOCK': 
              return <Text style={{textDecorationLine: 'line-through', color: '#34A9FF'}}>不可赎回</Text>
          }
        }
      }
    ]
    return (
      <View style={styles.container}>
        <TableList
          data = {this.props.data}
          field = {field}
        ></TableList>
      </View>
    )
  }
}

export default HocRequestAndMore(AuctionHistory, Api_BlindHistory)