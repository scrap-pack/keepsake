/* eslint-disable no-undef */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postNewAlbum } from '../redux/albums';
import { flipSelect } from '../redux/images';

class AddToAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'createNew',
      newAlbumName: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ newAlbumName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { selectedOption, newAlbumName } = this.state;
    const { createAlbum, owner, selectedImages, swapSelectMode } = this.props;
    if (selectedOption === 'createNew') {
      if (!newAlbumName) newAlbumName = 'Untitled';
      createAlbum({ owner, newAlbumName, selectedImages });
    }
    this.setState({
      selectedOption: 'createNew',
      newAlbumName: '',
    });
    swapSelectMode();
    const toastHTML =
      '<span class="green-text text-accent-3">Saved Album!</span>';
    M.toast({ html: toastHTML });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div id="add-to-album" className="modal">
        <form action="#">
          <div className="modal-content">
            <h4>Add Images to Album</h4>
            <div>
              <label>
                <input
                  name="albumOptions"
                  className="with-gap"
                  value="createNew"
                  type="radio"
                  onChange={this.handleChange}
                  checked
                />
                <span>Create new album</span>
              </label>
            </div>
            <div className={selectedOption === 'createNew' ? 'row' : 'hide'}>
              <div className="input-field">
                <input
                  id="album_name"
                  type="text"
                  value={this.state.newAlbumName}
                  className="validate"
                  onChange={this.handleChange}
                />
                <label htmlFor="album_name">Album Name</label>
              </div>
            </div>
            <div>
              <label>
                <input
                  name="albumOptions"
                  className="with-gap"
                  value="addToExisting"
                  type="radio"
                  onChange={this.handleChange}
                />
                <span>Add to existing album</span>
              </label>
            </div>
          </div>
        </form>

        <div className="modal-footer">
          <button
            type="button"
            className="modal-close waves-effect waves-green btn-flat"
            onClick={e => this.handleSubmit(e)}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.currentUser.currentUser,
  selectedImages: state.images.selectedImages,
});

const mapDispatchToProps = dispatch => ({
  createAlbum: albumDetails => dispatch(postNewAlbum(albumDetails)),
  swapSelectMode: () => dispatch(flipSelect()),
});

const propTypes = {
  createAlbum: PropTypes.func.isRequired,
  owner: PropTypes.object.isRequired,
  selectedImages: PropTypes.array.isRequired,
  swapSelectMode: PropTypes.func.isRequired,
};

AddToAlbum.propTypes = propTypes;

const ConnectedAddToAlbum = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToAlbum);

export default ConnectedAddToAlbum;
