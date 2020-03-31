import React, { Component } from 'react'
import store from '../../Reducers/'
import VidAccount from './VidAccount'
import Vid from '../Vid/Vid'
interface Props {
  navigation: any
}
interface State {
  hasVid: boolean
}
export default class VidOrAccount extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      hasVid: true
    }
  }
  private _navListener
  componentWillUnmount () {
    this._navListener.remove()
  }
  componentWillMount () {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      console.log('store.getState().user.vid', Boolean(store.getState().user.vid))
      if (!store.getState().user.vid) {
        this.setState({
          hasVid: false
        })
      } else {
        this.setState({
          hasVid: true
        })
      }
    })
  }
  render () {
    return (
      this.state.hasVid? <VidAccount {...this.props}/>: <Vid {...this.props}/>
    )
  }
}