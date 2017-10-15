import React from 'react';
import { Animated, LayoutAnimation, Text, View, Image, Dimensions } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';
import { graphql, gql } from 'react-apollo';
import SpotShowScreen from '../../SpotShow/SpotShowScreen'

class SpotPreview extends React.Component {
	constructor(){
		super()
		this._renderPreview = this._renderPreview.bind(this)
		this._renderFull = this._renderFull.bind(this)
		this.onSwipe = this.onSwipe.bind(this)
		
		this.state = {
			spot: null,
			spotId: null,
			height: 150
		}
	}

	componentWillReceiveProps(newProps){
		if (newProps.activeSpot) {
			if (this.state.spot !== newProps.activeSpot) {
				this.setState({spot: newProps.activeSpot})
			}
		}
	}

	onSwipe(gestureName, gestureState) {
		const { height, width } = Dimensions.get('window')
		const { SWIPE_UP, SWIPE_DOWN } = swipeDirections;
		switch (gestureName) {
			case SWIPE_UP:
				LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
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
		return (
				<Animated.View style={{ height: this.state.height, width, flexDirection: "column", paddingTop: 10 }}>
					<SpotShowScreen spot={this.state.spot}/>
				</Animated.View>
		)
	}

	_renderPreview(){
		const { height, width } = Dimensions.get('window')
		if (this.state.spot) {
			const spot = this.state.spot
			const address1 = spot.address_street && spot.address_number ?
				`${spot.address_number} ${spot.address_street}` :
				`Latitude: ${spot.latitude}`
			const address2 = spot.address_city && spot.address_state && spot.address_zip ?
				`${spot.address_city}, ${spot.address_state} ${spot.address_zip}` :
				`Longitude: ${spot.longitude}`
			return(
				<Animated.View 
					onPress={() => this.setState({ height: height - 25 })}
					style={{ height: 200, width, paddingTop: 5, paddingLeft: 10, alignItems: 'center'}}>
					<Ionicons name="ios-arrow-up" size={20} color="black" />
					<Text>{address1}</Text>
					<Text>{address2}</Text>
					<View style={{ flexDirection: 'row', paddingTop: 20 }}>
						<Image
							style={{ width: 140, height: 80 }}
							source={{ uri: "http://res.cloudinary.com/ddgt25kwb/image/upload/v1507653351/garage-spot_bcnnyu.jpg" }} />
						<View style={{ flexDirection: 'column', paddingLeft: 100, paddingTop: 10, paddingRight: 20 }}>
							<StarRating
								disabled={false}
								maxStars={5}
								rating={this.state.spot["rating"]}
								selectedStar={(rating) => {
									let spot = this.state.spot
									spot["rating"] = rating
									this.setState({ spot: spot })
								}}
								starSize={20}
							/>
							<Text style={{ fontSize: 18 }}>${this.state.spot["price"]}/hr</Text>
						</View>
					</View>
				</Animated.View> 
			)
		}
	}

	render(){
		// let spot;
		// let spot_id = this.props.activespotId;
		// let spotVaribles = { variable: {spot_id: spot_id}}
		// if (this.props.getSpot) {
		// 	spot = this.props.getSpot(spotVaribles).getSpot;
		// 	this.setState({spot: spot})
		// } else {
		// 	spot = {};
		// }
		// console.log("SSSSSSPPPPPPOOOOOOOOTTTTTTT", spot)

		const { height, width } = Dimensions.get('window')
		const config = {
			velocityThreshold: 0.3,
			directionalOffsetThreshold: 10,
		};
		return(
      <View style={{position: "absolute", bottom: 0, backgroundColor: "white", zIndex: 9999 }}>
				<GestureRecognizer
					onSwipe={(direction, state) => this.onSwipe(direction, state)}
					onPress={() => this.setState({ height: height - 25})}
					config={config}
				>
					{this.state.height <= 150 ? this._renderPreview() : this._renderFull()}
				</GestureRecognizer>
			</View>
		)
	}
}

const GET_SPOT_QUERY = gql`
query GetSpot($spot_id: Int) {
	getSpot(spot_id: $spot_id) {
		id
		latitude
		longitude
		description
		image_url
		price
		rating
		address_number
		address_street
		address_city
		address_state
		address_zip
		reservations {
			id
			start_time
			end_time
			spot {
				id
			}
			user {
				id
				email
			}
		}
	}
}
`;

// export default graphql(GET_SPOT_QUERY, {name: 'getSpot'})(SpotPreview);
export default SpotPreview;