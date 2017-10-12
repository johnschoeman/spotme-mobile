import React from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform
} from 'react-native'

import buildSpotIndexItems from './buildSpotIndexItems'

export default class HostSpotIndexScreen extends React.Component {

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { navigate } = this.props.navigation
    // toggle next two lines to see screen with hardcoded list vs. redux data
    const { ownSpots } = this.props
    // const ownSpots = []
    // for (let id = 0; id < 20; id++) {
    //   const spot = {
    //     id,
    //     address: {
    //       street: '1725 Tehama St',
    //       city: 'San Francisco',
    //       state: 'CA',
    //       zip: '94112'
    //     }
    //   }
    //   ownSpots.push(spot)
    // }

    const spotIndexItems = buildSpotIndexItems(ownSpots, navigate)

    return (
      <View style={localStyles.screen}>
        <View style={localStyles.screenTopSection}>
          <View style={localStyles.headerView}>
            <Text style={localStyles.headerText}>My Spots</Text>
          </View>
          <ScrollView>
            {spotIndexItems}
            {/*
            <TwoLineMenuButton
              line1='1725 Tehama St'
              line2='San Francisco, CA, 94112'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='825 Battery St'
              line2='San Francisco, CA'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='Payment Information'
              line2='Add preferred payment type.'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='Contact'
              line2='Talk to us.'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='Contact'
              line2='Talk to us.'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='Contact'
              line2='Talk to us.'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='Contact'
              line2='Talk to us.'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='Contact'
              line2='Talk to us.'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='Contact'
              line2='Talk to us.'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='Contact'
              line2='Talk to us.'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='Contact'
              line2='Talk to us.'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='Contact'
              line2='Talk to us.'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='Contact'
              line2='Talk to us.'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='Contact'
              line2='Talk to us.'
              onPress={() => navigate('')}/>
            <TwoLineMenuButton
              line1='Contact'
              line2='Talk to us.'
              onPress={() => navigate('')}/>
              */}
          </ScrollView>
        </View>
        <View style={localStyles.addButtonView}>
          <TouchableOpacity style={localStyles.addButton}>
          <Text style={localStyles.addButtonText}>ADD SPOT</Text>
          </TouchableOpacity>
        </View>
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
  addButton: {
    width: 150,
    padding: 7,
    backgroundColor: '#999',
    alignItems: 'center',
    borderRadius: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
