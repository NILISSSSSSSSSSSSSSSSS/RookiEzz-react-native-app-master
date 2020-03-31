import React, {Component} from 'react'
import { createStackNavigator } from 'react-navigation'
import Recovery from './Recovery'
export default createStackNavigator({
  Recovery: {
    screen: Recovery,
    navigationOptions: {
      header: null
    }
  }
})