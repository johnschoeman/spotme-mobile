import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer'
import errorsReducer from './errorsReducer'

const rootReducer = client => combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
  apollo: client.reducer(),
});

export default rootReducer
