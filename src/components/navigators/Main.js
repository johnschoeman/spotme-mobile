import React from 'react'
import { StackNavigator } from 'react-navigation';

import SessionFormScreen from '../screens/SessionForm/SessionFormScreen'
import HomeConditionalScreen from
  '../screens/HomeConditional/HomeConditionalScreen'


const MainNavigator = StackNavigator({
  Home: { screen: HomeConditionalScreen },
  SessionForm: { screen: SessionFormScreen },
})

export default MainNavigator;
