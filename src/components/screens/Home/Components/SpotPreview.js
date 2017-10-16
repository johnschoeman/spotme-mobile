import React from 'react';
import { StyleSheet, Animated, LayoutAnimation, Text, View, Image, Dimensions } from 'react-native';
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
		const { navigation } = this.props
		return (
				<Animated.View style={{ height: this.state.height, width, flexDirection: "column", paddingTop: 10 }}>
					<SpotShowScreen spot={this.state.spot} navigation={navigation}/>
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
				`${spot.address_city}, ${spot.address_state}` :
				`Longitude: ${spot.longitude}`
			return(
				<Animated.View
					onPress={() => this.setState({ height: height - 25 })}
					style={{ height: 200, width, alignItems: 'center'}}>
					<Image
						style={localStyles.backgroundImg}
						source={{ uri: "http://res.cloudinary.com/ddgt25kwb/image/upload/v1507653351/garage-spot_bcnnyu.jpg" }}>
						<View style={localStyles.dimmingBackground}>
							<Ionicons name="ios-arrow-up" size={20} color="white" style={{ backgroundColor: 'transparent' }}/>
							<View style={{ width, justifyContent: 'flex-start', paddingLeft: 10 }}>
								<Text style={localStyles.addressText}>{address1}</Text>
								<Text style={localStyles.addressText}>{address2}</Text>
							</View>
							<View style={{ width, flexDirection: 'row', paddingTop: 25, paddingLeft: 10, paddingRight: 10, backgroundColor: 'transparent', justifyContent: 'space-between' }}>
								<Text style={{ backgroundColor: 'transparent', fontSize: 24, fontWeight: '900', color: 'white' }}>${this.state.spot["price"]}/hr</Text>
								<StarRating
									disabled={true}
									maxStars={5}
									rating={this.state.spot["rating"]}
									selectedStar={(rating) => {
										let spot = this.state.spot
										spot["rating"] = rating
										this.setState({ spot: spot })
									}}
									starSize={20}
									starColor='white'
									emptyStarColor='white'
								/>
							</View>
						</View>
					</Image>
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
			directionalOffsetThreshold: 80,
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

const resizeMode = 'center';
const localStyles = StyleSheet.create({
	addressText: {
		fontSize: 20,
		fontWeight: '700',
		backgroundColor: 'transparent',
		color: 'white'
	},
	backgroundImg: {
		backgroundColor: 'black',
		flex: 1,
		resizeMode,
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	dimmingBackground: {
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,.3)',
		paddingTop: 5,
		alignItems: 'center'
	}
})
