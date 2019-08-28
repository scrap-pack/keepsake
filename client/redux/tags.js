import axios from 'axios';

const GET_TAGS = 'GET_TAGS';
const GET_SINGLE_TAG = 'GET_SINGLE_TAG';
const UPLOAD_TAGS = 'UPLOAD_TAGS';
const CLEAR_TAGS = 'CLEAR_TAGS';

const getTags = tags => ({ type: GET_TAG, tags });
const getSingleTag = tag => ({ type: GET_SINGLE_TAG, tag });
const uploadTags = addedtags => ({ type: UPLOAD_IMAGES, addedtags });
const clearTags = () => ({ type: CLEAR_TAGS });

const parseTagsFromString = tagsString => {
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

export const storeTags = (tags, dispatch) => {
  const addedTags = parseTagsFromString(tags);
  dispatch(uploadTags(addedTags));
};

const intialState = {
  currentTags: [],
  singleTag: {},
};

const tags = (state = intialState, action) => {
  switch (action.type) {
    case GET_TAGS:
      return { ...state, currentTags: [...state.currentTags, ...action.tags] };
    case GET_SINGLE_TAG:
      return { ...state, singleTag: action.tag };
    case UPLOAD_TAGS:
      return { ...state, currentTags: [...currentTags, ...action.addedTags] };
    case CLEAR_TAGS:
      return { ...state, currentTags: [] };
    default:
      return state;
  }
};

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

export const postTags = tags => dispatch => {
  axios
    .pos('/api/tags', [...tags])
    .then(tags => dispatch(clearTags(tags)))
    .catch(e => console.error(e));
};

export default tags;
