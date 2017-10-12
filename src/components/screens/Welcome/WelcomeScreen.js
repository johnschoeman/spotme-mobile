import React from 'react';
import { Alert, Image, Button, Text, View } from 'react-native';
import Expo, { AuthSession } from 'expo';
import styles from '../../../styles/styles'
import SessionFormContainer from '../SessionForm/SessionFormContainer'
import FBLoginFormContainer from '../SessionForm/SocialLogin/FBLoginFormContainer'

export default class WelcomeScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.screen}>
        <SessionFormContainer navigation={this.props.navigation}/>
        <Button
          onPress={() => navigate('SessionForm', { formType: 'signUp' })}
          title='Sign Up' />
        <FBLoginFormContainer navigation={this.props.navigation}/>
      </View>
    )
  }

}
