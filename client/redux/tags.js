import axios from 'axios';

// Actions
const GET_TAGS = 'GET_TAGS';
const GET_SINGLE_TAG = 'GET_SINGLE_TAG';
const ADD_TAG = 'ADD_TAG';
const CLEAR_TAGS = 'CLEAR_TAGS';
const SEARCH_TAGS = 'SEARCH_TAGS';
const CLEAR_FILTERED_TAGS = 'CLEAR_FILTERED_TAGS';
const CLEAR_SELECTED_TAG = 'CLEAR_SELECTED_TAGS';
const SET_SELECTED_TAG = 'SET_SELECTED_TAG';
const PARSE_TAGS = 'PARSE_TAG';
const CLEAR_TAG_STRING = 'CLEAR_TAG_STRINGS';

// Action Creators
const getTags = tags => ({ type: GET_TAG, tags });
const getSingleTag = tag => ({ type: GET_SINGLE_TAG, tag });
const getSearchTags = tags => ({ type: SEARCH_TAGS, tags });
export const clearTags = () => ({ type: CLEAR_TAGS });
export const addEnteredTags = tagString => ({ type: ADD_TAG, tagString });
export const parseTags = () => ({ type: PARSE_TAGS });
export const clearFilteredTags = () => ({ type: CLEAR_FILTERED_TAGS });
export const clearSelectedTag = () => ({ type: CLEAR_SELECTED_TAG });
export const setSelectedTag = tag => ({ type: SET_SELECTED_TAG, tag });
export const clearString = () => ({ type: CLEAR_TAG_STRING });

const parseTagsFromString = tagsString => {
  let tagsArr = [];
  let tag = '';
  for (let i = 0; i < tagsString.length; i++) {
    if (tagsString[i] === ',' || tagsString[i] === ' ') {
      tagsArr.push(tag);
      tag = '';
    } else {
      tag += tagsString[i];
    }
  }
  tagsArr.push(tag);
  const tags = {};
  return tagsArr.filter(tag => {
    if (!tags[tag] && tag && tag !== ' ') {
      tags[tag] = tag;
      return true;
    }
    return false;
  });
};

// Thunks
export const fetchTags = () => dispatch => {
  axios
    .get('/api/tags')
    .then(tags => dispatch(getTags(tags)))
    .catch(e => console.error(e));
};

export const fetchSingleTag = id => dispatch => {
  axios
    .get(`/api/tag/${id}`)
    .then(tag => dispatch(getSingleTag(tag)))
    .catch(e => console.error(e));
};

export const postTags = (tags, images) => dispatch => {
  axios
    .post(`/api/tags`, { tags, images })
    .then(() => dispatch(clearTags()))
    .catch(e => console.error(e));
  9;
};

export const searchTags = queryString => async dispatch => {
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
  tagString: '',
};

const tags = (state = intialState, action) => {
  switch (action.type) {
    case GET_TAGS:
      return { ...state, currentTags: [...state.currentTags, ...action.tags] };
    case GET_SINGLE_TAG:
      return { ...state, singleTag: action.tag };
    case ADD_TAG:
      return {
        ...state,
        tagString: action.tagString,
      };
    case PARSE_TAGS:
      const tags = parseTagsFromString(state.tagString);
      return { ...state, currentTags: tags };
    case CLEAR_TAG_STRING:
      return { ...state, tagString: '' };
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
