export const getOwnSpots = (state) => {
  const allSpots = Object.values(state.entities.spots)
  const currentUser = state.session.currentUser

  // TODO: change back to currentUser.id
  const ownSpots = allSpots.filter(spot => spot.host_id === currentUser.id)
  return ownSpots
}
