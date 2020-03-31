import * as React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Text, DeviceEventEmitter, CameraRoll, Alert } from 'react-native'
import { px, colors, App, fontSize } from '../Constant/style'
import Icon from 'react-native-vector-icons/Ionicons'
import { captureScreen } from "react-native-view-shot";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import NavigationService from '../Tools/NavigationService'
import TabBar from './App/AppRoute'
import NewWallet from './NewWallet/NewWalletRoute'
import Recovery from './Recovery/RecoveryRoute'
import AppIndex from './AppIndex'
import WalletHistory from './Wallet/History'
import Transfer from './Wallet/Transfer'
import Resonance from './ResonanceAndAuction/Resonance'
import ResonanceStart from './ResonanceAndAuction/ResonanceStart'
import Auction from './ResonanceAndAuction/Auction'
import AuctionStart from './ResonanceAndAuction/AuctionStart'
import AuctionHistory from './ResonanceAndAuction/AuctionHistory'
import Square from './Vid/Square'
import Recruit from './Vid/Recruit'
import GetVid from './Vid/GetVid'
import QrCodeScanner from './Vid/QrCodeScanner'
import Vid from './Vid/Vid'
import MyVid from './Vid/MyVid'
import TrustNet from './Vid/TrustNet'
import Luck from './Vid/Luck'
import Profit from './Vid/Profit'
import GpWard from './Vid/GpWard'
import VockWard from './Vid/VockWard'
import Subscribe from './Vid/Subscribe'
import HeadLine from './Ecosystem/HeadLine'
import Advertisement from './Ecosystem/Advertisement'
import LinkUri from './Ecosystem/LinkUri'
import Bidding from './Ecosystem/Bidding'
import CreateAd from './Ecosystem/CreateAd'
import EditAd from './Ecosystem/EditAd'
import { showToast, AppConfig } from '../Tools/utils'
import store from '../Reducers/'
import {_clear, _getItem} from '../Tools/Storage'
import {setUserBase} from '../Reducers/User'
const styles = StyleSheet.create({
    header: {
        backgroundColor: App.bg,
        height: 70,
        paddingTop: 10,
        borderBottomWidth: 0,
        elevation: 0
    },
    headerTitle: {
        fontSize: fontSize.normal,
        color: colors.font.main
    },
    backTitle: {
        color: colors.font.main
    }
})

const captureAndSave = async () => {
    store.dispatch({type: 'SET_LOADING', loading: true})
    captureScreen({
        format: "jpg",
        quality: 0.8,
        result: "tmpfile"
    }).then(
        uri => {
            CameraRoll.saveToCameraRoll(uri, 'photo').then((res) => {
                store.dispatch({type: 'SET_LOADING', loading: false})
                showToast(`图片保存成功: ${res}`)
            }).catch((err) => {
                store.dispatch({type: 'SET_LOADING', loading: false})
                showToast(`图片保存失败: ${err}`)
            })
        },
        error => {
            store.dispatch({type: 'SET_LOADING', loading: false})
            showToast(`图片保存失败${error}`)
        }
    )
}
const exitAccount = async (navigation) => {
    Alert.alert(
        '',
        '是否确认退出账号？',
        [
            {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '确认', onPress: () => exitFun()},
        ],
    )
    const exitFun = async () => {
        await _clear()
        store.dispatch(setUserBase({}))
        navigation.navigate('Index')
    }
}
const navigationFun = ({navigation}, back=true, title='', headerRight=null) => {
    console.log(navigation)
    if (navigation.state.routes && navigation.state.routes[navigation.state.index].key === 'Wallet') {
        title = `钱包(${AppConfig.version})`
        headerRight = (
            <TouchableWithoutFeedback
                onPress={() => exitAccount(navigation)}>
                <Text style={{color: colors.font.main, paddingRight: px.paddingContent}}>退出</Text>
            </TouchableWithoutFeedback>
        
        )
    }
    // switch ((navigation.state.routes[navigation.state.index]["routes"])[(navigation.state.routes[navigation.state.index]["index"])].routeName) {
    // }
    const routes = navigation.state.routes
    // 通过params得到传进来的title，并赋值给headerTitle。
    let headerTitle
    if (title) {
        headerTitle = title
    } else {
        const params = routes ? routes[navigation.state.index].params : null
        headerTitle = params ? params.title : ''
    }
    return {
        headerTitle,
        headerLeft: back?
            (<View style={{marginLeft: px.paddingHeader}}>
                <Icon
                    onPress={()=>navigation.goBack()}
                    name="ios-arrow-round-back"
                    color="#ffffff"
                    size={26}
                    style={{paddingLeft: 10, paddingRight: 10}}
                />
            </View>)
            : null,
        headerRight
    }
}

const IndexNavigator = createStackNavigator({
    Index: {
        screen: AppIndex,
        navigationOptions: {
            header: null
        }
    },
    NewWallet: {
        screen: NewWallet,
        navigationOptions: (navigation) => navigationFun(navigation)
    },
    Recovery: {
        screen: Recovery,
        navigationOptions: (navigation) => navigationFun(navigation)
    }
}, {
    initialRouteName: 'Index',
    headerLayoutPreset: "center",
    mode: 'card',
    defaultNavigationOptions: {
        // headerTransparent: true, //不设置headerStyle才生效
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle
    }
})

