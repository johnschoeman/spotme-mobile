import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Text, Platform, StatusBar } from 'react-native'
import HomeScreen from '../Home/HomeScreen'
import WelcomeScreen from '../Welcome/WelcomeScreen'

export default class HomeConditionalScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => {
    const { navigate } = navigation
    return {
      title: screenProps.isLoggedIn ? "Home": "Welcome",
      headerTitleStyle: {color: 'white'},
      headerStyle: Platform.OS === 'ios' ? { backgroundColor: 'rgb(150, 0, 0)'} : { backgroundColor: 'rgb(150, 0, 0)', marginTop: 25 },
      headerRight: screenProps.isLoggedIn && (
        <Icon.Button
          name='gear'
          onPress={() => navigate('Menu')}
          color='white'
          backgroundColor='transparent'
          style={{ marginRight: 3 }}/>
      )
    }
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

// TODO: delete this
// use this version to test spot creation
//
// import React from 'react'
// import { AsyncStorage, Button } from 'react-native'
//
// import HomeScreen from '../Home/HomeScreen'
// import WelcomeScreen from '../Welcome/WelcomeScreen'
//
//
// export default class HomeConditionalScreen extends React.Component {
//
//   static navigationOptions = (props) => {
//     // const { isLoggedIn } = props
//     // need to redo if we are keeping the title bar.
//     // navigationOptions does not have access to all of props,
//     // so isLoggedIn is always considered undefined here
//     // more info: https://reactnavigation.org/docs/navigators/navigation-options
//     return {
//       // title: isLoggedIn ? 'Home' : 'Welcome',
//       title: 'Home'
//     }
//   }
//
//   constructor(props) {
//     super(props)
//   }
//
//   render() {
//     const { isLoggedIn, navigation } = this.props
//     const { navigate } = navigation
//     return (
//
//       isLoggedIn ? (
//         <Button
//         onPress={() => navigate('HostSpotIndex')}
//         title='spot index' />
//       ) : (
//         <WelcomeScreen navigation={navigation} />
//       )
//     )
//   }
//
// }
