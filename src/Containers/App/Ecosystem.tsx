import React, {Component} from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import {App, px, colors, fontSize} from '../../Constant/style'
import EcosystemListItem from '../../Components/EcosystemListItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    padding: px.paddingContent,
    paddingTop: 0,
  }
})
interface Props {
  navigation: any
}

interface State {
  outerList: Array<any>
}

export default class Ecosystem extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      outerList: []
    }
  }
  private _navListener
  componentDidMount () {
    this.props.navigation.setParams({title: 'VOC生态'})
    this._navListener = this.props.navigation.addListener('didFocus', () => this.getOuterList())
  }
  getOuterList () {
    let _this = this
    fetch('https://dl.vocx.io/voc/dapp.json', {method: 'GET'}).
    then(response => {
      response.json().then(res => {
        console.log(res)
        _this.setState({
          outerList: res
        })
      })
    }).catch(e => {
      console.log(e)
    })
  }
  render () {
    const innerList = [
      {title: '竞价头条', label: '竞价发送头条', img: require('../../../src/Images/headLine.png') , isLink: true, pressFun: () => this.props.navigation.navigate('HeadLine')}
    ]
    return (
      <ScrollView style={styles.container}>
        {innerList.map(item => (
          <EcosystemListItem
            style={{marginBottom: 20}}
            key={item.title}
            title={item.title}
            label={item.label}
            isLink={item.isLink}
            img={item.img}
            pressFun={item.pressFun || null}
          />
        ))}
        {this.state.outerList.map(item => (
          <EcosystemListItem
            style={{marginBottom: 20}}
            key={item.title}
            title={item.title}
            label={item.label}
            img={item.img}
            navigation={this.props.navigation}
            uri={item.url}
          />
        ))}
      </ScrollView>
    )
  }
}