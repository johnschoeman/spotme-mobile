import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';

import styles from '../../../styles/styles'

export default class ProfileScreen extends React.Component {

  static navigationOptions = { title: 'Profile' }

  // constructor(props) {
  //   super(props)
  // }

  render() {

    return (
      <View style={styles.screen}>
        <Text style={screenStyles.header}>PROFILE</Text>
        <TouchableHighlight>
          <View>
          <View>
            <Text>Personal Information</Text>
            <Text>Edit your profile.</Text>
          </View>
          <Icon name='chevron-thin-right' />
          </View>
        </TouchableHighlight>
      </View>
    )
  }

}

const screenStyles = StyleSheet.create({
  header: {
    fontSize: 50,
  },
  profileButton: {
    
  }
});
