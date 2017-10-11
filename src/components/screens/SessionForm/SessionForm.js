import React, { Component } from 'react';
// import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';
import { gql, graphql, compose } from 'react-apollo'
import { AsyncStorage, View, Button } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

import styles from '../../../styles/styles'

const GC_USER_ID = 'graphcool-user-id'
const GC_AUTH_TOKEN = 'graphcool-auth-token'


class SessionForm extends Component {

  state = {
    email: '',
    password: '',
  };

  render() {


    return (
      <View style={styles.screen}>
        <FormLabel>Email</FormLabel>
        <FormInput onChangeText={(email) => this.setState({email})}/>
        <FormValidationMessage>Error message</FormValidationMessage>
        <FormLabel>Password</FormLabel>
        <FormInput onChangeText={(password) => this.setState({password})}/>
        <FormValidationMessage>Error message</FormValidationMessage>

        <Button
          onPress={() => this._confirm()}
          title='Submit' />
      </View>
    )
  }

  _confirm = async () => {
    const { email, password } = this.state
    if (this.props.navigation.state.params.formType === 'logIn') {
      const result = await this.props.signinUserMutation({
        variables: {
          email,
          password
        }
      })
      const id = result.data.signinUser.user.id
      const token = result.data.signinUser.token
      this._saveUserData(id, token)
    } else {
      const result = await this.props.createUserMutation({
        variables: {
          email,
          password
        }
      })
      const id = result.data.signinUser.user.id
      const token = result.data.signinUser.token

      this._saveUserData(id, token)
      const resetNavigateHome = NavigationActions.reset({
        index: 0,
        actions: [ NavigationActions.navigate({ routeName: 'Home' }) ]
      })
      const { dispatch } = this.props.navigation;
      dispatch(resetNavigateHome)
    }
  }

  _saveUserData = (id, token) => {
    AsyncStorage.setItem(GC_USER_ID, id)
    AsyncStorage.setItem(GC_AUTH_TOKEN, token)
  }

}

const CREATE_USER_MUTATION = gql`
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
  signinUser(email: {
    email: $email,
    password: $password
  }) {
    token
    user {
      id
    }
  }
}
`

const SIGNIN_USER_MUTATION = gql`
mutation SigninUserMutation($email: String!, $password: String!) {
  signinUser(email: {
    email: $email,
    password: $password
  }) {
    token
    user {
      id
    }
  }
}
`

export default compose(
graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(SessionForm);
