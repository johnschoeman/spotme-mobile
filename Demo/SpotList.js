import React from 'react';
import { Text, View } from 'react-native';
import { compose, graphql, gql } from 'react-apollo';

import SpotPreview from './SpotPreview';


class SpotList extends React.Component {

  render() {
    const SpotListComponent = (props) => {
      const data = props.data;
      const loading = data.loading
      if (loading) {
        return <Text>Loading</Text>
      } 
      const allSpots = data.allSpots
      const getSpot = data.getSpot
      return (
        <View>
          {allSpots.map(spot => (
            <View key={spot.id}>
              <SpotPreview spot={spot} />
            </View>
          ))}
        <View>
          <SpotPreview spot={getSpot} />
        </View>
        </View>
      );
    }

    const SpotListComponentWithData = compose(
      graphql(GET_SPOT, {options: { variables: { spot_id: 1 } } }),
      graphql(GET_SPOTS, {options: { variables: { first: 10, skip: 5, spot_id: 1 } } })
    )(SpotListComponent);

    return (
      <View>
        <SpotListComponentWithData />
      </View>
    )
  }
}

const QUERY_ALL_SPOTS = gql`
  query allSpots {
    allSpots {
      id
      latitude
      longitude
    }
  }
`;


const GET_SPOTS = gql`
query GetSpots($first: Int, $skip: Int, $spot_id: Int!) {
  allSpots(first: $first, skip: $skip) {
    id
    latitude
    longitude
  }
  getSpot(spot_id: $spot_id) {
    id
    latitude
    longitude
  }
}
`

const GET_SPOT = gql`
query GetSpot($spot_id: Int!) {
  getSpot(spot_id: $spot_id) {
    id
    latitude
    longitude
  }
}
`

export default SpotList;