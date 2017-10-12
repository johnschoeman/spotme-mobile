import { combineReducers } from 'redux';

import spotEntitiesReducer from './spotEntitiesReducer';

const entitiesReducer = combineReducers({
  session: spotEntitiesReducer,
});

export default entitiesReducer;
