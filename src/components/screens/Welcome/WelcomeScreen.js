import React from 'react';
import { Alert, Image, Button, Text, View, StyleSheet } from 'react-native';
import Expo, { AuthSession } from 'expo';
import styles from '../../../styles/styles'
import SessionFormContainer from '../SessionForm/SessionFormContainer'



export default class WelcomeScreen extends React.Component {

  render() {
    return (
      <Image
        style={localStyles.backgroundImage}
        source={require('../../../../assets/images/welcome_bg.jpeg')}>
        <SessionFormContainer navigation={this.props.navigation}/>
      </Image>
    )
  }

}

const localStyles = StyleSheet.create({
  backgroundImage:{
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
