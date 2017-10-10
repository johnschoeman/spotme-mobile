import React from 'react'
import { View, Button } from 'react-native'

import styles from '../../../styles/styles'

export default class WelcomeScreen extends React.Component {

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
      </View>
    )
  }

}
