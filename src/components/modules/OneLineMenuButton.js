import React from 'react'
import {
  View, Text, TouchableHighlight, StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';

export default class OneLineMenuButton extends React.Component {

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { content, onPress } = this.props

    return (

      <View style={localStyles.profileButtonContainer}>
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor='#CCC'
          onPress={onPress}>
          <View style={localStyles.profileButton}>
            <View>
              <Text style={localStyles.profileButtonText}>
                { content }
              </Text>
            </View>
            <Icon name='chevron-thin-right' size={30} color='#999'/>
          </View>
        </TouchableHighlight>
      </View>

    )
  }

}

const localStyles = StyleSheet.create({
  profileButtonContainer: {
  },
  profileButton: {
    borderBottomWidth: 1,
    borderColor: '#CCC',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },
  profileButtonText: {
    fontSize: 30,
    fontWeight: '400',
    color: '#999',
  },
});
