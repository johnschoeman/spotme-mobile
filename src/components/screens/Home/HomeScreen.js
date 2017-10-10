import React from 'react'
import { View, Text, Button } from 'react-native'

import styles from '../../../styles/styles'

export default class WelcomeScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.screen}>
        <Text>Main view goes here</Text>
      </View>
    )
  }

}
