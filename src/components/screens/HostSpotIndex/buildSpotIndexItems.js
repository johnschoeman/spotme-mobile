import React from 'react'

import TwoLineMenuButton from '../../modules/TwoLineMenuButton'

const buildSpotIndexItems = (spots, navigate) => {
  return spots.map(spot => {
    const { street, city, state } = spot.address
    const line1 = street
    const line2 = [city, state].join(', ')

    return (
      <TwoLineMenuButton
        key={spot.id}
        line1={line1}
        line2={line2}
        onPress={() => navigate('', { spot })}/>
    )
  })
}

export default buildSpotIndexItems
