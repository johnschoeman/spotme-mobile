import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import Timer from 'react-native-timer';

export default class ReservationShow extends React.Component {

  constructor() {
    super()
    this.state = {
      timeRemaining: 0
    }
  }

  componentDidMount() {
    const endTime = this.props.navigation.state.params.reservation.createReservation.end_time_since_epoch
    const startTime = new Date().getTime()
    this.setState({ timeRemaining: Math.floor((endTime - startTime) / 1000)})
    Timer.setInterval(this, 'timer', 
                      () => {
                        if(this.state.timeRemaining > 0) {
                          const currTime = new Date().getTime()
                          const timeRemaining = Math.floor((endTime - currTime)/1000)
                          this.setState({ timeRemaining })
                        }
                      }, 1000)
  }
  
  pad(num) {
    return (num < 10) ? '0' + num.toString() : num.toString();
  }

  render() {
    const reservation = this.props.navigation.state.params.reservation.createReservation
    const spot = reservation.spot
    const address1 = `${spot.address_number} ${spot.address_street}`
    const address2 = `${spot.address_city}, ${spot.address_state}`
    const timeRemaining = this.state.timeRemaining
    const timeRemainingHours = this.pad(Math.floor((timeRemaining/3600)))
    const timeRemainingMinutes = this.pad(Math.floor(((timeRemaining % 3600) /60)))
    const timeRemainingSeconds = this.pad(timeRemaining % 60)
    const timeRemainingString = `${timeRemainingHours}:${timeRemainingMinutes}:${timeRemainingSeconds}`
    return (
      <View style={localStyles.screen}>
        <View style={localStyles.confirmLine}>
          <Text style={localStyles.defaultText}>You have an active reservation at:</Text>
          <Text style={localStyles.defaultText}>{address1}</Text>
          <Text style={localStyles.defaultText}>{address2}</Text>
        </View>
        <Image
          style={{ height: 200, width }}
          source={{ uri: spot.image_url }}
        />
        <Text style={localStyles.defaultText}>Your reservation expires in:</Text>
        <Text style={localStyles.timerText}>{timeRemainingString}</Text>
      </View>
    )
  }
}

const { height, width } = Dimensions.get('window')
const localStyles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    padding: 10
  },
  confirmLine: {
    width: '100%',
    marginBottom: 10
  },
  timerText: {
    fontSize: 36,
    fontWeight: '900',
    color: 'rgb(150,0,0)'
  },
  defaultText: {
    fontSize: 24,
    fontWeight: '500',
    color: 'rgb(80,80,80)'
  }
})