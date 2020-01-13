import { combineReducers } from 'redux'
import { FormationsReducer } from './formationsReducer'
import { MetadataReducer } from './metadataReducer'

export default combineReducers({
  formations: FormationsReducer,
  metadata: MetadataReducer,
});
