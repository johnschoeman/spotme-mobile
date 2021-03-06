import React from 'react';
import { TouchableOpacity, Linking, View, Text, Button, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import Timer from 'react-native-timer';
import getDirections from 'react-native-google-maps-directions'

export default class ReservationShow extends React.Component {

  constructor() {
    super()
    this.handleGetDirections = this.handleGetDirections.bind(this)
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

  handleGetDirections = () => {
    const reservation = this.props.navigation.state.params.reservation.createReservation
    const spot = reservation.spot
    const address1 = `${spot.address_number} ${spot.address_street}`.split(" ").join("+")
    const address2 = `${spot.address_city} ${spot.address_state} ${spot.address_zip}`.split(" ").join("+")
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${address1}+${address2}&travelmode=driving`)
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
        <View style={localStyles.addButtonView}>
          <TouchableOpacity
            style={localStyles.dirButton}
            onPress={() => this.handleGetDirections()}>
            <Text style={localStyles.dirButtonText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
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
  },
  addButtonView: {
    alignItems: 'center',
    paddingTop: 140,
    paddingBottom: 30,
  },
  dirButton: {
    width: 150,
    padding: 7,
    backgroundColor: 'rgb(150, 0, 0)',
    alignItems: 'center',
    borderRadius: 16,
  },
  dirButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  }
})