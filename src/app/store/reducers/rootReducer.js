import { combineReducers } from 'redux'
import authReducer from './authReducer'
import courseReducer from './courseReducer'
import modalReducer from './modalReducer'

const rootReducer = combineReducers({
  // set global state
  modal: modalReducer,
  auth: authReducer,
  course: courseReducer,
})

export default rootReducer
