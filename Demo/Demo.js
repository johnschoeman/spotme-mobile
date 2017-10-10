import React from 'react';
import { Text, View } from 'react-native';


import Welcome from './Welcome';
import PostList from './PostList';
import CreatePost from './CreatePost';

export default class Demo extends React.Component {
  render() {
    return (

      <View>
        <Text>Hello World!</Text>
        <Welcome />
        <PostList />
        <CreatePost />
      </View>

    );
  }
}
