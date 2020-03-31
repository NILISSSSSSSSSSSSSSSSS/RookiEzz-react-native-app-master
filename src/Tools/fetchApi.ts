import {showToast, resetNavigation} from '../Tools/utils'
import store from '../Reducers/'
import {_getItem, _setItem, _clear} from './Storage'
import NavigationService from './NavigationService'
import { setUserBase } from '../Reducers/User';


const baseUrl = 'http://app.vocx.io' //http://voc.test.net http://git-chainexcloud.tpddns.cn:8114 http://app.vocx.io http://192.168.0.182:6033
export default (url: string, options?: object, addOn: any) => {
  return new Promise(async (resolve, reject) => {
    if(addOn.loading) {
      store.dispatch({type: 'SET_LOADING', loading: true})
    }
    // store.dispatch({type: 'SET_LOADING', loading: true})
    url = `${baseUrl}${url}`
    let user = await _getItem('user')
    if (user) {
      console.log('userrrrrrrrrrr', user)
      user = JSON.parse(user)
      store.dispatch(setUserBase(user))
    }
    let token = store.getState().user.token
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        voctoken: token
      }
    }
    console.log('url地址', url)
    console.log('token', token)
    console.log('option参数', options)
    fetch(url, {...options, ...defaultOptions}).
    then(response => response.json()).
    then(jsonData => {
      console.log(`jsonData-${url}: `, jsonData);
      store.dispatch({type: 'SET_LOADING', loading: false})
      if (!jsonData.success) {
        if (jsonData.errcode === 'TOKEN_EXPIRE' || jsonData.errcode === 'ERR_UNAUTHORIZED') {
          NavigationService.navigate('Index', {})
          showToast('请先登录注册')
        } else {
          showToast(jsonData.message)
        }
      }
      return resolve(jsonData)
    }).
    catch(err => {
      console.log(err)
      store.dispatch({type: 'SET_LOADING', loading: false})
      showToast(err.message)
      return resolve({success: false})
    })
  })
}