import React from 'react';
import { connect } from 'react-redux';
import Home from './Home';

import { getImagesThunk } from '../redux/actionCreators/imagesCreator.js';

const Main = props => {
  props.getImagesThunk();

  return <Home />;
};

const mapDispatch = dispatch => ({
  getImagesThunk: () => dispatch(getImagesThunk()),
});
export default connect(
  null,
  mapDispatch
)(Main);
