import { combineReducers } from 'redux'
import FormationsReducer from './formationsReducer'

export default combineReducers({
  formations: FormationsReducer,
});
