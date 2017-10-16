import React from 'react'
import { View } from 'react-native';

import SpotShow from './SpotShow'
import ReservationFormContainer from '../ReservationForm/ReservationFormContainer'
import styles from '../../../styles/styles'

export default class SpotShowScreen extends React.Component {

  // static navigationOptions = ({ navigation }) => {
  // }

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { navigation } = this.props
    let { spot, fromPreview } = this.props
    spot = spot || this.props.navigation.state.params.spot

    return (
      <View style={styles.screen}>
        <SpotShow fromPreview={fromPreview} navigation={navigation} spot={spot}/>
      </View>
    )
  }

}
