import React from 'react';
import { View, Image, Dimensions, TouchableHighlight } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class GoogleAutocomplete extends React.Component {
  constructor(){
    super()
    this.state = {
      marker: null,
      height: 0
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.state.marker !== newProps.marker) {
      this.setState({ marker: newProps.activeMarker })
    }
  }

  render(){
    const { height, width } = Dimensions.get('window')
    return(
      <TouchableHighlight style={{ position: 'absolute', top: 10, height: 50, width: width }} onPress={() => console.log("IMADEIT!!!!!!!!")}>
        <View style={{position: 'absolute', top: 10, height: 50, width: width}}>
          <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyCO_ev5TwbB8JkAO8PRefaUnHfUf1aB1SQ',
              language: 'en', // language of the results
              types: '(cities)' // default: 'geocode'
            }}
            styles={{
              textInputContainer: {
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                borderBottomWidth: 0,
                width: width - 5
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
                width: width - 5
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
              container: {
                backgroundColor: 'white',
                position: 'absolute',
                top: 35,
                height: 100
              }
            }}
            currentLocation={false}
          />
        </View>
      </TouchableHighlight>

    )
  }
}

export default GoogleAutocomplete