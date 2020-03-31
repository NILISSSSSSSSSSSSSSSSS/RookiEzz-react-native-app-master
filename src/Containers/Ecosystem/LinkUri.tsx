import React, {Component} from 'react'
import { WebView } from 'react-native-webview';

interface Props {
  navigation: any
}

export default class LinkUri extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    let data = {}
    if (this.props.navigation.getParam('type') === 'html') {
      data = {html: this.props.navigation.getParam('data')}
    } else {
      data = {uri: this.props.navigation.getParam('uri')}
    }
    return (
      <WebView
        originWhitelist={['*']}
        source={data}
      />
    )
  }
}