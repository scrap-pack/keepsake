import { combineReducers } from 'redux';
import imageReducer from './images';
import userReducer from './users';
import tagReducer from './tags';
import albumReducer from './albums';

// Import reducers here to combine

const combinedReducer = combineReducers({
  images: imageReducer,
  currentUser: userReducer,
  tags: tagReducer,
  albums: albumReducer,
});

export default combinedReducer;
