import { gql } from 'react-apollo'

export const CREATE_SPOT_MUTATION = gql`
mutation CreateSpotMutation($address: String!) {
  createSpot(
    address: $address
  ) {
    id
    address_number
    address_street
    address_city
    address_state
    address_zip
    latitude
    longitude
    host_id
  }
}
`
