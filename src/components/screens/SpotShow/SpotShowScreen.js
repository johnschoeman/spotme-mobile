import React from 'react'
import { View } from 'react-native';

import SpotShow from './SpotShow'
import ReservationFormContainer from '../ReservationForm/ReservationFormContainer'
import styles from '../../../styles/styles'

export default class SpotShowScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        switch (navigation.state.params.formType) {
            case 'logIn':
                return { title: 'Log In' }
            case 'signUp':
                return { title: 'Sign Up' }
            default:
                return { title: 'No Title' }
        }
    }

    // constructor(props) {
    //   super(props)
    // }

    render() {
        const { navigation } = this.props
        const { spot } = this.props
        console.log("I'M IN SPOT SHOW SCREEN: ", this.props)
        return (
            <View style={styles.screen}>
                <SpotShow navigation={navigation} spot={spot}/>
                <ReservationFormContainer navigation={navigation} />
            </View>
        )
    }

}
