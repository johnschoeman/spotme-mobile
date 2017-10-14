import React from 'react';
import { View, Image, Dimensions, TouchableHighlight, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class GoogleAutocomplete extends React.Component {
  constructor() {
    super()
    this.state = {
      marker: null,
      height: 40,
      text: ""
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.state.marker !== newProps.marker) {
      this.setState({ marker: newProps.activeMarker })
    }
  }

  update(text) {
    this.setState({ height: 300, text: text })
  }

  render() {
    // console.log("TEXT STATE", this.state.text)
    const { height, width } = Dimensions.get('window')
    return (
      <View>
          <GooglePlacesAutocomplete
            placeholder=''
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            getDefaultValue={() => {
              console.log(this.state.text)
              this.state.text
            }}
            fetchDetails={true}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              console.log(data, details);
              this.setState({ height: 40 })
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyCO_ev5TwbB8JkAO8PRefaUnHfUf1aB1SQ',
              language: 'en', // language of the results
              types: '(cities)', // default: 'geocode'
              input: "San Franscisco"
            }}
            styles={{
              textInputContainer: {
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                borderBottomWidth: 0,
                width: width - 5
              },
              textInput: {
                display: 'none',
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
                height: this.state.height
              }
            }}
            currentLocation={false}
          />
          <TextInput
            style={{ position: 'absolute', top: 40, height: 40, width: width, borderColor: 'gray', borderWidth: 1, zIndex: 9999999, backgroundColor: 'white' }}
            onChangeText={(text) => this.update(text)}
            placeholder={"Enter Location"} />
        </View>
    )
  }
}

export default GoogleAutocomplete