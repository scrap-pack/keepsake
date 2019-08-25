import { combineReducers } from 'redux';

// Import reducers here to combine
import imagesReducer from './imagesReducer.js';

const combinedReducer = combineReducers({
  images: imagesReducer,
});

export default combinedReducer;
