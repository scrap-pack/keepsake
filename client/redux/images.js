import axios from 'axios';

const GET_IMAGES = 'GET_IMAGES';
const GET_SINGLE_IMAGE = 'GET_SINGLE_IMAGE';

const getImages = images => ({ type: GET_IMAGES, images });
const getSingleImage = image => ({ type: GET_SINGLE_IMAGE, image });

const imageState = {
  allImages: [],
  singleImage: {}
};

const images = (state = imageState, action) => {
  switch (action.type) {
    case GET_IMAGES:
      return { ...state, allImages: [...state.allImages, ...action.images] };
    case GET_SINGLE_IMAGE:
      return { ...state, singleImage: action.image };
    default:
      return state;
  }
};

export const fetchImages = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/images');
    dispatch(getImages(data));
  } catch (e) {
    console.error(e);
  }
};

export const fetchSingleImage = id => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/images/${id}`);
    dispatch(getSingleImage(data));
  } catch (e) {
    console.error(e);
  }
};

export default images;
