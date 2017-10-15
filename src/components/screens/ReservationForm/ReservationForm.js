import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import { View, Slider, Text, StyleSheet } from 'react-native'
import { FormLabel } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

import { CREATE_RESERVATION_MUTATION } from
    '../../../graphql/mutations/ReservationMutations'
import styles from '../../../styles/styles'

class ReservationForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      duration: 60,
    };
  }

  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
  }

  _handleSubmit = async () => {
      const { duration } = this.state
      const { spot_id } = this.props.spot
      const now = new Date()
      const start_time = now.toISOString()
      const end_time = this.addMinutes(now, duration).toISOString()
      const reservationVariables = { variables: { spot_id, start_time, end_time } }
      const result = await this.props.createReservationMutation(reservationVariables)
      // resetNavigateHome()
  }

  timeUnitsToString(time) {
    timeString = String(time)
    return time < 10 ? `0${timeString}` : timeString
  }

  render() {
    const { duration } = this.state
    const hours = Math.floor( duration / 60)
    const hoursString = this.timeUnitsToString(hours)
    const minutes = duration % 60
    const minutesString = this.timeUnitsToString(minutes)
    const now = new Date()
    const nowString = now.toLocaleTimeString()


    return (
      <View style={styles.screen}>
        <Text>Reserve this spot!</Text>
        <FormLabel>How long?</FormLabel>
        <View>
          <Text>Duration: {`${hoursString}:${minutesString}`}</Text>
          <Text>Ending: {timeNow}</Text>
        </View>
        <Slider
          maximumValue={60 * 24}
          minimumValue={15}
          step={15}
          value={this.state.duration}
          onValueChange={(val) => this.setState({duration: val})}
          />
      </View>
    )
  }
}

export default compose(
    graphql(CREATE_RESERVATION_MUTATION, { name: 'createReservationMutation' })
)(ReservationForm);
