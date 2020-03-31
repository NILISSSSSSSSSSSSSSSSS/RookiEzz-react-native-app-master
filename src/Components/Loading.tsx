import React, {Component} from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux'
import {_state} from '../Constant/stateType'

interface Props {
  loading: boolean
}

class Loading extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  render () {
    return (
      <Spinner 
        visible={this.props.loading}
      />
    )
  }
}
const mapStateToProps = (state: _state) => {
  return {
    loading: state.system.loading
  }
}
export default connect(mapStateToProps)(Loading)