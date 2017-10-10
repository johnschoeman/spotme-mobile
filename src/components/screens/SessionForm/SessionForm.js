import React, { Component } from 'react';
// import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';
import { gql, graphql, compose } from 'react-apollo'
import { View, Button } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

import styles from '../../../styles/styles'


export default class SessionForm extends Component {

  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: ''
  };

  render() {
    const resetNavigateHome = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' })
      ]
    })
    const { dispatch } = this.props.navigation;

    return (
      <View style={styles.screen}>
        <FormLabel>Username</FormLabel>
        <FormInput onChangeText={(username) => this.setState({username})}/>
        <FormValidationMessage>Error message</FormValidationMessage>
        <FormLabel>Password</FormLabel>
        <FormInput onChangeText={(password) => this.setState({password})}/>
        <FormValidationMessage>Error message</FormValidationMessage>
        {/* TODO Button onPress should be a function mapped from a thunk action creator */}
        <Button
          onPress={() => dispatch(resetNavigateHome)}
          title='Submit' />
      </View>
    )
  }
//
//   _confirm = async () => {
//     const { name, email, password } = this.state
//     if (this.state.login) {
//       const result = await this.props.signinUserMutation({
//         variables: {
//           email,
//           password
//         }
//       })
//       const id = result.data.signinUser.user.id
//       const token = result.data.signinUser.token
//       this._saveUserData(id, token)
//     } else {
//       const result = await this.props.createUserMutation({
//         variables: {
//           name,
//           email,
//           password
//         }
//       })
//       const id = result.data.signinUser.user.id
//       const token = result.data.signinUser.token
//       this._saveUserData(id, token)
//     }
//     this.props.history.push(`/`)
//   }
//
//   _saveUserData = (id, token) => {
//     localStorage.setItem(GC_USER_ID, id)
//     localStorage.setItem(GC_AUTH_TOKEN, token)
//   }
//
}
//
// const CREATE_USER_MUTATION = gql`
// mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
//   createUser(
//     name: $name,
//     authProvider: {
//       email: {
//         email: $email,
//         password: $password
//       }
//     }
//   ) {
//     id
//   }
//   signinUser(email: {
//     email: $email,
//     password: $password
//   }) {
//     token
//     user {
//       id
//     }
//   }
// }
// `
//
// const SIGNIN_USER_MUTATION = gql`
// mutation SigninUserMutation($email: String!, $password: String!) {
//   signinUser(email: {
//     email: $email,
//     password: $password
//   }) {
//     token
//     user {
//       id
//     }
//   }
// }
// `
//
// export default compose(
// graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
// graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
// )(Login);
