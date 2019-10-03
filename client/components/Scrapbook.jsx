/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Search from './Search.jsx';
import AsyncImage from './AsyncImage.jsx';
import SelectWithOptions from './SelectWithOptions.jsx';

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
      <div className="row">
        <SelectWithOptions />
      </div>
      <div className="row">
        {imagesToDisplay.map((image) => (
          <AsyncImage image={image} key={image.id} />
      // <div className="row">
      //   {imagesToDisplay.map(image => (
      //     <div key={image.id} className="col s12 m6 xl3">
      //       <div
      //         className="card"
      //         onClick={() => {
      //           if (selectMode && selectedImages.includes(image))
      //             deselectImage(image);

      //           else if (selectMode && !selectedImages.includes(image))
      //             //else if (selectMode && !selectedImages.includes(image.id))

      //             selectImage(image);
      //           else if (!selectMode) {
      //             getImage(image);
      //             props.history.push(`/images/${image.id}`);
      //           }
      //         }}
      //       >
      //         <div className="image-container">
      //           <AsyncImage image={image} />
      //           <div
      //             className={
      //               selectMode && selectedImages.includes(image) ? '' : 'hide'
      //             }
      //           >
      //             <div className="selected-image-overlay" />
      //             <i className="material-icons selected-image-overlay-icon small">
      //               check
      //             </i>
      //           </div>
      //         </div>
      //       </div>
          // </div>
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
  swapSelectMode: () => dispatch(flipSelect()),
});

const propTypes = {
  allImages: PropTypes.array.isRequired,
  filteredImages: PropTypes.array.isRequired,
};

Scrapbook.propTypes = propTypes;

const ConnectedScrapbook = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scrapbook);

export default ConnectedScrapbook;
