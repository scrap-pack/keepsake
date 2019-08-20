import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import combinedReducer from './combinedReducer';

const store = createStore(combinedReducer, applyMiddleware(logger, thunk));

export default store;
