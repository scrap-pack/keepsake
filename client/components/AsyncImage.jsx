/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addSelectedImage,
  removeSelectedImage,
  getSingleImage,
} from '../redux/images';

class AsyncImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  onImageLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    const {
      image,
      selectedImages,
      selectMode,
      selectImage,
      deselectImage,
      getImage,
      history,
    } = this.props;
    const { loaded } = this.state;
    return (
      <div>
        {image.id
          ? (
            <div key={image.id} className="col s12 m6 xl3">
              <div
                className="card"
                onClick={() => {
                  if (selectMode && selectedImages.includes(image)) deselectImage(image);
                  else if (selectMode && !selectedImages.includes(image.id)) selectImage(image);
                  else if (!selectMode) {
                    getImage(image);
                    history.push(`/images/${image.id}`);
                  }
                }}
              >
                <div className="image-container">
                  <div className="card-image">
                    <img
                      className={loaded ? 'responsive-img image' : 'responsive-img image image-loading-placeholder'}
                      src={loaded ? image.imageUrl : '/placeholder.png'}
                      onLoad={this.onImageLoad}
                      alt=""
                    />
                  </div>
                  <div
                    className={selectMode && selectedImages.includes(image) ? '' : 'hide'}
                  >
                    <div className="selected-image-overlay" />
                    <i className="material-icons selected-image-overlay-icon small">check</i>
                  </div>
                </div>
              </div>
            </div>
          )
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedImages: state.images.selectedImages,
  selectMode: state.images.selectMode,
});

const mapDispatchToProps = (dispatch) => ({
  selectImage: (image) => dispatch(addSelectedImage(image)),
  deselectImage: (image) => dispatch(removeSelectedImage(image)),
  getImage: (image) => dispatch(getSingleImage(image)),
});

const propTypes = {
  selectedImages: PropTypes.array.isRequired,
  selectImage: PropTypes.func.isRequired,
  deselectImage: PropTypes.func.isRequired,
  getImage: PropTypes.func.isRequired,
  selectMode: PropTypes.bool.isRequired,
  image: PropTypes.object.isRequired,
  history: PropTypes.object,
};

AsyncImage.propTypes = propTypes;

const ConnectedAsyncImage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AsyncImage);

export default ConnectedAsyncImage;
