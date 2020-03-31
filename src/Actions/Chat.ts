import {Dispatch} from 'redux'
import fetchApi from '../Tools/fetchApi'
import {setChat} from '../Reducers/Chat'
export const getChat = () => async (dispatch: Dispatch) => {
  let data = await fetchApi('/json/chatRecord.json')
  dispatch(setChat(data))
}