import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tag from './Tag.jsx';
import {
  deleteImageFromDB,
  deleteAllSelectedImages,
  getTagsForImage,
} from '../redux/images';

const SingleImage = props => {
  return (
    <div>
      <div>
        <img src={props.image.imageUrl} />
      </div>
      <Tag />
      <div>
        <button
          onClick={event => {
            event.preventDefault();
            props.deleteImage(props.image);
          }}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteImage: image => {
      dispatch(deleteImageFromDB(image));
    },
    getImageTags: image => {
      dispatch(getTagsForImage(image));
    },
  };
};

const mapStateToProps = state => {
  return {
    image: state.images.singleImage,
  };
};

SingleImage.propTypes = {
  image: PropTypes.shape({
    imageUrl: PropTypes.string,
    dateTaken: PropTypes.number,
    fileName: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  deleteImage: PropTypes.func.isRequired,
  getImageTags: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleImage);
