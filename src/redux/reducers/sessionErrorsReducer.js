import {
  RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS,
  CLEAR_SESSION_ERRORS,
} from '../actions/sessionActions';

const defaultState = {
  email: [],
  password: [],
  general: []
}

const sessionErrorsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state, defaultState)
  const { errors } = action

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {};
    case CLEAR_SESSION_ERRORS:
      return {};
    case RECEIVE_SESSION_ERRORS:
      for (let i = 0; i < errors.length; i++) {
        const error = errors[i]
        newState.email = error.email || []
        newState.password = error.password || []
        newState.general = error.general || []
      }
      return newState;
    default:
      return state;
  }
};

export default sessionErrorsReducer;
