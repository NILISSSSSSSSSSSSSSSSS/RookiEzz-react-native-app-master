import React, {Component} from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { colors, fontSize, px, App } from '../../Constant/style';
import TableList from '../../Components/TableList'
import HocRequestAndMore from '../../Components/HocRequestAndMore'
import { Api_TrustList } from '../../Apis/Trust';
import { formatDate } from '../../Tools/utils';

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

class Square extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  goApplyVid (vid) {
    this.props.navigation.navigate('GetVid', {parentVid: vid})
  }
  render () {
    const field = [
      {
        label: 'VID',
        key: 'vid',
        textStyle: () => {
          return {color: '#FF6960'}
        }
      },
      {
        label: '身份',
        key: 'needPerson'
      },
      {
        label: '剩余',
        key: 'remainPerson',
        textStyle: (data) => {
          return `${data}人`
        }
      },
      {
        label: '截止',
        key: 'endTime',
        formate: (data) => {
          return formatDate(data)
        }
      },
      {
        label: '',
        key: 'vid',
        ownComp: ({vid}) => {
          return (<TouchableHighlight onPress={() => this.goApplyVid(vid)}><Text style={styles.join}>加入</Text></TouchableHighlight>)
        }
      }
    ]
    let data = []
    for(var i = 0; i < 30; i++) {
      data.push({
        createTime: "2019-08-11T01:53:30.615Z",
        endTime: "2019-08-16T01:53:30.615Z",
        isGp: false,
        isLp: true,
        needPerson: 2,
        remainPerson: 2,
        vid: "100057"
      })
    }
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

const Api_TrustList_Page = async (options: any) => {
  let res = await Api_TrustList(options)
  return Promise.resolve(res)
}
export default HocRequestAndMore(Square, Api_TrustList_Page)