import React from 'react';
import { UIManager, StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import { store, client } from './src/store';
import { colors } from './src/utils/constants';

import Welcome from './src/components/Welcome';
import PostList from './src/components/PostList';
import CreatePost from './src/components/CreatePost';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <ThemeProvider theme={colors}>
          <View>
            <Text>Hello World!</Text>
            <Welcome />
            <PostList />
            <CreatePost />
          </View>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
