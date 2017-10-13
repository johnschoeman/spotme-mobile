import React from 'react';
import { Alert, Image, Button, Text, View } from 'react-native';
import Expo, { AuthSession } from 'expo';
import jwtDecoder from 'jwt-decode';
import styles from '../../../../styles/styles'

const auth0ClientId = 'PODS1ov5gcTRNmWec61GhXDZO9jLt-yT';
const auth0Domain = 'https://spotme.auth0.com';


function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export default class FBLoginForm extends React.Component {
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
        scope: 'openid profile',
        redirect_uri: redirectUrl,
      }),
    });

    console.log(resultCode);
    console.log("resultCode PARAMS",resultCode.params);
    if (resultCode.type === 'success') {
      if (resultCode.error) {
        Alert.alert('Error', resultCode.error.message
          || 'something went wrong while logging in');
        return;
      }
      resultCode.params.code
      console.log("HI I'M HERERERERERE")
    }
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