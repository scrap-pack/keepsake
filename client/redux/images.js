import axios from 'axios';
import { activationOptions } from '@tensorflow/tfjs-layers/dist/keras_format/activation_config';

// Actions
const GET_ALL_IMAGES = 'GET_ALL_IMAGES';
const GET_SINGLE_IMAGE = 'GET_SINGLE_IMAGE';
const GET_FILTERED_IMAGES = 'GET_FILTERED_IMAGES';
const UPLOAD_IMAGES = 'UPLOAD_IMAGES';
const SELECT_IMAGE = 'SELECT_IMAGE';
const DESELECT_IMAGE = 'DESELECT_IMAGE';
const SWAP_SELECT = 'SWAP_SELECT';
const CLEAR_FILTERED_IMAGES = 'CLEAR_FILTERED_IMAGES';
const DELETE_ALL_SELECTED_IMAGES = 'DELETE_SELECTED_IMAGES';

// Action Creators
const getAllImages = images => ({ type: GET_ALL_IMAGES, images });
const getFilteredImages = images => ({ type: GET_FILTERED_IMAGES, images });
const uploadImages = () => ({ type: UPLOAD_IMAGES });
export const getSingleImage = image => ({ type: GET_SINGLE_IMAGE, image });
export const addSelectedImage = image => ({ type: SELECT_IMAGE, image });
export const removeSelectedImage = image => ({ type: DESELECT_IMAGE, image });
export const clearFilteredImages = () => ({ type: CLEAR_FILTERED_IMAGES });
export const flipSelect = () => ({ type: SWAP_SELECT });
const deselectAllSelectedImages = images => ({
  type: DELETE_ALL_SELECTED_IMAGES,
  images,
});

// Thunks
export const fetchAllImages = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/images');
    dispatch(getAllImages(data));
  } catch (e) {
    console.error(e);
  }
};

export const fetchSingleImage = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/images/${id}`);
    dispatch(getSingleImage(data));
  } catch (e) {
    console.error(e);
  }
};

export const searchImagesByTag = tag => async dispatch => {
  try {
    const { data } = await axios.get(`/api/images/search?tag=${tag}`);
    dispatch(getFilteredImages(data));
  } catch (e) {
    console.error(e);
  }
};

export const postImages = fileData => async dispatch => {
  try {
    const { data } = await axios.post('/api/images', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('SUCCESSS POSTING IMAGE!!!', data);
    dispatch(uploadImages(data));
  } catch (e) {
    console.error(e);
  }
};

export const deleteImageFromDB = image => dispatch => {
  axios
    .delete(`api/image/${image.id}`)
    .then(image => dispatch(removeSelectedImage(image)))
    .catch(e => console.error(e));
};

export const deleteAllSelectedImages = images => dispatch => {
  Promise.all(
    images.map(image => {
      axios.delete(`api/images/${image.id}`);
    })
  )
    .then(() => dispatch(deselectAllSelectedImages()))
    .catch(e => console.error(e));
};

// Reducer
const imageState = {
  allImages: [],
  singleImage: {},
  selectedImages: [],
  selectMode: false,
  filteredImages: [],
};

const images = (state = imageState, action) => {
  switch (action.type) {
    case GET_ALL_IMAGES:
      return { ...state, allImages: [...state.allImages, ...action.images] };
    case GET_SINGLE_IMAGE:
      return { ...state, singleImage: action.image };
    case GET_FILTERED_IMAGES:
      return { ...state, filteredImages: action.images };
    case CLEAR_FILTERED_IMAGES:
      return { ...state, filteredImages: [] };
    case SELECT_IMAGE:
      return {
        ...state,
        selectedImages: [...state.selectedImages, action.image],
      };
    case DESELECT_IMAGE:
      return {
        ...state,
        selectedImages: state.selectedImages.filter(
          selectedImage => selectedImage.id !== action.image.id
        ),
      };
    case SWAP_SELECT:
      return {
        ...state,
        select: !state.select,
      };
    case DELETE_ALL_SELECTED_IMAGES:
      return {
        ...state,
        allImages: state.allImages.filter(image => {
          return (
            state.selectedImages.filter(
              selectedImage => image.id === selectedImage.id
            ).length === 0
          );
        }),
        selectedImages: [],
      };
    default:
      return state;
  }
};

export default images;
