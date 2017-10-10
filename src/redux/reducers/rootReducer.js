import { combineReducers } from 'redux';

const rootReducer = client => combineReducers({
  apollo: client.reducer(),
});

export default rootReducer
