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
		this._renderFull = this._renderFull.bind(this)
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
		const { height, width } = Dimensions.get('window')
		const { SWIPE_UP, SWIPE_DOWN } = swipeDirections;
		switch (gestureName) {
			case SWIPE_UP:
				LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
				console.log("IT SWIPEES UP")
				this.setState({height: height - 25})
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
			console.log("MARKER SETTINGS!!!!!", this.state.marker)
			return (
				<Animated.View style={{ height: this.state.height, width, flexDirection: "column", paddingTop: 10 }}>
					<View style={{ flexDirection: 'row', paddingTop: 10, paddingRight: 5, paddingLeft: 5, justifyContent: 'space-between' }}>
						<View style={{
							flexDirection: 'column'}}>
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

	_renderPreview(){
		const { height, width } = Dimensions.get('window')
		if (this.state.marker) {
			return(
				<Animated.View style={{ height: 170, width: width, flexDirection: 'row', paddingTop: 20, paddingLeft: 10}}> 
					<Image
						style={{ width: 140, height: 80 }}
						source={{ uri: "http://res.cloudinary.com/ddgt25kwb/image/upload/v1507653351/garage-spot_bcnnyu.jpg" }} />
					<View style={{ flexDirection: 'column', paddingLeft: 100, paddingTop: 10, paddingRight: 20 }}>
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
					{this.state.height <= 150 ? this._renderPreview() : this._renderFull()}
				</GestureRecognizer>
			</View>
		)
	}
}