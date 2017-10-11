import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import { AsyncStorage, View, Button } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../../../utils/constants';
import { CREATE_USER_MUTATION, SIGNIN_USER_MUTATION } from
  '../../../graphql/session/mutations'
import styles from '../../../styles/styles'

class SessionForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    };
  }

  _handleSubmit = async () => {
    const { email, password } = this.state
    const userVariables = { variables: { email, password } }
    let result;
    if (this.props.navigation.state.params.formType === 'logIn') {
      result = await this.props.signinUserMutation(userVariables)
    } else {
      result = await this.props.createUserMutation(userVariables)
    }

    this._saveUserData(result)
    this._navigateHome()
  }

  _saveUserData = (res) => {
    const { user, token } = res.data.signinUser
    AsyncStorage.setItem(GC_USER_ID, user.id)
    AsyncStorage.setItem(GC_AUTH_TOKEN, token)

    this.props.receiveCurrentUser( { token, ...user } )

    console.log('*** RESULT', res);
    AsyncStorage.getItem(GC_USER_ID).then((storageId) => console.log('######STOR_ID', storageId))
  }

  _navigateHome() {
    const resetNavigateHome = NavigationActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: 'Home' }) ]
    })
    const { dispatch } = this.props.navigation;
    dispatch(resetNavigateHome)
  }

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
          onPress={() => this._handleSubmit()}
          title='Submit' />
      </View>
    )
  }


}

export default compose(
graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(SessionForm);
