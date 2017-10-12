import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';

export default class TwoLineMenuButton extends React.Component {

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { title, description, onPress } = this.props

    return (

      <View style={localStyles.profileButtonContainer}>
        <TouchableHighlight
          onPress={onPress}>
          <View style={localStyles.profileButton}>
            <View>
              <Text style={localStyles.profileButtonTitle}>
                { title }
              </Text>
              <Text style={localStyles.profileButtonDescription}>
                { description }
              </Text>
            </View>
            <Icon name='chevron-thin-right' size={30}/>
          </View>
        </TouchableHighlight>
      </View>

    )
  }

}

const localStyles = StyleSheet.create({
  profileButtonContainer: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 15,
  },
  profileButton: {
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'space-between'
  },
  profileButtonTitle: {
    fontSize: 25,
    fontWeight: '400',

  },
  profileButtonDescription: {
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: '200',
  },
});
