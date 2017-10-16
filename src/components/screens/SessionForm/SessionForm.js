import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import { AsyncStorage, View, StyleSheet, Text } from 'react-native'
import {
  FormLabel, FormInput, FormValidationMessage, Button
} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

import FBLoginFormContainer from '../SessionForm/SocialLogin/FBLoginFormContainer'
import { SPOTME_USER_ID, SPOTME_AUTH_TOKEN } from '../../../utils/constants';
import { CREATE_USER_MUTATION, SIGNIN_USER_MUTATION } from
  '../../../graphql/mutations/SessionMutations'

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
    this._resetNavigateHome()
  }

  _resetNavigateHome = () => {
    const resetNavigateHomeAction = NavigationActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: 'Home' }) ]
    })
    const { dispatch } = this.props.navigation;
    dispatch(resetNavigateHomeAction)
  }


  _saveUserData = (res) => {
    const { user, token } = res.data.signinUser
    AsyncStorage.setItem(SPOTME_USER_ID, user.id)
    AsyncStorage.setItem(SPOTME_AUTH_TOKEN, token)

    const { spots } = user
    delete user.spots

    this.props.receiveCurrentUser( { user, spots } )
  }

  render() {
    const { isLogin } = this.state
    const formTypeTrue = this.state.isLogin ? 'Sign In' : 'Sign Up'
    const formTypeFalse = this.state.isLogin ?  'Sign Up' : 'Sign In'

    return (
      <View style={localStyles.container}>
        <Text style={localStyles.heading}>{formTypeTrue}</Text>
        <View style={localStyles.form}>
          <FormLabel>Email or Username</FormLabel>
          <FormInput onChangeText={(email) => this.setState({email})}/>
          {/*<FormValidationMessage>Error message</FormValidationMessage>*/}
          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry onChangeText={(password) => this.setState({password})}/>
          {/*<FormValidationMessage>Error message</FormValidationMessage>*/}
        </View>

        <View>
          <Button
            onPress={() => this._handleSubmit()}
            title={formTypeTrue}
            borderRadius={25}
            icon={{
              name: isLogin ? 'login' : 'user-follow',
              type: isLogin ? 'material-community' : 'simple-line-icon'
            }}
            buttonStyle={localStyles.button} />
          <FBLoginFormContainer
            navigation={this.props.navigation}
            formType={formTypeTrue}
            buttonStyle={localStyles.button}/>
          <Button
            onPress={() => this.setState({isLogin: !isLogin})}
            title={`Switch to ${formTypeFalse}`}
            backgroundColor='transparent'
            color='blue'
            buttonStyle={localStyles.button}/>
        </View>
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
    height: 'auto',
    width: 300,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    color: '#555',
  },
  form: {
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  }
})

export default compose(
graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(SessionForm);
