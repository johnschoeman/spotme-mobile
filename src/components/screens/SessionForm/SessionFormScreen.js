import React from 'react'
import { View, Button } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

import styles from '../../../styles/styles'

export default class SessionFormScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    switch (navigation.state.params.formType) {
      case 'logIn':
      return { title: 'Log In' }
      case 'signUp':
      return { title: 'Sign Up' }
      default:
      return { title: 'No Title' }
    }
  }
  
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

  }

  render() {
    const resetNavigateHome = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' })
      ]
    })
    const { dispatch } = this.props.navigation;

    return (
      <View style={styles.screen}>
        <FormLabel>Username</FormLabel>
        <FormInput onChangeText={(username) => this.setState({username})}/>
        <FormValidationMessage>Error message</FormValidationMessage>
        <FormLabel>Password</FormLabel>
        <FormInput onChangeText={(password) => this.setState({password})}/>
        <FormValidationMessage>Error message</FormValidationMessage>
        {/* TODO Button onPress should be a function mapped from a thunk action creator */}
        <Button
          onPress={() => dispatch(resetNavigateHome)}
          title='Submit' />
      </View>
    )
  }

}
