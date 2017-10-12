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
		this.onSwipe = this.onSwipe.bind(this)
		this.state = {
			marker: null,
			height: 150
		}
	}

	componentWillReceiveProps(newProps){
		if (this.state.marker !== newProps.marker) {
			console.log("I HAVE RECEIVED NEW PROPS", newProps)
			this.setState({marker: newProps.activeMarker})
		}
	}

	onSwipe(gestureName, gestureState) {
		const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
		switch (gestureName) {
			case SWIPE_UP:
				LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
				console.log("IT SWIPEES UP")
				this.setState({height: 500})
				break;
			case SWIPE_DOWN:
				LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
				this.setState({ height: 150 })
				break;
			default:
				return 
		}
	}

	_renderPreview(){
		const { height, width } = Dimensions.get('window')
		if (this.state.marker) {
			return(
				<Animated.View style={{height: this.state.height, width}}> 
					<Text>{this.state.marker.title}</Text>
				</Animated.View> 
			)
		}
	}

	render(){
		console.log(this.state.marker);
		const config = {
			velocityThreshold: 0.3,
			directionalOffsetThreshold: 80,
		};
		return(
      		<View style={{position: "absolute", bottom: 0, backgroundColor: "white", zIndex: 9999 }}>
				<GestureRecognizer
					onSwipe={(direction, state) => this.onSwipe(direction, state)}
					config={config}
				>
					{this._renderPreview()}
				</GestureRecognizer>
			</View>
		)
	}
}