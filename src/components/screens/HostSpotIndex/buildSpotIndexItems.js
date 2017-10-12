import React from 'react'

import TwoLineMenuButton from '../../modules/TwoLineMenuButton'

const buildSpotIndexItems = (spots, navigate) => {
  return spots.map(spot => {
    const { addressNumber, addressStreet, addressCity, addressState } = spot
    const line1 = `${addressNumber} ${addressStreet}`
    const line2 = [addressCity, addressState].join(', ')

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
