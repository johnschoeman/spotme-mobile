import React from 'react';
import { Text, View } from 'react-native';


import Welcome from './src/components/Welcome';
import PostList from './src/components/PostList';
import CreatePost from './src/components/CreatePost';

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
