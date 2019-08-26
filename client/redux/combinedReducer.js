import { combineReducers } from 'redux';
import imageReducer from './images';
import userReducer from './users';
import tagReducer from './tags';

// Import reducers here to combine

const combinedReducer = combineReducers({
  images: imageReducer,
  users: userReducer,
  tags: tagReducer,
});

export default combinedReducer;
