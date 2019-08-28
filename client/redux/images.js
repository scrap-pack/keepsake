import axios from 'axios';

const GET_IMAGES = 'GET_IMAGES';
const GET_SINGLE_IMAGE = 'GET_SINGLE_IMAGE';
const UPLOAD_IMAGES = 'UPLOAD_IMAGES';
const SELECT_IMAGE = 'SELECT_IMAGE';
const DESELECT_IMAGE = 'DESELECT_IMAGE';

const getImages = images => ({ type: GET_IMAGES, images });
const getSingleImage = image => ({ type: GET_SINGLE_IMAGE, image });
const uploadImages = () => ({ type: UPLOAD_IMAGES });
export const addSelectedImage = image => ({ type: SELECT_IMAGE, image });
export const removeSelectedImage = image => ({ type: DESELECT_IMAGE, image });

const imageState = {
  allImages: [],
  singleImage: {},
  selectedImages: [],
};

const images = (state = imageState, action) => {
  switch (action.type) {
    case GET_IMAGES:
      return { ...state, allImages: [...state.allImages, ...action.images] };
    case GET_SINGLE_IMAGE:
      return { ...state, singleImage: action.image };
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
    default:
      return state;
  }
};

export const fetchImages = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/images');
    dispatch(getImages(data));
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

export const postImages = fileData => async dispatch => {
  try {
    const { data } = await axios.post('/api/images', fileData);
    console.log('SUCCESSS POSTING IMAGE!!!', data);
    dispatch(uploadImages(data));
  } catch (e) {
    console.error(e);
  }
};

export default images;
