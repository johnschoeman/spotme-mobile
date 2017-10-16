import React from 'react'
import {Platform} from 'react-native'
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
import SpotShowContainer from '../screens/SpotShow/SpotShowContainer'

const MainNavigator = StackNavigator({
  Home: { screen: HomeConditionalScreenContainer },
  HostSpotIndex: { screen: HostSpotIndexScreenContainer },
  NewSpot: { screen: NewSpotScreenContainer },
  Menu: { screen: MenuScreenContainer },
  SpotShow: { screen: SpotShowContainer },
  // Profile: { screen: ProfileScreen },
}, {
  navigationOptions: {
    headerTitleStyle: { color: 'white' },
    headerStyle: Platform.OS === 'ios' ? { backgroundColor: 'rgb(150, 0, 0)' } : { backgroundColor: 'rgb(150, 0, 0)', marginTop: 25 }
  }
})

export default MainNavigator;
