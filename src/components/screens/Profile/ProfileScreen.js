import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import ProfileButton from './ProfileButton'

export default class ProfileScreen extends React.Component {

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={localStyles.screen}>
        <Text style={localStyles.header}>PROFILE</Text>
        <ProfileButton
          title='Personal Information'
          description='Edit your profile.'
          onPress={() => navigate('')}/>
        <ProfileButton
          title='Vehicles'
          description='Add your cars.'
          onPress={() => navigate('')}/>
        <ProfileButton
          title='Payment Information'
          description='Add preferred payment type.'
          onPress={() => navigate('')}/>
        <ProfileButton
          title='Contact'
          description='Talk to us.'
          onPress={() => navigate('')}/>
      </View>
    )
  }

}

const localStyles = StyleSheet.create({
  screen: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',

  },
  header: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});
