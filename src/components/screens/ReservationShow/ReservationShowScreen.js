import React from 'react'
import { View } from 'react-native';

import ReservationShow from './ReservationShow'
import styles from '../../../styles/styles'

export default class ReservationShowScreen extends React.Component {

  // static navigationOptions = ({ navigation }) => {
  // }

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { navigation } = this.props
    let { reservation } = this.props
    reservation = reservation || this.props.navigation.state.params.reservation

    return (
      <View style={styles.screen}>
        <ReservationShow navigation={navigation} reservation={reservation} />
      </View>
    )
  }

}
