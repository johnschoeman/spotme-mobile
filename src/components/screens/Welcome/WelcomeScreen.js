import React from 'react';
import { Alert, Image, Button, Text, View } from 'react-native';
import Expo, { AuthSession } from 'expo';
import jwtDecoder from 'jwt-decode';
import styles from '../../../styles/styles'

const auth0ClientId = 'PODS1ov5gcTRNmWec61GhXDZO9jLt-yT';
const auth0Domain = 'https://spotme.auth0.com';


function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export default class WelcomeScreen extends React.Component {
  state = {
      username: undefined,
  };

  _loginWithAuth0FB = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl)
    const result = await AuthSession.startAsync({
      authUrl: `${auth0Domain}/authorize` + toQueryString({
        connection: 'facebook',
        client_id: auth0ClientId,
        response_type: 'token',
        scope: 'openid name',
        redirect_uri: redirectUrl,
      }),
    });

    console.log(result);
    if (result.type === 'success') {
      this.handleParams(result.params);
    }
  }

  handleParams = (responseObj) => {
    if (responseObj.error) {
      Alert.alert('Error', responseObj.error_description
        || 'something went wrong while logging in');
      return;
    }
    const encodedToken = responseObj.id_token;
    const decodedToken = jwtDecoder(encodedToken);
    const username = decodedToken.name;
    this.setState({ username });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.screen}>
        <Button
          onPress={() => navigate('SessionForm', { formType: 'logIn' })}
          title='Login' />
        <Button
          onPress={() => navigate('SessionForm', { formType: 'signUp' })}
          title='Sign Up' />
        <Button title="Login with Facebook" onPress={this._loginWithAuth0FB} />
      </View>
    )
  }

}
