import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer'
import errorsReducer from './errorsReducer'
import entitiesReducer from './entitiesReducer'

const rootReducer = client => combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer,
  apollo: client.reducer(),
});

export default rootReducer
