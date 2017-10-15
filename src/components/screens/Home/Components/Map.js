import React from 'react';
import { MapView, Location, Permissions } from 'expo';
import { Keyboard, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { graphql, gql } from 'react-apollo'
import SpotPreview from './SpotPreview'
import { graphql, gql } from 'react-apollo';
import LocationAutocomplete from './LocationAutocomplete'
import { Animated, LayoutAnimation, Keyboard, StyleSheet, Text, View, Image, Dimensions } from 'react-native';

class Map extends React.Component {
    constructor() {
        super();
        this.onRegionChange = this.onRegionChange.bind(this)
        this._getLocationAsync = this._getLocationAsync.bind(this);
        this.renderCurrentLocationMarker = this.renderCurrentLocationMarker.bind(this);
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
            location: {}
        }
    }

    componentDidMount() {
      Location.getProviderStatusAsync({})
			this._getLocationAsync()
			// console.log("SPOTSSSSSKSDFLSKJFSDF", this.props.getSpots)
			// this.props.getSpots()
		}
		
		// _getMarkersAsync = async () => {
		// 	this.props.getSpots()
		// }

    onRegionChange(region) {
        this.setState({ region })
    }

    animateTo(region) {
        this.map.animateToRegion(region)
    }

    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      // console.log("STATUS:", status)
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        // console.log("LOCATION:", location);
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
    renderCurrentLocationMarker() {
      const locMarkerImg = require('../../../../../assets/icons/location_marker.png');
      // console.log(Object.keys(this.state.location));
      if (Object.keys(this.state.location).length!== 0) {
        return (
          <MapView.Marker
            coordinate={this.state.location.coords}
            title="Current Location"
            description="You are Here">
            <Image
              source={locMarkerImg}
              style={{ width: 25, height: 25 }}/>
          </MapView.Marker>
        )
      }      
    }

    render() {

        let markers;
        if (this.props.getSpots.allSpots) {
          markers = this.props.getSpots.allSpots;
        } else {
          markers = [];
				}
				if (markers["0"]){
					console.log('markersFIRST: ', markers["0"].longitude);
				}
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
        };
        const { height, width } = Dimensions.get('window')
        const markerImg = require('../../../../../assets/icons/spotme_marker.png');
        const activeMarkerImg = require('../../../../../assets/icons/spotme_marker_selected.png');
        // console.log("MAPS", this.props.data.allSpots)
        return (
            <View>
                <MapView
                  ref={ref => (this.map = ref)}
                  onPress={() => Keyboard.dismiss}
                  style={{ height, width}}
                  region={this.state.region}
                  onRegionChange={this.onRegionChange}>
                  {Object.keys(markers).map((key) => (
                    <MapView.Marker
                                    coordinate={{ latitude: markers[key].latitude, longitude: markers[key].longitude}}
                                    title={markers[key].address_number + " " + markers[key].address_street}z
									onPress={() => this.setState({ activeMarker: markers[key]})}
									key={key}>
                    <Image source={markerImg}
                      style={{ width: 25, height: 25 }}/>
                    </MapView.Marker>
                  ))}
                  {this.renderCurrentLocationMarker()}
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

const GET_SPOTS = gql`
  query GetSpots {
		allSpots {
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
`

// const GET_SPOTS = gql`
//   query GetSpots($first: Int, $skip: Int) {
// 		allSpots(first: $first, skip: $skip) {
// 			id
// 			latitude
// 			longitude
// 			description
// 			image_url
// 			price
// 			rating
// 			address_number
// 			address_street
// 			address_city
// 			address_state
// 			address_zip
// 			reservations {
// 			id
// 			start_time
// 			end_time
// 			spot {
// 				id
// 			}
// 			user {
// 				id
// 				email
// 			}
// 		}
// 		}
// 	}
// `

export default graphql(GET_SPOTS, {name: 'getSpots'})(Map);