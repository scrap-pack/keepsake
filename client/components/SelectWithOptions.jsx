/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  flipSelect,
} from '../redux/images';

class SelectWithOptions extends React.Component {
  render() {
    const {
      selectedImages,
      swapSelectMode,
      selectMode,
    } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col s12">
            <button
              type="button"
              className="waves-effect waves-teal btn-flat"
              onClick={() => swapSelectMode()}
            >
              {selectMode ? 'Cancel' : 'Select'}
            </button>
          </div>
        </div>
        <div
          className={selectMode && selectedImages.length ? 'row' : 'row hide'}
        >
          <div className="col s12">
            <button
              type="button"
              data-target="add-to-album"
              className="waves-effect waves-light btn modal-trigger"
            >
              <i className="material-icons left">book</i>
              Add to Album
            </button>
            <button
              type="button"
              data-target="tag-images"
              className="waves-effect waves-light btn modal-trigger"
            >
              <i className="material-icons left">label</i>
            Tag
            </button>
            <button
              type="button"
              data-target="delete-images"
              className="waves-effect waves-light btn red modal-trigger"
            >
              <i className="material-icons left">delete</i>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  selectedImages: state.images.selectedImages,
  selectMode: state.images.selectMode,
});

const mapDispatchToProps = (dispatch) => ({
  swapSelectMode: () => dispatch(flipSelect()),
});

const propTypes = {
  selectedImages: PropTypes.array.isRequired,
  swapSelectMode: PropTypes.func.isRequired,
  selectMode: PropTypes.bool.isRequired,
};

SelectWithOptions.propTypes = propTypes;

const ConnectedSelectWithOptions = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectWithOptions);

export default ConnectedSelectWithOptions;
