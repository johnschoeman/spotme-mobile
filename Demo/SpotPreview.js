import React from 'react';
import { Text, View } from 'react-native';

class SpotPreview extends React.Component {

  render() {
    return (
      <View>
        <Text>Spot Id: {this.props.spot.id}</Text>
        <Text>Spot Lat: {this.props.spot.latitude}</Text>
        <Text>Spot Lng: {this.props.spot.longitude}</Text>
      </View>
    )
  }
}

export default SpotPreview;