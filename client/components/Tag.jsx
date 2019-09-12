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

      <div className="row">
        <div className="col s10 m3">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Add Tags</span>

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
 \
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tag);
