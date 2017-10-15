import React from 'react'
import { View } from 'react-native';

import ReservationFormContainer from './ReservationFormContainer'
import styles from '../../../styles/styles'

export default class ReservationFormScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    switch (navigation.state.params.formType) {
      case 'logIn':
        return { title: 'Log In' }
      case 'signUp':
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
          <ReservationFormContainer navigation={navigation} />
        </View>
      )
    }

}
