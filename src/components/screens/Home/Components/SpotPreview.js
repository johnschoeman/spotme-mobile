import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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
			this.setState({marker: newProps.marker})
		}
	}

	_renderPreview(){
		if (this.state.marker) {
			return(
				<View> 
					<Text>{this.state.marker.title}</Text>
				</View> 
			)
		}
	}

	render(){
		console.log(this.state.marker);
		return(
			<View style={{height: 150, width: 150}}>
				{this._renderPreview()}
			</View>
		)
	}
}