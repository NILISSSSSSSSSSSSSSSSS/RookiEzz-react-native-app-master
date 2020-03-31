import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Wallet from './Wallet';
import Ecosystem from './Ecosystem';
import ResonanceAndAuction from './ResonanceAndAuction';
import VidOrAccount from './VidOrAccount'
import { createBottomTabNavigator } from 'react-navigation';
import {colors, fontSize} from '../../Constant/style'

const styles = StyleSheet.create({
  tabBar: {
      backgroundColor: '#000'
  },
  labelStyle: {
    fontSize: fontSize.small,
    letterSpacing: 1
  }
})
export default createBottomTabNavigator({
  Wallet: {
      screen: Wallet,
      navigationOptions: () => TabOptions('md-wallet', '钱包')
  },
  ResonanceAndAuction: {
    screen: ResonanceAndAuction,
    navigationOptions: () => TabOptions('md-pulse', '共振沉淀')
  },
  VidOrAccount: {
      screen: VidOrAccount,
      navigationOptions: () => TabOptions('md-cube', 'VID')
  },
  Ecosystem: {
    screen: Ecosystem,
    navigationOptions: () => TabOptions('md-compass', '生态')
  }
},
{
  initialRouteName: 'Wallet',
  tabBarPosition :'bottom',//tab位置
  swipeEnabled :false,//是否可以滑动切换
  animationEnabled :false,//改变标签时是否进行动画制作
  tabBarOptions : {
    showLabel: false,
    style: styles.tabBar,
    labelStyle: styles.labelStyle,
    activeTintColor: colors.font.active, // label和icon的前景色 活跃状态下（选中）。
    inactiveTintColor:'#fff', // label和icon的前景色 不活跃状态下(未选中)。
  }
})

const TabOptions = (setIcon, tabBarLabel)=>{
  const {width} = Dimensions.get('window')
  const tabBarIcon = (({tintColor}) => {
      return(
        <View style={{width: width / 5,height: '100%',alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={setIcon} size={25} color={tintColor} />
        </View>
      )
  })
  return { tabBarIcon, tabBarLabel };
}