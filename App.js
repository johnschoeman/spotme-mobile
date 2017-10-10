import React from 'react';
import { UIManager } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import configureStore, { client } from './src/redux/store/store';
import { colors } from './src/utils/constants';

// switch out MainNavigator for Demo to test John's graphql demo app
// import Demo from './Demo/Demo';
import MainNavigator from './src/components/navigators/Main'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const preloadedState = {

}

const store = configureStore(preloadedState)

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <ThemeProvider theme={colors}>
          <MainNavigator/>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
