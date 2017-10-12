export const RECEIVE_SPOT = 'RECEIVE_SPOT';
export const RECEIVE_SPOTS = 'RECEIVE_SPOTS';

export const receiveSpot = ( spot ) => ({
  type: RECEIVE_SPOT,
  spot,
});

export const receiveSpots = ( spots ) => ({
  type: RECEIVE_SPOTS,
  spots,
});
