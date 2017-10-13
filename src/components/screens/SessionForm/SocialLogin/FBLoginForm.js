import React from 'react';
import { AsyncStorage, Alert, Image, Button, Text, View } from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Expo, { AuthSession } from 'expo';
import jwtDecoder from 'jwt-decode';
import styles from '../../../../styles/styles'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../../../../utils/constants';
const auth0ClientId = 'PODS1ov5gcTRNmWec61GhXDZO9jLt-yT';
const auth0Domain = 'https://spotme.auth0.com';


function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

class FBLoginForm extends React.Component {
  state = {
      userInfo: null,
  };

  _loginWithAuth0FB = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl)
    const resultCode = await AuthSession.startAsync({
      authUrl: `${auth0Domain}/authorize` + toQueryString({
        connection: 'facebook',
        client_id: auth0ClientId,
        response_type: 'code',
        scope: 'openid profile email',
        redirect_uri: redirectUrl,
      }),
    });

    console.log(resultCode);
    console.log("resultCode PARAMS",resultCode.params);
    if (resultCode.type === 'success') {
      console.log('resultCode.error', resultCode.error);
      if (resultCode.error) {
        Alert.alert('Error', resultCode.error.message
          || 'something went wrong while logging in');
        return;
      }

      const redirect_uri = redirectUrl; //"https://spotme.us.webtask.io/@spotme/expo-auth0";
      const authorization_code = resultCode.params.code;
      console.log('auth code', typeof authorizationCode );
      console.log('redirect uri', typeof redirectUri );

      const fbVariables = { variables: { authorization_code, redirect_uri } }
      // const idToken = await this.props.getFBTokenMutation(authorizationCode, redirectUri)
      const fbMutationResponse = await this.props.getFBTokenMutation(fbVariables);
      console.log("fbMutationResponse: ", fbMutationResponse)
      const idToken = fbMutationResponse.data.getFBToken.id_token
      const decodedToken = jwtDecoder(idToken);
      console.log("decodedToken", decodedToken);

      //Sign in user
      const email = decodedToken["email"];
      console.log('email:', email);
      const userVariables = { variables: { email }};

      const signInResponse = await this.props.createUserSocialMutation(userVariables);
      console.log('signInResponse: ', signInResponse);
      this._saveUserData(signInResponse);
    }
  }

  _saveUserData = (res) => {
    const { user, token } = res.data.signinUser
    AsyncStorage.setItem(GC_USER_ID, user.id)
    AsyncStorage.setItem(GC_AUTH_TOKEN, token)

    this.props.receiveCurrentUser( { token, ...user } )

    console.log('*** RESULT', res);
    AsyncStorage.getItem(GC_USER_ID).then((storageId) => console.log('######STOR_ID', storageId))
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.screen}>
        <Button title="Login with Facebook" onPress={this._loginWithAuth0FB} />
      </View>
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
// mutation {
//   getFBToken(authorization_code: "RjsNkD0iM9b8XVY8", redirect_uri: "https://spotme.us.webtask.io/@spotme/expo-auth0") {
//     id_token
//   }
// }
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
      id
    }
  }
`;

const SIGNIN_SOCIAL_MUTATION = gql`
  mutation SignInSocialMutation($email: String!) {
    signInSocial(
      email: $email
    ) {
      id
    }
  }
`;

export default compose(
  graphql(GET_FB_TOKEN_MUTATION, { name: 'getFBTokenMutation' }),
  graphql(SIGNIN_SOCIAL_MUTATION, { name: 'signinSocialMutation'}),
  graphql(CREATE_USER_SOCIAL_MUTATION, { name: 'createUserSocialMutation '})
)(FBLoginForm);
