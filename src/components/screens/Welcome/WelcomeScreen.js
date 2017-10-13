import React from 'react';
import { Alert, Image, Button, Text, View } from 'react-native';
import Expo, { AuthSession } from 'expo';
import styles from '../../../styles/styles'
import SessionFormContainer from '../SessionForm/SessionFormContainer'
import FBLoginFormContainer from '../SessionForm/SocialLogin/FBLoginFormContainer'

export const FORM_TYPE_SIGN_IN = 'signIn'
export const FORM_TYPE_SIGN_UP = 'signUp'

export default class WelcomeScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.screen}>
        <Button
          onPress={() => navigate('SessionForm', { formType: FORM_TYPE_SIGN_IN })}
          title='Sign In' />
        <Button
          onPress={() => navigate('SessionForm', { formType: FORM_TYPE_SIGN_UP })}
          title='Sign Up' />
        <FBLoginFormContainer navigation={this.props.navigation}/>
      </View>
    )
  }

}
