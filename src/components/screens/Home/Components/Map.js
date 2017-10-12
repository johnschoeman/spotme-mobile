import React from 'react';
import { Constants, MapView, Location, Permissions } from 'expo';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import SpotPreview from './SpotPreview'
import { Animated, LayoutAnimation, Keyboard, StyleSheet, Text, View, Image, Dimensions } from 'react-native';

export default class Map extends React.Component {
    constructor() {
        super();
        this.onRegionChange = this.onRegionChange.bind(this)
        this._getLocationAsync = this._getLocationAsync.bind(this);
        this.state = {
            bottomInfo: [],
            backgroundColor: "white",
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            },
            activeMarker: null,
            location: { coords: {
                          latitude: 37.78825,
                          longitude: -122.4324 }}
        }
    }

    componentDidMount() {
      Location.getProviderStatusAsync({})
      this._getLocationAsync();
    }

    onRegionChange(region) {
        this.setState({ region })
    }

    animateTo(region) {
        this.map.animateToRegion(region)
    }

    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      console.log("STATUS:", status)
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        console.log("LOCATION:", location);
        if(location !== this.state.location) {
          this.setState({
            region: { latitude: location.coords.latitude, 
                      longitude: location.coords.longitude, 
                      latitudeDelta: 0.02,
                      longitudeDelta: 0.02, }
          });
          this.animateTo({ latitude: location.coords.latitude, 
                                 longitude: location.coords.longitude, 
                                 latitudeDelta: 0.02,
                                 longitudeDelta: 0.02 })
          this.setState({ location });

        }
      }
    };

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
                image_url: "http://res.cloudinary.com/ddgt25kwb/image/upload/c_scale,w_179/v1507653351/garage-spot_bcnnyu.jpg",
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
                image_url: "http://res.cloudinary.com/ddgt25kwb/image/upload/c_scale,w_179/v1507653351/garage-spot_bcnnyu.jpg",
                rating: 3,
                price: 7.0,
                description: "THIS IS MY GYM"
            }
        ]
        const { height, width } = Dimensions.get('window')
        const markerImg = require('../../../../../assets/icons/spotme_marker.png');
        const locMarkerImg = require('../../../../../assets/icons/location_marker.png');
        console.log("REGION", this.state.region)
        return (
            <View>
                <MapView
                    ref={ref => (this.map = ref)}
                    onPress={() => this.setState({activeMarker: null})}
                    style={{ height, width}}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}>
                    {markers.map((marker) => (
                        <MapView.Marker
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                            onPress={() => this.setState({activeMarker: marker})}
                            key={marker.latlng.latitude}>
                          <Image
                            source={markerImg}
                            style={{ width: 25, height: 25 }}/>
                        </MapView.Marker>
                    ))}
                  <MapView.Marker
                    coordinate={this.state.location.coords}
                    title="Current Location"
                    description="You are Here">
                    <Image
                      source={locMarkerImg}
                      style={{ width: 25, height: 25 }}/>
                  </MapView.Marker>
                </MapView>
                <SpotPreview activeMarker={this.state.activeMarker}/>
                <Text>Hello</Text>
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