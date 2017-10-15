import React from 'react';
import { Animated, LayoutAnimation, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';

export default class SpotShow extends React.Component {
  constructor() {
    super()
    this.state = {
      spot: {}
    }
  }

  componentDidMount() {
    this.setState({ spot: this.props.spot});
  }

  render() {
    const { height, width } = Dimensions.get('window')
    if (this.state.spot) {
      const spot = this.state.spot
      const address1 = spot.address_street && spot.address_number ? 
        `${spot.address_number} ${spot.address_street}` : 
        `Latitude: ${spot.latitude}`
      const address2 = spot.address_city && spot.address_state && spot.address_zip ? 
        `${spot.address_city}, ${spot.address_state} ${spot.address_zip}` : 
        `Longitude: ${spot.longitude}`
      const description = spot.description ? spot.description : "N/A"
      return (
        <Animated.View style={{ height: this.state.height, width, flexDirection: "column", paddingTop: 10 }}>
          <View style={{ flexDirection: 'row', paddingTop: 10, paddingRight: 5, paddingLeft: 5, justifyContent: 'space-between' }}>
            <View style={{
              flexDirection: 'column'
            }}>
              <Text>{address1}</Text>
              <Text>{address2}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.spot.rating}
                selectedStar={(rating) => {
                  let spot = this.state.spot
                  spot.rating = rating
                  this.setState({ spot: spot })
                }}
                starSize={20}
              />
              <Text style={{ fontSize: 18 }}>${this.state.spot.price}.00/hr</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center', paddingTop: 10 }}>
            <Image
              style={{ height: 200, width: width }}
              source={{ uri: 'http://res.cloudinary.com/ddgt25kwb/image/upload/v1507653351/garage-spot_bcnnyu.jpg' }}
            />
          </View>
          <View>
            <Text>DESCRIPTION: </Text>
            <Text>{description}</Text>
          </View>
          <View style={{ justifyContent: 'center', paddingTop: 10 }}>
            <Text>RESERVE NOW: </Text>
          </View>
        </Animated.View>
      )
    }
  }
}