import { gql } from 'react-apollo'

export const CREATE_RESERVATION_MUTATION = gql`
mutation CreateReservationMutation($spot_id: Int!, $start_time: DateTime!, $end_time: DateTime!) {
  createReservation (
    spot_id: $spot_id,
    start_time: $start_time,
    end_time: $end_time,
  ) {
    id
    start_time
    end_time
    duration
    end_time_since_epoch
    spot {
      id
      address_number
      address_street
      address_city
      address_state
      address_zip
      image_url
      price
      hostedBy {
        id
        username
        email
      }
    }
    user {
      id
    }
  }
}
`
