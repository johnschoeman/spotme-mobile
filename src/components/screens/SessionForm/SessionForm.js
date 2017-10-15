import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import { AsyncStorage, View, Button, StyleSheet, Text } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, SocialIcon } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

import FBLoginFormContainer from '../SessionForm/SocialLogin/FBLoginFormContainer'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../../../utils/constants';
import { CREATE_USER_MUTATION, SIGNIN_USER_MUTATION } from
  '../../../graphql/mutations/SessionMutations'
import styles from '../../../styles/styles'

class SessionForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      isLogin: true,
    };
  }

  _handleSubmit = async () => {
    const { email, password, isLogin } = this.state
    const userVariables = { variables: { email, password } }

    let result;
    if (isLogin) {
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

    const { spots } = user
    delete user.spots

    this.props.receiveCurrentUser( { user, spots } )

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
      <View style={localStyles.container}>
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput onChangeText={(email) => this.setState({email})}/>
          {/*<FormValidationMessage>Error message</FormValidationMessage>*/}
          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={(password) => this.setState({password})}/>
          {/*<FormValidationMessage>Error message</FormValidationMessage>*/}
        </View>

        <Button
          onPress={() => this._handleSubmit()}
          title='Submit' />
      </View>
    )
  }
}

// <View style={localStyles.form}>
//   <Text style={localStyles.heading}>Log in</Text>
//   <Button
//     onPress={() => navigate('SessionForm', { formType: FORM_TYPE_SIGN_IN })}
//     title='Sign In' />
//   <Button
//     onPress={() => navigate('SessionForm', { formType: FORM_TYPE_SIGN_UP })}
//     title='Sign Up' />
//   <FBLoginFormContainer navigation={this.props.navigation}/>
// </View>

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    height: 300,
    width: 300,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
  }
})

export default compose(
graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(SessionForm);
