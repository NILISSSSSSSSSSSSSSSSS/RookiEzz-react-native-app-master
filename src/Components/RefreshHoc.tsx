import React, {Component} from 'react'
import { View, StyleSheet, Text, ImageBackground, ScrollView, RefreshControl } from 'react-native'
interface Props {
  navigation: any
}
interface State {
  refreshing: boolean
}

const RefreshHoc = (OldComp: any): any => {
  return OldComp
}

class Wallet extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      refreshing: false
    }
  }
}