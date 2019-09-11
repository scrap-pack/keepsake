/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Search from './Search.jsx';

import AsyncImage from './AsyncImage.jsx';
import SelectMode from './SelectMode.jsx';
import {
  addSelectedImage,
  removeSelectedImage,
  getSingleImage,
} from '../redux/images';

const Scrapbook = props => {
  const {
    allImages,
    filteredImages,
    selectedImages,
    selectMode,
    selectImage,
    deselectImage,
    getImage,
    authenticated,
  } = props;

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  let imagesToDisplay = [];
  if (filteredImages.length) {
    imagesToDisplay = filteredImages;
  } else {
    imagesToDisplay = allImages;
  }
  return (
    <div>
      <div className="row">
        <Search />
      </div>
      <SelectMode />
      <div className="row">
        {imagesToDisplay.map(image => (
          <div key={image.id} className="col s12 m6 xl3">
            <div
              className="card"
              onClick={() => {
                if (selectMode && selectedImages.includes(image))
                  deselectImage(image);
                else if (selectMode && !selectedImages.includes(image))
                  selectImage(image);
                //else if (selectMode && !selectedImages.includes(image.id))
                else if (!selectMode) {
                  getImage(image);
                  props.history.push(`/images/${image.id}`);
                }
              }}
            >
              <div className="image-container">
                <AsyncImage image={image} />
                <div
                  className={
                    selectMode && selectedImages.includes(image) ? '' : 'hide'
                  }
                >
                  <div className="selected-image-overlay" />
                  <i className="material-icons selected-image-overlay-icon small">
                    check
                  </i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  allImages: state.images.allImages,
  filteredImages: state.images.filteredImages,
  selectedImages: state.images.selectedImages,
  selectMode: state.images.selectMode,
  authenticated: state.currentUser.authenticated,
});

const mapDispatchToProps = dispatch => ({
  selectImage: image => dispatch(addSelectedImage(image)),
  deselectImage: image => dispatch(removeSelectedImage(image)),
  getImage: image => dispatch(getSingleImage(image)),
});

const propTypes = {
  getImage: PropTypes.func.isRequired,
  allImages: PropTypes.array.isRequired,
  filteredImages: PropTypes.array.isRequired,
  selectedImages: PropTypes.array.isRequired,
  selectImage: PropTypes.func.isRequired,
  deselectImage: PropTypes.func.isRequired,
  swapSelectMode: PropTypes.func.isRequired,
};

Scrapbook.propTypes = propTypes;

const ConnectedScrapbook = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scrapbook);

export default ConnectedScrapbook;
