import React from 'react';
import { connect } from 'react-redux';
import { flipSelect } from '../redux/images';

const SelectMode = props => {
  const { selectMode, selectedImages, swapSelectMode } = props;

  const selectedImagesLength = selectedImages.length
    ? 'col s4 l4 center-align scale-transition scale-in'
    : 'col s4 l4 scale-transition scale-out';

  if (selectMode) {
    return (
      <div id="select-mode">
        <div>
          <div className="row s12 l12">
            <div className="col s9 l9 ">
              <div className={selectedImagesLength}>
                <button
                  type="button"
                  className="waves-effect waves-light btn btn-small "
                >
                  Add to Album
                  <i className="material-icons left">book</i>
                </button>
              </div>
              <div className={selectedImagesLength}>
                <button
                  type="button"
                  className="waves-effect waves-light btn btn-small scale-transition"
                >
                  Tag Images
                  <i className="material-icons left">label</i>
                </button>
              </div>
              <div className={selectedImagesLength}>
                <button
                  type="button"
                  className="waves-effect waves-light btn-small red scale-transition"
                >
                  Delete Images
                  <i className="material-icons left">delete</i>
                </button>
              </div>
            </div>
            <div className="col s3  l3 right-align">
              <button
                type="button"
                className="waves-effect waves-teal btn-flat"
                onClick={() => swapSelectMode()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div id="select-mode" className="row">
        <div className="col s2 offset-s8 l1 offset-l11">
          <button
            type="button"
            className="waves-effect waves-teal btn-flat"
            onClick={() => swapSelectMode()}
          >
            Select
          </button>
        </div>
      </div>
    );
};

const mapState = state => ({
  selectedImages: state.images.selectedImages,
  selectMode: state.images.selectMode,
});

const mapDispatch = dispatch => ({
  swapSelectMode: () => dispatch(flipSelect()),
});

export default connect(
  mapState,
  mapDispatch
)(SelectMode);
