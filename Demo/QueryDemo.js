import React from 'react';
import { Text, View } from 'react-native';
import { graphql, gql } from 'react-apollo';

function PostList({ data: { loading, allPosts }}) {
  if (loading) {
    return <Text>Loading</Text>
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