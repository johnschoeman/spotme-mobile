import React from 'react'


import SessionFormContainer from './SessionFormContainer'


export default class SessionFormScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    switch (navigation.state.params.formType) {
      case 'logIn':
      return { title: 'Log In' }
      case 'signUp':
      return { title: 'Sign Up' }
      default:
      return { title: 'No Title' }
    }
  }

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { navigation } = this.props

    return (
      <SessionFormContainer navigation={navigation}/>
    )
  }

}
