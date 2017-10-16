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
        if(this.props.fromPreview) { this.setState({ height: 0 })}
        break;
      default:
        return
    }
  }

  _formatPriceString(price) {
		return parseFloat(Math.round(price * 100) / 100).toFixed(2);
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
            <View style={{ width, paddingTop: 5, alignItems: 'center'}}>
    {this.props.fromPreview ? <Ionicons name="ios-arrow-down" size={20} color="black" /> : <View style={{ height: 20 }}/>}
            </View>
            <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
              <View style={{
                flexDirection: 'column', justifyContent: 'flex-start'
              }}>
                <Text style={localStyles.addressText}>{address1}</Text>
                <Text style={localStyles.addressText}>{address2}</Text>
              </View>
              <View style={localStyles.priceAndRatingContainer}>
                <Text style={localStyles.priceText}>${this._formatPriceString(spot.price || 1.5)}/hr</Text>
                <StarRating
                  disabled
                  maxStars={5}
                  rating={spot.rating}
                  starSize={20}
                  starColor='rgb(80,80,80)'
                  emptyStarColor='rgb(80,80,80)'
                />
              </View>
            </View>
            <View style={{ justifyContent: 'center', paddingTop: 10 }}>
              <Image
                style={{ height: 200, width: width }}
                source={{ uri: spot.image_url }}
              />
            </View>
          </GestureRecognizer>
          <ReservationFormContainer navigation={navigation} spot={spot}/>
        </Animated.View>
      )
    }
  }
}

const { height, width } = Dimensions.get('window')
const localStyles = StyleSheet.create({
  addressText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgb(80,80,80)'
  },
  priceAndRatingContainer: {
    width,
    flexDirection: 'row',
    paddingTop: 25,
    paddingLeft: 0,
    paddingRight: 20,
    justifyContent: 'space-between'
  },
  priceText: {
    backgroundColor: 'transparent',
    fontSize: 24,
    fontWeight: '900',
    color: 'rgb(80,80,80)'
  }
})
