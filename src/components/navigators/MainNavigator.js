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
import MenuScreenContainer from
  '../screens/Menu/MenuScreenContainer'


const MainNavigator = StackNavigator({
  Home: { screen: HomeConditionalScreenContainer },
  SessionForm: { screen: SessionFormScreen },
  HostSpotIndex: { screen: HostSpotIndexScreenContainer },
  NewSpot: { screen: NewSpotScreenContainer },
  Menu: { screen: MenuScreenContainer },
  // Profile: { screen: ProfileScreen },
})

export default MainNavigator;
