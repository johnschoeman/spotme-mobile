import React from 'react'
import { View, Text, Button } from 'react-native'
import Map from './Components/Map'


import styles from '../../../styles/styles'

export default class WelcomeScreen extends React.Component {

  constructor(){
    super()
    this.setMarker = this.setMarker.bind(this)
    this.state = {
      activeMarker: null
    }
  }

  setMarker(marker){
    this.setState({activeMarker: marker})
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.screen}>
        <Map setMarker={this.setMarker} navigation={navigation}/>
      </View>
    )
  }

}
