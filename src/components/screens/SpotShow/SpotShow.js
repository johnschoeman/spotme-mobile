import React from 'react';
import { Animated, LayoutAnimation, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';

import ReservationFormContainer from '../ReservationForm/ReservationFormContainer'

export default class SpotShow extends React.Component {
  constructor() {
    super()
    this.state = {
      height: 0
    }
  }

  componentDidMount() {
    const { height } = Dimensions.get('window')
    this.setState({ height });
  }

  onSwipe(gestureName, gestureState) {
    const { height, width } = Dimensions.get('window')
    const { SWIPE_DOWN } = swipeDirections;
    switch (gestureName) {
      case SWIPE_DOWN:
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ height: 0 })
        break;
      default:
        return
    }
  }

  render() {
    const { height, width } = Dimensions.get('window')
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 10,
    };
    const { navigation, spot } = this.props
    if (spot) {
      const address1 = spot.address_street && spot.address_number ?
        `${spot.address_number} ${spot.address_street}` :
        `Latitude: ${spot.latitude}`
      const address2 = spot.address_city && spot.address_state && spot.address_zip ?
        `${spot.address_city}, ${spot.address_state} ${spot.address_zip}` :
        `Longitude: ${spot.longitude}`
      return (
        <Animated.View style={{ height: this.state.height, width, flexDirection: "column", paddingTop: 12 }}>
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onPress={() => this.setState({ height: height - 25 })}
            config={config}
          >
            <View style={{ width, alignItems: 'center'}}>
              <Ionicons name="ios-arrow-down" size={20} color="black" />
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 30, justifyContent: 'space-between' }}>
              <View style={{
                flexDirection: 'column'
              }}>
                <Text>{address1}</Text>
                <Text>{address2}</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <StarRating
                  disabled
                  maxStars={5}
                  rating={spot.rating}
                  starSize={20}
                />
                <Text style={{ fontSize: 18 }}>${spot.price}.00/hr</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'center', paddingTop: 10 }}>
              <Image
                style={{ height: 200, width: width }}
                source={{ uri: 'http://res.cloudinary.com/ddgt25kwb/image/upload/v1507653351/garage-spot_bcnnyu.jpg' }}
              />
            </View>
          </GestureRecognizer>
          <ReservationFormContainer navigation={navigation} spot={spot}/>
        </Animated.View>
      )
    }
  }
}
