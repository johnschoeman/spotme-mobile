import React from 'react';
import { UIManager } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import configureStore, { client } from './src/redux/store/store';
import { colors } from './src/utils/constants';

// switch out MainNavigator for Demo to test John's graphql demo app
// import Demo from './Demo/Demo';
import MainNavigatorContainer from './src/components/navigators/MainNavigatorContainer'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}



const preloadedState = {
  entities: {
    spots: {}
  },
  session: {
    currentUser: null
  }
}

const store = configureStore(preloadedState)

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <ThemeProvider theme={colors}>
          <MainNavigatorContainer/>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
