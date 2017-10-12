import React from 'react'
import { StackNavigator } from 'react-navigation';

import SessionFormScreen from '../screens/SessionForm/SessionFormScreen'
import HomeConditionalScreenContainer from
  '../screens/HomeConditional/HomeConditionalScreenContainer'
import ProfileScreen from '../screens/Profile/ProfileScreen'


const MainNavigator = StackNavigator({
  Home: { screen: HomeConditionalScreenContainer },
  SessionForm: { screen: SessionFormScreen },
  Profile: { screen: ProfileScreen },
})

export default MainNavigator;
