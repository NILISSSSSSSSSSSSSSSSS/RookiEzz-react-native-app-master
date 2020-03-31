import {createStore, combineReducers, applyMiddleware} from 'redux'
import ContactStore from './Contact'
import SystemStore from './System'
import UserStore from './User'
import thunkMiddleware from 'redux-thunk'
const rootReducer = combineReducers({
  // currentList: ContactStore,
  system: SystemStore,
  user: UserStore
})

export default createStore(rootReducer, applyMiddleware(thunkMiddleware))
