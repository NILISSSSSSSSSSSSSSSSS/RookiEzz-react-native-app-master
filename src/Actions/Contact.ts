import {Dispatch} from 'redux'
import fetchApi from '../Tools/fetchApi'
import {setCurrent} from '../Reducers/Contact'
export const getCurrentList = () => async (dispatch: Dispatch) => {
  let data = await fetchApi('/json/current.json')
  dispatch(setCurrent(data))
}