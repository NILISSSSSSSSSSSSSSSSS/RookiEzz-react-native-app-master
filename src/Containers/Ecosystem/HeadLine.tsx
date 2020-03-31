import React, {Component} from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { px, App } from '../../Constant/style';
import HeadLineListItem from '../../Components/HeadLineListItem'
import HocRequestAndMore from '../../Components/HocRequestAndMore'
import { Api_List } from '../../Apis/Bid';
import {formatDate} from '../../Tools/utils'
import store from '../../Reducers/'
interface Props {
  navigation: any
  data: Array<any>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg
  }
})

class HeadLine extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  inputAmount() {}
  goAd (adId: string) {
    if (!store.getState().user.vid) {
      this.props.navigation.navigate('Vid')
      return
    }
    this.props.navigation.navigate('Advertisement', {adId: adId, force: false})
  }
  render () {
    return (
        this.props.data.map((item, index) =>
            <HeadLineListItem
              pressFun={() => this.goAd(item._id)}
              index={index}
              key={item._id}
              date={formatDate(item.createTime)}
              title={item.title}
              gain={item.viewAward}
              vid={item.vid}
              nickname={item.nickname}
            />
          )
    )
  }
}

export default HocRequestAndMore(HeadLine, Api_List)