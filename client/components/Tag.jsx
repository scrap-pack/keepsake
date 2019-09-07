import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchTags,
  fetchSingleTag,
  postTags,
  addEnteredTags,
  parseTags,
  // clearTags,
  // clearString,
} from '../redux/tags';

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
              this.props.uploadTags(
                this.props.currentTags,
                this.props.selectedImages
              );
            }}
          >
            <label>Add Tags seperated by commas</label>
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
};

const mapStateToProps = state => {
  return {
    selectedImages: state.images.selectedImages,
    currentTags: state.tags.currentTags,
    singleTag: state.tags.singleTag,
    select: state.images.select,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTags: () => dispatch(fetchTags()),
    getTag: id => dispatch(fetchSingleTag(id)),
    uploadTags: (currentTags, selectedImages) => {
      dispatch(parseTags());
      dispatch(postTags(currentTags, selectedImages));
    },
    addTags: tags => {
      dispatch(addEnteredTags(tags));
    },
    convertTagStringToTags: () => {
      dispatch(parseTags());
    },
    // clearCurrentTags: () => {
    //   dispatch(clearTags());
    // },
    // clearTagString: () => {
    //   dispatch(clearString());
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tag);
