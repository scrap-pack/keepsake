import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSelectedImages } from '../redux/tags';

class Tag extends React.Component {
  componentDidMount() {
    const { getSelectedImages } = this.props;
    getSelectedImages();
  }

  render() {
    return (
      <div>
        <form>
          >Add tags field with submit button
          <label>l</label>
          <input>i</input>
        </form>
        back to home page button
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
  return { selectedImages: state.images.selectedImages };
};

const mapDispatchToProps = dispatch => ({
  getSelectedImages: () => dispatch(fetchSelectedImages()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tag);
