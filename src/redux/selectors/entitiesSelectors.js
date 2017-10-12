export const getOwnSpots = (state) => {
  const allSpots = Object.values(state.entities.spots)
  const currentUser = state.session.currentUser

  const ownSpots = allSpots.filter(spot => spot.hostId === currentUser.id)
  return ownSpots
}
