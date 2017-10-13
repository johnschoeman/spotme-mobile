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
  HostSpotIndex: { screen: HostSpotIndexScreenContainer },
  Home: { screen: HomeConditionalScreenContainer },
  SessionForm: { screen: SessionFormScreen },
  NewSpot: { screen: NewSpotScreenContainer },
  // Profile: { screen: ProfileScreen },
})

export default MainNavigator;
