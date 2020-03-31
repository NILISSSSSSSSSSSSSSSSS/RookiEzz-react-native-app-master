import React, {Component} from 'react'

interface Props {
  [propName: string]: any
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor (props) {
    super (props as Props)
    this.state = {
      hasError: false
    }
  }
  static getDerivedStateFromError (error) {
    return{
      hasError: true
    }
  }
  componentDidCatch (error, info) {
    console.log(error, info)
  }
  render () {
    if (this.state.hasError) {
      return (<h1>Something Went Wrong!!</h1>)
    }
    return this.props.children
  }
}