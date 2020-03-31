import {NavigationActions} from 'react-navigation';

// reference : https://reactnavigation.org/docs/navigating-without-navigation-prop.html
// 该服务作为单例模式使用，用于记录顶层导航器，这样在应用的各个部分，各个屏幕组件内部，
// 或者任何屏幕组件之外的其他服务逻辑/工具逻辑中，都可以使用该服务的 navigate() 方法导航到目标屏幕，
// 类似于在某个屏幕组件中使用 this.props.navigation.navigate 函数进行的屏幕切换

// 用于记录所使用的导航器
let _navigator;


/**
 * 记录所使用的导航器
 * @param navigatorRef
 */
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

/**
 * 导航到目标路由/屏幕
 * @param routeName
 * @param params
 */
function navigate(routeName: string, params: object) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

export default {
    navigate,
    setTopLevelNavigator
}