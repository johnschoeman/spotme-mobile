import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import TwoLineMenuButton from '../../modules/TwoLineMenuButton'

export default class HostSpotIndexScreen extends React.Component {

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={localStyles.screen}>
        <Text style={localStyles.header}>PROFILE</Text>
        <TwoLineMenuButton
          title='Personal Information'
          description='Edit your profile.'
          onPress={() => navigate('')}/>
        <TwoLineMenuButton
          title='Vehicles'
          description='Add your cars.'
          onPress={() => navigate('')}/>
        <TwoLineMenuButton
          title='Payment Information'
          description='Add preferred payment type.'
          onPress={() => navigate('')}/>
        <TwoLineMenuButton
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
  profileButton: {
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 15,
    padding: 8,
    justifyContent: 'space-between'
  },
  profileButtonTitle: {
    fontSize: 25,
    fontWeight: '400',

  },
  profileButtonDescription: {
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: '200',
  },
});
