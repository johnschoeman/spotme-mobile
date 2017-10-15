import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import { AsyncStorage, View, Button } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import Slider from "react-native-slider";

import { CREATE_RESERVATION_MUTATION } from
    '../../../graphql/mutations/ReservationMutations'
import styles from '../../../styles/styles'

class ReservationForm extends Component {

    constructor(props) {
      super(props)

      this.state = {
        spot_id: 1,
        start_time: "2018-12-13T20:02:39Z",
        end_time: "2018-12-13T20:02:56Z",   
      };
    }

    _handleSubmit = async () => {
        const { spot_id, start_time, end_time } = this.state
        const reservationVariables = { variables: { spot_id, start_time, end_time } }
        const result = await this.props.createReservationMutation(reservationVariables)
        this._navigateHome()
    }

    _navigateHome() {
        const resetNavigateHome = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })]
        })
        const { dispatch } = this.props.navigation;
        dispatch(resetNavigateHome)
    }

    render() {

        return (
          <View style={styles.screen}>
            <Slider />
            <Text>Hihihihihihi</Text>
          </View>
        )
    }


}

export default compose(
    graphql(CREATE_RESERVATION_MUTATION, { name: 'createReservationMutation' })
)(ReservationForm);
