import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Modal from 'react-native-modal';
import { Animated, LayoutAnimation } from 'react-native';
import StarRating from 'react-native-star-rating';

export default class SpotShow extends React.Component {
  constructor() {
    super()
    this.state = {
      marker: this.props.marker
    }
  }
  render() {
    const { height, width } = Dimensions.get('window')
    if (this.state.marker) {
      console.log("MARKER SETTINGS!!!!!", this.state.marker)
      return (
        <Animated.View style={{ height: this.state.height, width, flexDirection: "column", paddingTop: 10 }}>
          <View style={{ flexDirection: 'row', paddingTop: 10, paddingRight: 5, paddingLeft: 5, justifyContent: 'space-between' }}>
            <View style={{
                flexDirection: 'column'
            }}>
                <Text>825 Tehama st,</Text>
                <Text>San Francisco, CA</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={this.state.marker.rating}
                    selectedStar={(rating) => {
                        let marker = this.state.marker
                        marker.rating = rating
                        this.setState({ marker: marker })
                    }}
                    starSize={20}
                />
                <Text style={{ fontSize: 18 }}>${this.state.marker.price}.00/hr</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center', paddingTop: 10 }}>
            <Image
                style={{ height: 200, width: width }}
                source={{ uri: 'http://res.cloudinary.com/ddgt25kwb/image/upload/v1507653351/garage-spot_bcnnyu.jpg' }}
            />
          </View>
          <View>
            <Text>DESCRIPTIONS</Text>
          </View>
          <View style={{ justifyContent: 'center', paddingTop: 10 }}>
            <Text>RESERVE NOW</Text>
          </View>
        </Animated.View>
      )
    }
  }
}