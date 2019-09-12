import React from 'react';
import { Link } from 'react-router-dom';
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
//import Home from './Home.jsx';

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
      <div class="row">
        <div class="col s10 m3">
          <div class="card">
            <div class="card-content">
              <span class="card-title">Add Tags</span>
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
                <label>Seperate multiple tags with spaces or commas.</label>
                <button type="onSubmit">Upload Tags</button>
              </form>
            </div>
          </div>
        </div>
        <Link to="/">HOME</Link>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTags: () => dispatch(fetchTags()),
    getTag: id => dispatch(fetchSingleTag(id)),
    uploadTags: currentTags => dispatch(postTags(currentTags)),
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
