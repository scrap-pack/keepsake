import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTags, fetchSingleTag, postTags, storeTags } from '../redux/tags';

class Tag extends React.Component {
  componentDidMount() {
    const { getSelectedImages } = this.props;
    getSelectedImages();
  }

  render() {
    return (
      <div>
        <div>
          <form
            onSubmit={event => {
              event.preventDefault();
              this.props.uploadTags(this.props.currentTags);
            }}
          >
            <label>Add Tags seperated by commas</label>
            <input
              onChange={event => {
                event.preventDefault();
                this.props.addTags(e.target.value);
              }}
            ></input>{' '}
            <button type="onSubmit">Upload Tags</button>
          </form>
        </div>
        <Link to="/home">HOME</Link>
      </div>
    );
  }
}

Home.propTypes = {
  selectedImages: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      dateTaken: PropTypes.number,
      fileName: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ).isRequired,
};

const mapStateToProps = state => {
  return {
    selectedImages: state.images.selectedImages,
    currenttags: state.tags.currentTags,
    singletag: state.tags.singleTag,
  };
};

const mapDispatchToProps = dispatch => ({
  getSelectedImages: () => dispatch(fetchSelectedImages()),
  getTags: () => dispatch(fetchTags()),
  getTag: id => dispatch(fetchSingleTag(id)),
  uploadTags: currentTags => dispatch(postTags(currentTags)),
  addTags: tags => storeTags(tags, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tag);
