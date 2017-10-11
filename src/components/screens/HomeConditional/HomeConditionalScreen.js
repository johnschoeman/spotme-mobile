import React from 'react'
import { AsyncStorage } from 'react-native'

import HomeScreen from '../Home/HomeScreen'
import WelcomeScreen from '../Welcome/WelcomeScreen'


export default class HomeConditionalScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: false ? 'Home' : 'Welcome', // TODO temp setting while awaiting auth & redux
    // title: this.props.isLoggedIn ? 'Home' : 'Welcome',
  };

  render() {
    const { isLoggedIn, navigation } = this.props
    return (

      isLoggedIn ? (
        <HomeScreen navigation={navigation} />
      ) : (
        <WelcomeScreen navigation={navigation} />
      )
    )
  }

}
