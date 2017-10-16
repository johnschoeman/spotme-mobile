import React from 'react'
import { graphql } from 'react-apollo'
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Slider
} from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'
import { CREATE_SPOT_MUTATION } from '../../../graphql/mutations/SpotMutations'

class NewSpotScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      address: '',
      price: 2.5,
    };
  }

  _formatPriceString(price) {
		return parseFloat(Math.round(price * 100) / 100).toFixed(2);
	}

  _handleSubmit = async () => {
    const { address, price } = this.state
    const spotVariables = { variables: { address, price } }

    const result = await this.props.createSpotMutation(spotVariables)
    const spot = result.data.createSpot
    this.props.receiveSpot(spot)
    this.state.address = ''
    this.props.navigateBack()
  }

  render() {
    const {price} = this.state

    return (
      <View style={localStyles.screen}>
        <View style={localStyles.screenTopSection}>
          <View style={localStyles.headerView}>
            <Text style={localStyles.headerText}>ADD SPOT</Text>
          </View>
          <ScrollView>
            <FormLabel>ADDRESS</FormLabel>
            <FormInput onChangeText={(address) => this.setState({address})}/>
            <View style={localStyles.sliderLabelContainer}>
              <FormLabel>PRICE</FormLabel>
              <Text style={localStyles.price}>
                ${this._formatPriceString(price)}
              </Text>
            </View>
            <Slider
              style={localStyles.slider}
              maximumValue={30}
              minimumValue={0}
              step={0.5}
              value={2.5}
              onValueChange={(val) => this.setState({price: val})}
            />
          </ScrollView>
        </View>
        <View style={localStyles.addButtonView}>
          <TouchableOpacity
            style={localStyles.addButton}
            onPress={() => this._handleSubmit()}>
            <Text style={localStyles.addButtonText}>CREATE SPOT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const localStyles = StyleSheet.create({
  screen: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1,
  },
  screenTopSection: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1,

  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#CCC',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    backgroundColor: 'rgb(150, 0, 0)',
  },
  headerText: {
    fontSize: 30,
    marginTop: 15,
    marginBottom: 15,
    color: 'white',
    marginLeft: 20
  },
  addButtonView: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0,  height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderTopWidth: (Platform.OS === 'android') ? 1 : 0,
    borderColor: '#CCC',
    // elevation: 2,
  },
  sliderLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    marginRight: 25,
    textAlign: 'right',
    paddingTop: 15,
  },
  slider: {
    margin: 10,
  },
  addButton: {
    width: 150,
    padding: 7,
    backgroundColor: 'rgb(150,0,0)',
    alignItems: 'center',
    borderRadius: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default graphql(CREATE_SPOT_MUTATION, { name: 'createSpotMutation' })(NewSpotScreen)
