import React, {Component} from 'react'
import { Api_Asset } from '../Apis/User'

interface Props {
  navigation: any
}
interface State {
  banlance: Array<any>
}
export default (OldComp) => {
  class NewComp extends Component<{}, State> {
    constructor (props) {
      super(props)
      this.state = {
        banlance: []
      }
    }
    componentDidMount () {
      this.getData()
    }
    async getData () {
      let res = await Api_Asset(['VOCD', 'ETH'])
      if (res.success) {
        this.setState({
          banlance: res.data
        })
      }
    }
    render () {
      return (
        <OldComp asset={this.state.banlance} {...this.props}/>
      )
    }
  }
  return NewComp
}