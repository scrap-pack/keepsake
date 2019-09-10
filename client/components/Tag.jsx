import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchTags,
  fetchSingleTag,
  postTags,
  addEnteredTags,
  parseTags,
} from '../redux/tags';
import { getTagsForImage } from '../redux/images';

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.parse = this.parse.bind(this);
  }

  parse(event) {
    event.preventDefault();
    this.props.convertTagStringToTags(event.target.value);
  }

  render() {
    return (
      <div>
        <div>
          <form
            onSubmit={event => {
              event.preventDefault();
              this.parse(event);
              if (this.props.selectedImages.length > 0) {
                this.props.uploadTags(
                  this.props.currentTags,
                  this.props.selectedImages
                );
              } else {
                this.props.uploadTags(this.props.currentTags, [
                  this.props.singleImage,
                ]);
                setTimeout(() => {
                  this.props.addNewTags(this.props.singleImage);
                }, 10 * this.props.tagString.length + (75 - this.props.tagString.length));
              }
            }}
          >
            <input
              onChange={event => {
                event.preventDefault();
                this.props.addTags(event.target.value);
              }}
              onMouseLeave={this.parse}
              onTouchEnd={this.parse}
              onTouchMove={this.parse}
              onTouchEnd={this.parse}
            ></input>
            <label>
              Enter Tag(s). Seperate multiple tags with spaces or commas.
            </label>
            <button type="onSubmit">Upload Tags</button>
          </form>
        </div>
      </div>
    );
  }
}

Tag.propTypes = {
  selectedImages: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      dateTaken: PropTypes.number,
      fileName: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ),
  currentTags: PropTypes.arrayOf(PropTypes.string),
  singleTag: PropTypes.shape({
    imageUrl: PropTypes.string,
    dateTaken: PropTypes.number,
    fileName: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  selectMode: PropTypes.bool.isRequired,
  singleImage: PropTypes.shape({
    imageUrl: PropTypes.string,
    dateTaken: PropTypes.number,
    fileName: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  tagString: PropTypes.string,
  getTags: PropTypes.func.isRequired,
  getTag: PropTypes.func.isRequired,
  uploadTags: PropTypes.func.isRequired,
  addTags: PropTypes.func.isRequired,
  convertTagStringToTags: PropTypes.func.isRequired,
  addNewTags: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    selectedImages: state.images.selectedImages,
    currentTags: state.tags.currentTags,
    singleTag: state.tags.singleTag,
    selectMode: state.images.selectMode,
    singleImage: state.images.singleImage,
    tagString: state.tags.tagString,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTags: () => dispatch(fetchTags()),
    getTag: id => dispatch(fetchSingleTag(id)),
    uploadTags: (currentTags, selectedImages) => {
      dispatch(postTags(currentTags, selectedImages));
    },
    addTags: tags => {
      dispatch(addEnteredTags(tags));
    },
    convertTagStringToTags: () => {
      dispatch(parseTags());
    },
    addNewTags: image => {
      dispatch(getTagsForImage(image));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tag);
