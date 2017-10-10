import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import thunk from 'redux-thunk'

import rootReducer from '../reducers/rootReducer'

// Apollo redux setup learned from https://github.com/EQuimper/twitterclone-mobile-starter/blob/master/src/store.js

const networkInterface = createNetworkInterface({
  uri: '', // TODO fill in correct backend uri
});

export const client = new ApolloClient({
  networkInterface,
});

const middlewares = [client.middleware(), thunk];

const configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer(client),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
)

export default configureStore
