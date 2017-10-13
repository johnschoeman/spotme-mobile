import React from 'react'

import TwoLineMenuButton from '../../modules/TwoLineMenuButton'

const buildSpotIndexItems = (spots, navigate) => {
  return spots.map(spot => {
    const { address_number, address_street, address_city, address_state } = spot
    const line1 = `${address_number} ${address_street}`
    const line2 = [address_city, address_state].join(', ')

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
