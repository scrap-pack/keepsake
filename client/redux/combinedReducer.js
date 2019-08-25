import { combineReducers } from 'redux';
import imageReducer from './images.js';

// Import reducers here to combine

const combinedReducer = combineReducers({ images: imageReducer });

export default combinedReducer;
