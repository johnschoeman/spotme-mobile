import React from 'react';
import { Text, View } from 'react-native';

class Post extends React.Component {

  render() {
    return (
      <View>
        <Text>{this.props.post.title}</Text>
        <Text>{this.props.post.body}</Text>
      </View>
    )
  }
}

export default Post;