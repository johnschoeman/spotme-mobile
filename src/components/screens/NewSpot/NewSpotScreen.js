import React from 'react'
import {
  View, Text, StyleSheet
} from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'

export default class NewSpotScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      address: '',
    };
  }

  render() {
    const { navigate } = this.props.navigation
    // toggle next two lines to see screen with hardcoded list vs. redux data

    return (
      <View style={localStyles.screen}>
        <View style={localStyles.headerView}>
          <Text style={localStyles.headerText}>ADD SPOT</Text>
        </View>
        <FormLabel>ADDRESS</FormLabel>
        <FormInput onChangeText={(address) => this.setState({address})}/>
      </View>
    )
  }

}

const localStyles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
  },
  screenTopSection: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1,

  },
  headerView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#CCC',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0,  height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  headerText: {
    fontSize: 30,
    marginTop: 15,
    marginBottom: 15,
    color: '#999',
  },

});
