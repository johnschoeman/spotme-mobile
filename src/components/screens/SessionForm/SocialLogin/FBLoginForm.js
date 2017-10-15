import React from 'react';
import { AsyncStorage, Alert, Image, Button, Text, View } from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Expo, { AuthSession } from 'expo';
import jwtDecoder from 'jwt-decode';
import { NavigationActions } from 'react-navigation'
import { SocialIcon } from 'react-native-elements'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../../../../utils/constants';
import styles from '../../../../styles/styles'

const auth0ClientId = 'PODS1ov5gcTRNmWec61GhXDZO9jLt-yT';
const auth0Domain = 'https://spotme.auth0.com';


function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

class FBLoginForm extends React.Component {
  constructor() {
    super();
    this.loginWithAuth0FB = this.loginWithAuth0FB.bind(this);
    this.state = {
        email: null,
    }
  }

  loginWithAuth0FB = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    const resultCode = await AuthSession.startAsync({
      authUrl: `${auth0Domain}/authorize` + toQueryString({
        connection: 'facebook',
        client_id: auth0ClientId,
        response_type: 'code',
        scope: 'openid profile email',
        redirect_uri: redirectUrl,
      }),
    });

    if (resultCode.type === 'success') {
      if (resultCode.error) {
        Alert.alert('Error', resultCode.error.message
          || 'something went wrong while logging in');
        return;
      }

      const redirect_uri = redirectUrl; //"https://spotme.us.webtask.io/@spotme/expo-auth0";
      const authorization_code = resultCode.params.code;
      const fbVariables = { variables: { authorization_code, redirect_uri } }
      const fbMutationResponse = await this.props.getFBTokenMutation(fbVariables);
      const idToken = fbMutationResponse.data.getFBToken.id_token
      const decodedToken = jwtDecoder(idToken);
      this.setState({email: decodedToken.email});
      debugger
      const userVariables = {variables: { email: decodedToken.email } }
      let res;
      res = await this.props.createUserSocialMutation(userVariables);
      this._saveUserData(res)
      this._navigateHome()
    }
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
    const { navigate } = this.props.navigation;
    const { formType } = this.props
    return (
      <SocialIcon
        title={`${FormType} With Facebook`}
        button
        type='facebook'
        onPress={this.loginWithAuth0FB}
      />
    )
  }
}

const GET_FB_TOKEN_MUTATION = gql`
  mutation GetFBTokenMutation($authorization_code: String!, $redirect_uri: String!) {
    getFBToken(
      authorization_code: $authorization_code,
      redirect_uri: $redirect_uri,
    ) {
      id_token
    }
  }
`;

const CREATE_USER_SOCIAL_MUTATION = gql`
  mutation CreateUserSocialMutation($email: String!) {
    createUserSocial(
      email: $email
    ) {
      id
    }
    signInSocial(
      email: $email
    ) {
      token
      user {
        id
        email
      }
    }
  }
`;

export default compose(
  graphql(GET_FB_TOKEN_MUTATION, { name: 'getFBTokenMutation' }),
  graphql(CREATE_USER_SOCIAL_MUTATION, { name: 'createUserSocialMutation'})
)(FBLoginForm);
