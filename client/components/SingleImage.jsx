import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tag from './Tag.jsx';
import {
  deleteImageFromDB,
  getTagsForImage,
  fetchSingleImage,
} from '../redux/images';

class SingleImage extends React.Component {
  componentDidMount() {
    this.props.getImageTags(this.props.image);
  }

  render() {
    if (!this.props.authenticated) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <div>
          <img
            src={props.image.imageUrl}
            onClick={event => {
              event.preventDefault();
              // if (image in selectedImages) {
              //   props.deselectImage(image);
              // } else {
              //   props.selectImage(image);
              // }
            }}
          />
        </div>
        <Tag />
        <div>
          <div>
            <img src={this.props.image.imageUrl} />

            <ul>
              {this.props.imageTags.map((tag, idx) => (
                <li key={idx}>{tag.toUpperCase()}</li>
              ))}
            </ul>
          </div>
          <div>
            <button
              onClick={event => {
                event.preventDefault();
                this.props.deleteImage(this.props.image);
              }}
            >
              DELETE IMAGE
            </button>
          </div>{' '}
          <Tag />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteImage: image => {
      dispatch(deleteImageFromDB(image));
    },
    getImageTags: image => {
      dispatch(getTagsForImage(image));
    },
    addNewTags: image => {
      dispatch(fetchSingleImage(image.id));
    },
  };
};

const mapStateToProps = state => {
  return {
    image: state.images.singleImage,
    imageTags: state.images.imageTags,
    authenticated: state.currentUser.authenticated,
    // selectedImages: state.images.selectedImages,
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
  imageTags: PropTypes.arrayOf(PropTypes.string),
  deleteImage: PropTypes.func.isRequired,
  getImageTags: PropTypes.func.isRequired,
  addNewTags: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleImage);
