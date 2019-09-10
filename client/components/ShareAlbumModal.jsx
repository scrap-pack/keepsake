import React from 'react';
import PropTypes from 'prop-types';

class ShareAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ phone: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ phone: '' });
  }

  render() {
    const { phone } = this.state;
    return (
      <div id="share-album" className="modal">
        <div className="modal-content">
          <h4>Share Album</h4>
          <form>
            <div className="row">
              <p>Enter a friend's number and they'll receive a text with an invite.</p>
            </div>
            <div className="input-field col s3">
              <i className="material-icons prefix">phone</i>
              <input
                id="icon_telephone"
                type="tel"
                value={phone}
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

export default ShareAlbum;
