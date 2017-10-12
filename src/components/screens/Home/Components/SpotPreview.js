import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Modal from 'react-native-modal';
import { Animated, LayoutAnimation } from 'react-native';
import StarRating from 'react-native-star-rating';

export default class SpotPreview extends React.Component {
	constructor(){
		super()
		this._renderPreview = this._renderPreview.bind(this)
		this.state = {
			marker: null
		}
	}

	componentWillReceiveProps(newProps){
		if (this.state.marker !== newProps.marker) {
			console.log("I HAVE RECEIVED NEW PROPS", newProps)
			this.setState({marker: newProps.activeMarker})
		}
	}

	_renderPreview(){
    const { height, width } = Dimensions.get('window')
		if (this.state.marker) {
			return(
				<Animated.View style={{height: 150, width}}> 
					<Text>{this.state.marker.title}</Text>
				</Animated.View> 
			)
		}
	}

	render(){
    console.log(this.state.marker);
    
		return(
      <View style={{position: "absolute", bottom: 0, backgroundColor: "green", zIndex: 9999 }}>
				{this._renderPreview()}
			</View>
		)
	}
}