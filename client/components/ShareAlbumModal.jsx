import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inviteToAlbum } from '../redux/albums';

class ShareAlbum extends React.Component {
  constructor(props) {
    super(props);
    const { album } = props;
    this.state = {
      phoneNumber: '',
      album,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ phoneNumber: event.target.value });
  }

  handleSubmit(event) {
    const { invite } = this.props;
    event.preventDefault();
    this.setState({
      phoneNumber: '',
      album: {},
    });
    invite(this.state);
  }

  render() {
    const { phoneNumber } = this.state;
    return (
      <div id="share-album" className="modal">
        <div className="modal-content">
          <h4>Share Album</h4>
          <form onSubmit={this.handleSubmit}>
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
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="modal-close waves-effect waves-green btn-flat">Share</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  invite: (inviteDetails) => dispatch(inviteToAlbum(inviteDetails)),
});

const ConnectedShareAlbum = connect(
  null,
  mapDispatchToProps,
)(ShareAlbum);

export default ConnectedShareAlbum;
