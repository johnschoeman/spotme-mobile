import React from 'react'
import {
  Image, View, Text, StyleSheet, ScrollView, Platform, AsyncStorage
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import OneLineMenuButton from '../../modules/OneLineMenuButton'
import { SPOTME_USER_ID, SPOTME_AUTH_TOKEN } from '../../../utils/constants';

export default class HostSpotIndexScreen extends React.Component {

  // constructor(props) {
  //   super(props)
  // }

  logoutAndNavigateHome() {
    AsyncStorage.removeItem(SPOTME_USER_ID)
    AsyncStorage.removeItem(SPOTME_AUTH_TOKEN)
    this._resetNavigateHome()
    this.props.logoutUser();
  }

  _resetNavigateHome = () => {
    const resetNavigateHomeAction = NavigationActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: 'Home' }) ]
    })
    const { dispatch } = this.props.navigation;
    dispatch(resetNavigateHomeAction)
  }

  render() {
    const { currentUser, navigation } = this.props
    const { navigate } = navigation

    return (
      <View style={localStyles.screen}>
        <View style={localStyles.screenTopSection}>

          {
            currentUser &&
            <View style={localStyles.headerView}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={{ uri: currentUser.avatar_url }} />
              <Text style={localStyles.headerText}>{currentUser.username}</Text>
            </View>
          }
          <ScrollView>
            <OneLineMenuButton
              content='My Spots'
              onPress={() => navigate('HostSpotIndex')}/>
            <OneLineMenuButton
              content='Log out'
              onPress={() => this.logoutAndNavigateHome()}/>
          </ScrollView>
        </View>
      </View>
    )
  }

}

const localStyles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
  },
  screenTopSection: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1,

  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#CCC',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0,  height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    backgroundColor: 'rgb(150, 0, 0)',
  },
  headerText: {
    fontSize: 30,
    marginTop: 15,
    marginBottom: 15,
    color: 'white',
    marginLeft: 20
  },
  addButtonView: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0,  height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderTopWidth: (Platform.OS === 'android') ? 1 : 0,
    borderColor: '#CCC',
    // elevation: 2,
  },
  addButton: {
    width: 150,
    padding: 7,
    backgroundColor: '#999',
    alignItems: 'center',
    borderRadius: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
