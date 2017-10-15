export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';
export const LOGOUT_USER = 'LOGOUT_USER'

export const receiveCurrentUser = ( { user, spots } ) => ({
  type: RECEIVE_CURRENT_USER,
  user,
  spots,
});

export const logoutUser = () => ({
  type: LOGOUT_USER
})

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
})
