import { combineReducers } from 'redux';

import spotEntitiesReducer from './spotEntitiesReducer';

const entitiesReducer = combineReducers({
  spots: spotEntitiesReducer,
});

export default entitiesReducer;
