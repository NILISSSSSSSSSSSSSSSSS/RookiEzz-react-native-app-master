//  定义action type常量
//  定义store
//  定义action函数
import {_currentList, defaultState, _action, _actionCreator} from '../Constant/stateType'
const SET_CURRENT = 'SET_CURRENT'

export default (state: _currentList = defaultState.currentList, action: _action): _currentList => {
  if (!state) {
    return
  }
  console.log(action)
  switch (action.type) {
    case SET_CURRENT:
      return action.currentList
    default:
      return state
  }
}

export const setCurrent: _actionCreator = (currentList: _currentList) => {
  return {
    type: SET_CURRENT,
    currentList: currentList
  }
}