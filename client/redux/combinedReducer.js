import { combineReducers } from 'redux';
import imageReducer from './images';
import userReducer from './users';

// Import reducers here to combine

const combinedReducer = combineReducers({ images: imageReducer, users: userReducer });

export default combinedReducer;
