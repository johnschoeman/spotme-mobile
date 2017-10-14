import {
  RECEIVE_SPOT,
  RECEIVE_SPOTS,
} from '../actions/spotEntityActions';
import {
  RECEIVE_CURRENT_USER
} from '../actions/sessionActions'
import { arrayToObj } from './shapers'

const nullUser = {
  currentUser: null
};

const sessionReducer = (state = nullUser, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state)
  const { spots, spot } = action

  switch (action.type) {
    case RECEIVE_SPOT:
      newState[spot.id] = spot;
      return newState
    case RECEIVE_SPOTS:
      return Object.assign(newState, arrayToObj(spots))
    case RECEIVE_CURRENT_USER:
      return Object.assign(newState, arrayToObj(spots))
    default:
      return state;
  }
};

export default sessionReducer;
