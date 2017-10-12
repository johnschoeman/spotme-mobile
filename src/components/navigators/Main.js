import React from 'react'
import { StackNavigator } from 'react-navigation';

import SessionFormScreen from '../screens/SessionForm/SessionFormScreen'
import HomeConditionalScreenContainer from
  '../screens/HomeConditional/HomeConditionalScreenContainer'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import HostSpotIndexScreenContainer from
  '../screens/HostSpotIndex/HostSpotIndexScreenContainer'
import NewSpotScreenContainer from
  '../screens/NewSpot/NewSpotScreenContainer'


const MainNavigator = StackNavigator({
  NewSpot: { screen: NewSpotScreenContainer },
  Home: { screen: HomeConditionalScreenContainer },
  SessionForm: { screen: SessionFormScreen },
  HostSpotIndex: { screen: HostSpotIndexScreenContainer },
  // Profile: { screen: ProfileScreen },
})

export default MainNavigator;
