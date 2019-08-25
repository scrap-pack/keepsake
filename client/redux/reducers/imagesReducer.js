import { GET_IMAGES } from '../actionCreators/imagesCreator.js';

const initState = {
  images: [],
};

// Reducer

const imagesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_IMAGES: {
      const { images } = action;

      return {
        ...state,
        images,
      };
    }
    default: {
      return state;
    }
  }
};

export default imagesReducer;
