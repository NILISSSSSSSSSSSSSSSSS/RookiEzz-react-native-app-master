import { Tabs } from '@ant-design/react-native';
import React, {Component, ReactElement} from 'react'
import { Text, StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { colors, fontSize, px } from '../Constant/style';
import { TabData } from '@ant-design/react-native/lib/tabs/PropsType';

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingLeft: px.paddingContent,
    marginBottom: 20
  },
  underline: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#CFA56A',
    marginTop: 5
  },
  nounder: {
    width: 8,
    height: 8,
    opacity: 0,
    marginTop: 5
  },
  curTabText: {
    color: colors.font.main
  },
  tabText: {
    color: colors.font.label
  },
  content: {
    flexDirection: 'row'
  },
  contentCell: {
    width: width
  }
})

interface Props {
  tabs: TabData[]
  tabContentArray: Array<ReactElement>
  changeIndex: Function
}

interface State {
  tabIndex: number,
  transformStyle: number
}

export default class TabsCustom extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      tabIndex: 0,
      transformStyle: 0
    }
  }
  renderUnderline () {
    return (
      null
    )
  }
  changeTab (index) {
    if (index === this.state.tabIndex) {
      return
    }
    //  设置动画移动方向
    this.setState({
      tabIndex: index,
      transformStyle: -1 * (index) * width
    })
    this.props.changeIndex(index)
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          {this.props.tabs.map((item, index) => (
            <TouchableWithoutFeedback key={index} onPress={() => this.changeTab(index)}>
              <View style={{alignItems: 'center', marginRight: 50}}>
                <Text style={index === this.state.tabIndex? styles.curTabText: styles.tabText}>{item.title}</Text>
                <View style={index === this.state.tabIndex? styles.underline: styles.nounder}></View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <View style={[styles.content, {transform: [{translateX: this.state.transformStyle}]}]}>
          {this.props.tabContentArray.map((item, index) => (
            <View key={index} style={styles.contentCell}>
              {item}
            </View>
          ))}
        </View>
      </View>
    )
  }
}