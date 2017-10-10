import React from 'react';
import { Text, View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Post from './Post';

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when ready
function PostList({ data: { loading, allPosts }}) {
  if (loading) {
    return <Text>Loading</Text>
  // } else if (Object.values(posts).length === 0){
  //   return <Text>No Posts</Text>
  } else {
    return (
      <View>
        {allPosts.map(post => (
          <View key={post.id}>
            <Post post={post}/>
          </View>
        ))}
      </View>
    );
  }
}

const QUERY_ALL_POSTS = gql`
  query allPosts {
    allPosts {
      id
      title
      body
    }
  }
`;

export default graphql(QUERY_ALL_POSTS)(PostList);