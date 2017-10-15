import React from 'react';
import { Alert, Image, Button, Text, View, StyleSheet } from 'react-native';
import Expo, { AuthSession } from 'expo';
import styles from '../../../styles/styles'
import SessionFormContainer from '../SessionForm/SessionFormContainer'
import FBLoginFormContainer from '../SessionForm/SocialLogin/FBLoginFormContainer'

export const FORM_TYPE_SIGN_IN = 'signIn'
export const FORM_TYPE_SIGN_UP = 'signUp'

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Image
        style={localStyles.backgroundImage}
        source={require('../../../../assets/images/welcome_bg.jpeg')}>
        <View style={localStyles.form}>
          <Text style={localStyles.heading}>Log in</Text>
          <Button
            onPress={() => navigate('SessionForm', { formType: FORM_TYPE_SIGN_IN })}
            title='Sign In' />
          <Button
            onPress={() => navigate('SessionForm', { formType: FORM_TYPE_SIGN_UP })}
            title='Sign Up' />
          <FBLoginFormContainer navigation={this.props.navigation}/>
        </View>
      </Image>
    )
  }

}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
  backgroundImage:{
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    height: 300,
    width: 300,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 10,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
  }
})
