/* eslint-disable no-undef */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inviteUserToAlbum, clearAlbumToShare } from '../redux/albums';

class ShareAlbum extends React.Component {
  constructor(props) {
    super(props);
    const { album } = props;
    this.state = {
      phoneNumber: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ phoneNumber: event.target.value });
    console.log(this.props);
  }

  handleSubmit(event) {
    const { invite, clearAlbum, album } = this.props;
    const { phoneNumber } = this.state;
    invite({ phoneNumber, album });
    event.preventDefault();
    this.setState({
      phoneNumber: '',
    });
    clearAlbum();
    const toastHTML = '<span class="green-text text-accent-3">Invite Sent!</span>';
    M.toast({ html: toastHTML });
  }

  render() {
    const { phoneNumber } = this.state;
    return (
      <div id="share-album" className="modal">
        <div className="modal-content">
          <h4>Share Album</h4>
          <div className="row">
            <p>Enter a friend's number and they'll receive a text with an invite.</p>
          </div>
          <div className="input-field col s3">
            <i className="material-icons prefix">phone</i>
            <input
              id="icon_telephone"
              type="tel"
              value={phoneNumber}
              className="validate"
              onChange={this.handleChange}
            />
            <label htmlFor="icon_telephone">Mobile Number</label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={(e) => this.handleSubmit(e)}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  album: state.albums.albumToShare,
});

const mapDispatchToProps = dispatch => ({
  invite: (inviteDetails) => dispatch(inviteUserToAlbum(inviteDetails)),
  clearAlbum: () => dispatch(clearAlbumToShare()),
});

const propTypes = {
  invite: PropTypes.func.isRequired,
  album: PropTypes.object.isRequired,
  clearAlbum: PropTypes.func.isRequired,
};

ShareAlbum.propTypes = propTypes;

const ConnectedShareAlbum = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareAlbum);

export default ConnectedShareAlbum;
