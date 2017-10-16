import { gql } from 'react-apollo'

export const CREATE_SPOT_MUTATION = gql`
mutation CreateSpotMutation($address: String!, $price: Float!) {
  createSpot(
    address: $address
    price: $price
  ) {
    id
    address_number
    address_street
    address_city
    address_state
    address_zip
    price
    latitude
    longitude
    host_id
  }
}
`
