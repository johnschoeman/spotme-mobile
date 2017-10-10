import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import thunk from 'redux-thunk';

import reducers from './reducers';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj8lu8ukt06rv0132uuni3tx7',
});

export const client = new ApolloClient({
  networkInterface,
});

const middlewares = [client.middleware(), thunk];

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
