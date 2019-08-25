import axios from 'axios';

// Action type constants
export const GET_IMAGES = 'GET_IMAGES';

// Action creators
export const getImages = images => {
  return {
    type: GET_IMAGES,
    images,
  };
};

// Thunks
export const getImagesThunk = () => {
  return dispatch => {
    return axios
      .get('/api/images')
      .then(res => res.data)
      .then(images => {
        const userImages = images.filter(
          userImages =>
            userImages.userId === '2fa319bb-c1c8-40c5-b0dd-dd1335ffc4cd'
        );
        dispatch(getImages(userImages));
      });
  };
};
