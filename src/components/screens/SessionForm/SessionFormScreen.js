import React from 'react'
import { View } from 'react-native';

import SessionFormContainer from './SessionFormContainer'
import { FORM_TYPE_SIGN_IN, FORM_TYPE_SIGN_UP } from '../Welcome/WelcomeScreen';
import styles from '../../../styles/styles'

export default class SessionFormScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    switch (navigation.state.params.formType) {
      case FORM_TYPE_SIGN_IN:
      return { title: 'Log In' }
      case FORM_TYPE_SIGN_UP:
      return { title: 'Sign Up' }
      default:
      return { title: 'No Title' }
    }
  }

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { navigation } = this.props

    return (
      <View style={styles.screen}>
        <SessionFormContainer navigation={navigation}/>
      </View>
    )
  }

}
