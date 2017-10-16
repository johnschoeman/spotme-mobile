import React from 'react'
import { StackNavigator } from 'react-navigation';
import HomeConditionalScreenContainer from
  '../screens/HomeConditional/HomeConditionalScreenContainer'
// import ProfileScreen from '../screens/Profile/ProfileScreen'
import HostSpotIndexScreenContainer from
  '../screens/HostSpotIndex/HostSpotIndexScreenContainer'
import NewSpotScreenContainer from
  '../screens/NewSpot/NewSpotScreenContainer'
import MenuScreenContainer from
  '../screens/Menu/MenuScreenContainer'
import SpotShowScreen from '../screens/SpotShow/SpotShowScreen'
import ReservationShowScreen from '../screens/ReservationShow/ReservationShowScreen'

const MainNavigator = StackNavigator({
  Home: { screen: HomeConditionalScreenContainer },
  HostSpotIndex: { screen: HostSpotIndexScreenContainer },
  NewSpot: { screen: NewSpotScreenContainer },
  Menu: { screen: MenuScreenContainer },
  SpotShow: { screen: SpotShowScreen },
  ReservationShow: { screen : ReservationShowScreen }
  // Profile: { screen: ProfileScreen },
})

export default MainNavigator;
