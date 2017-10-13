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
		console.log("GESTURE STATE", gestureState)
		const { height, width } = Dimensions.get('window')
		const { SWIPE_UP, SWIPE_DOWN } = swipeDirections;
		switch (gestureName) {
			case SWIPE_UP:
				LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
				this.setState({height: height - 25 })
				break;
			case SWIPE_DOWN:
				LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
				this.setState({ height: 150 })
				break;
			default:
				return 
		}
	}

	_renderFull(){
		const { height, width } = Dimensions.get('window')
		if (this.state.marker) {
			return (
				<Animated.View style={{ height: this.state.height, width, flexDirection: "column", paddingTop: 10 }}>
					<View style={{ justifyContent: 'center' }}>
						<Image
							style={{ height: 200, width: width }}
							source={{ uri: 'http://res.cloudinary.com/ddgt25kwb/image/upload/v1507653351/garage-spot_bcnnyu.jpg' }}
						/>
					</View>
				</Animated.View>
			)
		}
	}

	_renderPreview(){
		const { height, width } = Dimensions.get('window')
		if (this.state.marker) {
			return(
				<Animated.View style={{height: this.state.height, width, flexDirection: "row", justifyContent: 'space-around', paddingTop: 10}}>
					<View> 
						<Image
							style={{ height: 80, width: 140}}
							source={{ uri: 'http://res.cloudinary.com/ddgt25kwb/image/upload/v1507653351/garage-spot_bcnnyu.jpg' }}
						/>
					</View>
					<View style={{flexDirection: 'column'}}>
						<Text>{this.state.marker.title}</Text>
						<Text>{this.state.marker.price}</Text>
					</View>
				</Animated.View> 
			)
		}
	}

	render(){
		console.log(this.state.marker);
		const config = {
			velocityThreshold: 0,
			directionalOffsetThreshold: 80,
		};
		return(
      		<View style={{position: "absolute", bottom: 0, backgroundColor: "white", zIndex: 9999 }}>
				<GestureRecognizer
					onSwipe={(direction, state) => this.onSwipe(direction, state)}
					config={config}
				>
					{this.state.height > 150 ? this._renderFull() : this._renderPreview()}
				</GestureRecognizer>
			</View>
		)
	}
}