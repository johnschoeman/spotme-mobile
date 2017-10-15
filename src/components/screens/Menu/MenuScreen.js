import React from 'react'
import {
  View, Text, StyleSheet, ScrollView, Platform, AsyncStorage
} from 'react-native'

import OneLineMenuButton from '../../modules/OneLineMenuButton'
import { resetNavigateHome } from '../SessionForm/sessionFunctions'
import { SPOTME_USER_ID, SPOTME_AUTH_TOKEN } from '../../../utils/constants';

export default class HostSpotIndexScreen extends React.Component {

  constructor(props) {
    super(props)

    resetNavigateHome = resetNavigateHome.bind(this)
  }

  logoutAndNavigateHome() {
    this.props.logoutUser();
    AsyncStorage.removeItem(SPOTME_USER_ID)
    AsyncStorage.removeItem(SPOTME_AUTH_TOKEN)
    resetNavigateHome();
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={localStyles.screen}>
        <View style={localStyles.screenTopSection}>
          <View style={localStyles.headerView}>
            <Text style={localStyles.headerText}>SETTINGS</Text>
          </View>
          <ScrollView>
            <OneLineMenuButton
              content='My Spots'
              onPress={() => navigate('HostSpotIndex')}/>
            <OneLineMenuButton
              content='Log out'
              onPress={() => this.logoutAndNavigateHome}/>
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
  },
  headerText: {
    fontSize: 30,
    marginTop: 15,
    marginBottom: 15,
    color: '#999',
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
