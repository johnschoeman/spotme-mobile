import { createStore, applyMiddleware, compose } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import thunk from 'redux-thunk'

import rootReducer from '../reducers/rootReducer'

// Apollo redux setup learned from https://github.com/EQuimper/twitterclone-mobile-starter/blob/master/src/store.js

const networkInterface = createNetworkInterface({
  // uri: 'https://spotme-backend.herokuapp.com/graphql',  // production backend
  // uri: 'https://api.graph.cool/simple/v1/cj8lu8ukt06rv0132uuni3tx7', // graphcool backend
  uri: 'http://localhost:3000/', // local host server
});

export const client = new ApolloClient({
  networkInterface,
});

const middlewares = [client.middleware(), thunk];

const configureStore = (preloadedState = {}) => {
  const enhancer = compose(
    applyMiddleware(...middlewares),
    global.reduxNativeDevTools ?
      global.reduxNativeDevTools() :
      noop => noop
  );

  const store = createStore(
    rootReducer(client),
    preloadedState,
    enhancer
  )
  // If you have other enhancers & middlewares
  // update the store after creating / changing to allow devTools to use them
  if (global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }

  return store
}

export default configureStore
