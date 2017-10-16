import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import {
  View, Slider, Text, StyleSheet, TouchableOpacity
} from 'react-native'
import { FormLabel } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import dateFormat from 'dateformat'

import { CREATE_RESERVATION_MUTATION } from
    '../../../graphql/mutations/ReservationMutations'

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
      const spot_id = Number(this.props.spot.id)
      const now = new Date()
      const start_time = now.toISOString()
      const end_time = this.addMinutes(now, duration).toISOString()
      const reservationVariables = { variables: { spot_id, start_time, end_time } }
      const result = await this.props.createReservationMutation(reservationVariables)
      // redux dispatch?
      this._resetNavigateHome()
  }

  _resetNavigateHome = () => {
    const resetNavigateHomeAction = NavigationActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: 'Home' }) ]
    })
    const { dispatch } = this.props.navigation;
    dispatch(resetNavigateHomeAction)
  }

  timeUnitsToString(time) {
    const timeString = String(time)
    return time < 10 ? `0${timeString}` : timeString
  }

  render() {
    const { duration } = this.state
    const hours = Math.floor( duration / 60)
    const hoursString = this.timeUnitsToString(hours)
    const minutes = duration % 60
    const minutesString = this.timeUnitsToString(minutes)
    const now = new Date()
    const nowString = dateFormat(
      this.addMinutes(now, duration),
      'h:MM TT'
    )

    const { currentUser, spot } = this.props
    let headingText
    let buttonText
    if (spot.host_id == currentUser.id) {
      headingText = 'Place a temporary hold'
      buttonText = 'HOLD NOW'
    } else {
      headingText = 'Reserve this spot!'
      buttonText = 'RESERVE NOW'
    }


    return (
      <View style={localStyles.container}>
        <View style={localStyles.headerView}>
          <Text style={localStyles.headerText}>{headingText}</Text>
        </View>
        <View style={localStyles.labelContainer}>
          <FormLabel labelStyle={localStyles.sliderLabel}>
            How long?
          </FormLabel>
          <View>
            <Text style={localStyles.labelDurationText}>
              Duration: {`${hoursString}:${minutesString}`}
            </Text>
            <Text style={localStyles.labelDurationText}>
              Ending: {nowString}
            </Text>
          </View>
        </View>
        <Slider
          style={localStyles.slider}
          maximumValue={60 * 24}
          minimumValue={15}
          step={15}
          value={this.state.duration}
          onValueChange={(val) => this.setState({duration: val})}
        />
        <View style={localStyles.addButtonView}>
          <TouchableOpacity
            style={localStyles.reserveButton}
            onPress={() => this._handleSubmit()}>
            <Text style={localStyles.reserveButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const localStyles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    color: '#666',
    fontWeight: '500',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sliderLabel: {
    fontSize: 20,
  },
  labelDurationText: {
    textAlign: 'right',
    marginRight: 30,
    color: '#666'
  },
  slider: {

  },
  addButtonView: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
  },
  reserveButton: {
    width: 150,
    padding: 7,
    backgroundColor: 'rgb(150, 0, 0)',
    alignItems: 'center',
    borderRadius: 16,
  },
  reserveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  }
})

export default compose(
    graphql(CREATE_RESERVATION_MUTATION, { name: 'createReservationMutation' })
)(ReservationForm);
