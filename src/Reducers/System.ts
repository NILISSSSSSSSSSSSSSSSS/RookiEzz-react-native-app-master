//  定义action type常量
//  定义store
//  定义action函数
const SET_LOADING = 'SET_LOADING'
import {_action, _system, defaultState, _actionCreator} from '../Constant/stateType'

export default (state: _system = defaultState.system, action: _action): _system => {
  if (!state) {
    return
  }
  console.log(action)
  switch (action.type) {
    case SET_LOADING:
      console.log({...state, loading: action.loading})
      return {...state, loading: action.loading}
    default:
      return state
  }
}

export const setLoading: _actionCreator = (loading: boolean) => {
  return {
    type: SET_LOADING,
    loading: loading
  }
}