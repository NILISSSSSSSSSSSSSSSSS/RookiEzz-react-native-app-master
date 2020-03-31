import React, {Component} from 'react'
import { createStackNavigator } from 'react-navigation'
import NewWalletPwd from './NewWalletPwd'
import NewWalletMnemonic from './NewWalletMnemonic'
import NewWalletLast from './NewWalletLast'
export default createStackNavigator({
  NewWalletPwd: {
    screen: NewWalletPwd,
    navigationOptions: {
      header: null
    }
  },
  NewWalletMnemonic: {
    screen: NewWalletMnemonic,
    navigationOptions: {
      header: null
    }
  },
  NewWalletLast: {
    screen: NewWalletLast,
    navigationOptions: {
      header: null
    }
  }
})