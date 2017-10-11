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
