import {
  RECEIVE_CURRENT_USER,
} from '../actions/sessionActions';

const nullUser = {
  currentUser: null
};

const sessionReducer = (state = nullUser, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState.currentUser = action.user;
      return newState
    default:
      return state;
  }
};

export default sessionReducer;
