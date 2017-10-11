import React from 'react';
import { MapView } from 'expo';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Modal from 'react-native-modal';
import { Animated, LayoutAnimation, Keyboard, StyleSheet, Text, View, Image, Dimensions } from 'react-native';

export default class Map extends React.Component {
    constructor() {
        super();
        this.onRegionChange = this.onRegionChange.bind(this)
        this.state = {
            bottomInfo: [],
            backgroundColor: "white",
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

    onRegionChange(region) {
        this.setState({ region })
    }

    animateTo(region) {
        this.map.animateToRegion(region)
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
        };
        const markers = [
            {
                latlng: {
                    latitude: 37.78825,
                    longitude: -122.4204
                },
                title: "home",
                image_url: "http://res.cloudinary.com/ddgt25kwb/image/upload/c_scale,w_179/v1507653351/garage-spot_bcnnyu.jpg",
                rating: 5,
                price: 5.0,
                description: "THIS IS MY HOME"
            },
            {
                latlng: {
                    latitude: 37.78835,
                    longitude: -122.4314
                },
                title: "work",
                image_url: "",
                rating: 4,
                price: 10.0,
                description: "THIS IS MY WORK"
            },
            {
                latlng: {
                    latitude: 37.78455,
                    longitude: -122.4124
                },
                title: "gym",
                image_url: "",
                rating: 3,
                price: 7.0,
                description: "THIS IS MY GYM"
            }
        ]
        console.log("REGION", this.state.region)
        const { height, width } = Dimensions.get('window')
        return (
            <View>
                <MapView
                    ref={ref => (this.map = ref)}
                    onPress={Keyboard.dismiss}
                    style={{ height: height, width: width }}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}>
                    {markers.map((marker) => (
                        <MapView.Marker
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                            onPress={() => this.props.setMarker(marker)}
                            key={marker.latlng.latitude}
                        />
                    ))}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});