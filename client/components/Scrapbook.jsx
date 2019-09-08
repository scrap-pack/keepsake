/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Search from './Search.jsx';
import SingleImage from './SingleImage.jsx';
import Tag from './Tag.jsx';
import {
  addSelectedImage,
  removeSelectedImage,
  getSingleImage,
  flipSelect,
} from '../redux/images';

const Scrapbook = props => {
  const {
    allImages,
    filteredImages,
    selectedImages,
    swapSelectMode,
    selectMode,
    selectImage,
    deselectImage,
    getImage,
  } = props;

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

      <div className="row">
        <div className="col s1 offset-s11">
          <button
            type="button"
            className="waves-effect waves-teal btn-flat"
            onClick={() => swapSelectMode()}
          >
            {selectMode ? 'Cancel' : 'Select'}
          </button>
        </div>
      </div>
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
                else if (!selectMode) {
                  getImage(image);
                  props.history.push(`/images/${image.id}`);
                }
              }}
            >
              <div className="card-image">
                <img
                  className="responsive-img image"
                  src={image.imageUrl}
                  alt=""
                />
                <div
                  style={{
                    display:
                      selectMode && selectedImages.includes(image)
                        ? ''
                        : 'none',
                  }}
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
});

const mapDispatchToProps = dispatch => ({
  selectImage: image => dispatch(addSelectedImage(image)),
  deselectImage: image => dispatch(removeSelectedImage(image)),
  getImage: image => dispatch(getSingleImage(image)),
  swapSelectMode: () => dispatch(flipSelect()),
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
