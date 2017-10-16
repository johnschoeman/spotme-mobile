import { gql } from 'react-apollo'

const signInUser = `
signinUser(email: {
  email: $email,
  password: $password
}) {
  token
  user {
    id
    email
    avatar_url
    username
    spots {
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
}
`

export const CREATE_USER_MUTATION = gql`
mutation CreateUserMutation($email: String!, $password: String!) {
  createUser(
    authProvider: {
      email: {
        email: $email,
        password: $password
      }
    }
  ) {
    id
  }
  ${signInUser}
}
`

export const SIGNIN_USER_MUTATION = gql`
mutation SigninUserMutation($email: String!, $password: String!) {
  ${signInUser}
}
`
