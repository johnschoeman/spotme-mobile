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
<<<<<<< HEAD:src/components/navigators/MainNavigator.js
import MenuScreenContainer from
  '../screens/Menu/MenuScreenContainer'

=======
import SpotShowScreen from '../screens/SpotShow/SpotShowScreen'
>>>>>>> a8202bb6aac8373f96c9912c0c9e8e444e12206d:src/components/navigators/Main.js

const MainNavigator = StackNavigator({
  Home: { screen: HomeConditionalScreenContainer },
  SessionForm: { screen: SessionFormScreen },
  HostSpotIndex: { screen: HostSpotIndexScreenContainer },
  NewSpot: { screen: NewSpotScreenContainer },
<<<<<<< HEAD:src/components/navigators/MainNavigator.js
  Menu: { screen: MenuScreenContainer },
=======
  SpotShow: { screen: SpotShowScreen }
>>>>>>> a8202bb6aac8373f96c9912c0c9e8e444e12206d:src/components/navigators/Main.js
  // Profile: { screen: ProfileScreen },
})

export default MainNavigator;
