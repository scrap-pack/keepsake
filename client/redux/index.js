import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import combinedReducer from './combinedReducer';

const store = createStore(combinedReducer, applyMiddleware(thunk, logger));

export default store;
