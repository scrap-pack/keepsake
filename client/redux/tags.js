import axios from 'axios';

// Actions
const GET_TAGS = 'GET_TAGS';
const GET_SINGLE_TAG = 'GET_SINGLE_TAG';
const UPLOAD_TAGS = 'UPLOAD_TAGS';
const CLEAR_TAGS = 'CLEAR_TAGS';
const SEARCH_TAGS = 'SEARCH_TAGS';
const CLEAR_FILTERED_TAGS = 'CLEAR_FILTERED_TAGS';
const CLEAR_SELECTED_TAG = 'CLEAR_SELECTED_TAGS';
const SET_SELECTED_TAG = 'SET_SELECTED_TAG';

<<<<<<< HEAD
const getTags = tags => ({ type: GET_TAG, tags });
const getSingleTag = tag => ({ type: GET_SINGLE_TAG, tag });
const uploadTags = addedtags => ({ type: UPLOAD_TAGS, addedtags });
=======
// Action Creators
const getTags = (tags) => ({ type: GET_TAGS, tags });
const getSingleTag = (tag) => ({ type: GET_SINGLE_TAG, tag });
const uploadTags = (addedtags) => ({ type: UPLOAD_TAGS, addedtags });
>>>>>>> d2c3fb24096a965d0725f25ce4069c2837eff8de
const clearTags = () => ({ type: CLEAR_TAGS });
const getSearchTags = (tags) => ({ type: SEARCH_TAGS, tags });
export const clearFilteredTags = () => ({ type: CLEAR_FILTERED_TAGS });
export const clearSelectedTag = () => ({ type: CLEAR_SELECTED_TAG });
export const setSelectedTag = (tag) => ({ type: SET_SELECTED_TAG, tag });

const parseTagsFromString = (tagsString) => {
  let tagsArr = [];
  let tag = '';
  for (let i = 0; i < tagsString.length; i++) {
    if (tagsString[i] === ',' || tagsString[i] === ' ') {
      tagsArr.push(tag);
    } else {
      tag += tagsString[i];
    }
    return tagsArr;
  }
};

// Thunks
export const storeTags = (tags, dispatch) => {
  const addedTags = parseTagsFromString(tags);
  dispatch(uploadTags(addedTags));
};

export const fetchTags = () => (dispatch) => {
  axios
    .get('/api/tags')
    .then((tags) => dispatch(getTags(tags)))
    .catch((e) => console.error(e));
};

export const fetchSingleTag = (id) => (dispatch) => {
  axios
    .get(`/api/tag/${id}`)
    .then((tag) => dispatch(getSingleTag(tag)))
    .catch((e) => console.error(e));
};

export const postTags = (tags) => (dispatch) => {
  axios
    .post('/api/tags', [...tags])
    .then((tags) => dispatch(clearTags(tags)))
    .catch((e) => console.error(e));
};

export const searchTags = (queryString) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/tags/search?q=${queryString}`);
    dispatch(getSearchTags(data));
  } catch (e) {
    console.error(e);
  }
};

// Reducer
const intialState = {
  currentTags: [],
  singleTag: {},
  filteredTags: [],
  selectedTag: {},
};

const tags = (state = intialState, action) => {
  switch (action.type) {
    case GET_TAGS:
      return { ...state, currentTags: [...state.currentTags, ...action.tags] };
    case GET_SINGLE_TAG:
      return { ...state, singleTag: action.tag };
    case UPLOAD_TAGS:
      return {
        ...state,
        currentTags: [...state.currentTags, ...action.addedTags],
      };
    case CLEAR_TAGS:
      return { ...state, currentTags: [] };
    case SEARCH_TAGS:
      return { ...state, filteredTags: action.tags };
    case CLEAR_FILTERED_TAGS:
      return { ...state, filteredTags: [] };
    case CLEAR_SELECTED_TAG:
      return { ...state, selectedTag: {} };
    case SET_SELECTED_TAG:
      return { ...state, selectedTag: action.tag };
    default:
      return state;
  }
};

export default tags;
