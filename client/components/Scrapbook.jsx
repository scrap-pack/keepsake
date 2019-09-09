/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from './Search.jsx';
import AsyncImage from './AsyncImage.jsx';
import SelectWithOptions from './SelectWithOptions.jsx';

const Scrapbook = (props) => {
  const {
    allImages,
    filteredImages,
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
      <SelectWithOptions />
      <div className="row">
        {imagesToDisplay.map((image) => (
          <AsyncImage image={image} key={image.id} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allImages: state.images.allImages,
  filteredImages: state.images.filteredImages,
});

const propTypes = {
  allImages: PropTypes.array.isRequired,
  filteredImages: PropTypes.array.isRequired,
};

Scrapbook.propTypes = propTypes;

const ConnectedScrapbook = connect(
  mapStateToProps,
  null,
)(Scrapbook);

export default ConnectedScrapbook;
