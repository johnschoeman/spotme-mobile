import {
  RECEIVE_SPOT,
  RECEIVE_SPOTS,
} from '../actions/spotEntityActions';
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
      return arrayToObj(spots)
    default:
      return state;
  }
};

export default sessionReducer;
