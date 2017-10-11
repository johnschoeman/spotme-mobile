import React from 'react'
import { AsyncStorage } from 'react-native'

import HomeScreen from '../Home/HomeScreen'
import WelcomeScreen from '../Welcome/WelcomeScreen'


export default class HomeConditionalScreen extends React.Component {

  static navigationOptions = (props) => {
    // const { isLoggedIn } = props
    // need to redo if we are keeping the title bar.
    // navigationOptions does not have access to all of props,
    // so isLoggedIn is always considered undefined here
    // more info: https://reactnavigation.org/docs/navigators/navigation-options
    return {
      // title: isLoggedIn ? 'Home' : 'Welcome',
      title: 'Home'
    }
  }

  constructor(props) {
    super(props)
  }

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