const Navigator = createStackNavigator({
    
    Tabbars: {
        screen: TabBar,
        navigationOptions: (navigation) => navigationFun(navigation, false)
    },
    WalletHistory: {
        screen: WalletHistory,
        navigationOptions: (navigation) => navigationFun(navigation, true)
    },
    Transfer: {
        screen: Transfer,
        navigationOptions: (navigation) => navigationFun(navigation, true, '发送')
    },
    Resonance: {
        screen: Resonance,
        navigationOptions: (navigation) => navigationFun(navigation, true, '沉淀')
    },
    ResonanceStart: {
        screen: ResonanceStart,
        navigationOptions: (navigation) => navigationFun(navigation, true, '沉淀')
    },
    Auction: {
        screen: Auction,
        navigationOptions: (navigation) => navigationFun(navigation, true, '盲拍',
        <TouchableWithoutFeedback
            onPress={() => navigation.navigation.navigate('AuctionHistory')}
        >
            <Icon name="md-time" color="#ffffff" size={24} style={{marginRight: px.paddingHeader}}/>
        </TouchableWithoutFeedback>
        )
    },
    AuctionStart: {
        screen: AuctionStart,
        navigationOptions: (navigation) => navigationFun(navigation, true, '竞价拍卖')
    },
    AuctionHistory: {
        screen: AuctionHistory,
        navigationOptions: (navigation) => navigationFun(navigation, true, '盲拍历史')
    },
    Square: {
        screen: Square,
        navigationOptions: (navigation) => navigationFun(navigation, true, '信任广场',
            <TouchableWithoutFeedback
                onPress={() => navigation.navigation.navigate('Recruit')}
            >
                <Icon name="md-add" color="#ffffff" size={24} style={{marginRight: px.paddingHeader}}/>
            </TouchableWithoutFeedback>
        )
    },
    Recruit: {
        screen: Recruit,
        navigationOptions: (navigation) => navigationFun(navigation, true, '发布招募')
    },
    GetVid: {
        screen: GetVid,
        navigationOptions: (navigation) => navigationFun(navigation, true, '获得VID')
    },
    Vid: {
        screen: Vid,
        navigationOptions: (navigation) => navigationFun(navigation, true, 'VID', null)
    },
    QrCodeScanner: {
        screen: QrCodeScanner,
        navigationOptions: (navigation) => navigationFun(navigation, true, '扫描二维码',
            <TouchableWithoutFeedback
                onPress={() => {
                    DeviceEventEmitter.emit('openAlbumEvent')
                }}
            >
                <Text  style={{color: '#ffffff', marginRight: px.paddingHeader}}>相册</Text>
            </TouchableWithoutFeedback>
        )
    },
    MyVid: {
        screen: MyVid,
        navigationOptions: (navigation) => navigationFun(navigation, true, 'VID名片',
            <TouchableWithoutFeedback
                onPress={() => {captureAndSave()}}
            >
                <Icon name="md-camera" color="#ffffff" size={24} style={{marginRight: px.paddingHeader}}/>
            </TouchableWithoutFeedback>
        )
    },
    TrustNet: {
        screen: TrustNet,
        navigationOptions: (navigation) => navigationFun(navigation, true, '信任网络')
    },
    Luck: {
        screen: Luck,
        navigationOptions: (navigation) => navigationFun(navigation, true, 'LUCKY抽奖')
    },
    Profit: {
        screen: Profit,
        navigationOptions: (navigation) => navigationFun(navigation, true, 'TOP30')
    },
    GpWard: {
        screen: GpWard,
        navigationOptions: (navigation) => navigationFun(navigation, true, 'GP奖励')
    },
    VockWard: {
        screen: VockWard,
        navigationOptions: (navigation) => navigationFun(navigation, true, 'VOCK奖励')
    },
    Subscribe: {
        screen: Subscribe,
        navigationOptions: (navigation) => navigationFun(navigation, true, '申购基金')
    },
    HeadLine: {
        screen: HeadLine,
        navigationOptions: (navigation) => navigationFun(navigation, true, '头条', 
            <TouchableWithoutFeedback
                onPress={() => navigation.navigation.navigate('Bidding')}
            >
                <Icon name="md-menu" color="#ffffff" size={24} style={{marginRight: px.paddingHeader}}/>
            </TouchableWithoutFeedback>
        )
    },
    Advertisement: {
        screen: Advertisement,
        navigationOptions: (navigation) => navigationFun(navigation, true, '头条详情')
    },
    LinkUri: {
        screen: LinkUri,
        navigationOptions: (navigation) => navigationFun(navigation, true, '')
    },
    Bidding: {
        screen: Bidding,
        navigationOptions: (navigation) => navigationFun(navigation, true, '竞价头条')
    },
    CreateAd: {
        screen: CreateAd,
        navigationOptions: (navigation) => navigationFun(navigation, true, '发布头条')
    },
    EditAd: {
        screen: EditAd,
        navigationOptions: (navigation) => navigationFun(navigation, true, '编辑头条')
    }
}, {
    initialRouteName: 'Tabbars',
    headerLayoutPreset: "center",
    mode: 'card',
    defaultNavigationOptions: {
        // headerTransparent: true, //不设置headerStyle才生效
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle
    }
})

// navigationOptions: ({navigation}) => {
//     const routes = navigation.state.routes
//     // 通过params得到传进来的title，并赋值给headerTitle。
//     const params = routes ? routes[navigation.state.index].params : null
//     const headerTitle = params ? params.title : ''
//     const headerStyle = styles.header
//     const headerTitleStyle = styles.headerTitle
//     return {
//         headerStyle,
//         headerTitleStyle,
//         headerTitle
//     }
// }


const SwitchContainer = createSwitchNavigator(
    {
        Index: IndexNavigator,
        App: Navigator,
    },
    {
        initialRouteName: 'App',
    }
)

const AppContainer = createAppContainer(SwitchContainer)

export default class TabContainer extends React.Component {
    render () {
        return (
            <AppContainer ref={(navigatorRef) => {NavigationService.setTopLevelNavigator(navigatorRef)}}></AppContainer>
        )
    }
}