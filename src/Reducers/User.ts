//  定义action type常量
//  定义store
//  定义action函数
const SET_USER_BASE = 'SET_USER_BASE'
import {_action, _user, defaultState, _actionCreator} from '../Constant/stateType'
import { _setItem } from '../Tools/Storage';

export default (state: _user = defaultState.user, action: _action): _user => {
  if (!state) {
    return
  }
  switch (action.type) {
    case SET_USER_BASE:
      return action.baseInfo
    default:
      return state
  }
}

export const setUserBase: _actionCreator = (baseInfo: _user) => {
  return {
    type: SET_USER_BASE,
    baseInfo: baseInfo
  }
}