import React from 'react';
import { Image, StyleSheet, StatusBar } from 'react-native';
import SessionFormContainer from '../SessionForm/SessionFormContainer'



export default class WelcomeScreen extends React.Component {

  render() {
    return (
      <Image
        style={localStyles.backgroundImage}
        source={require('../../../../assets/images/welcome_bg.jpeg')}>
        <StatusBar
          backgroundColor="white"
          barStyle="light-content"
        />
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
