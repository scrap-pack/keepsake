import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tag from './Tag.jsx';
import { addSelectedImage, removeSelectedImage } from '../redux/images';

const SingleImage = props => {
  const { image, selectedImages } = props;
  return (
    <div>
      <div>
        <img
          src={image.imageUrl}
          onClick={event => {
            event.preventDefault();
            if (image in selectedImages) {
              this.props.deselectImage(image);
            } else {
              this.props.selectImage(image);
            }
          }}
        />
      </div>
      <Tag />
      <button
        onClick={event => {
          event.preventDefault();
          this.props.back();
        }}
      >
        BACK
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    back: () => <Redirect to="/Home" />,
    selectImage: image => dispatch(addSelectedImage(image)),
    deselectImage: image => dispatch(removeSelectedImage(image)),
  };
};

const mapStateToProps = state => {
  return {
    image: state.images.singleImage,
    selectedImages: state.images.selectedImages,
  };
};

SingleImage.propTypes = {
  image: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    dateTaken: PropTypes.number,
    fileName: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleImage);
