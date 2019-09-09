import React from 'react';
import PropTypes from 'prop-types';

class AddToAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'createNew',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ selectedOption: event.target.value });
    console.log('handleChange ran');
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div id="add-to-album" className="modal">
        <div className="modal-content">
          <h4>Add to Album</h4>
          <form>
            <div>
              <label>
                <input
                  name="albumOptions"
                  className="with-gap"
                  value="createNew"
                  type="radio"
                  checked={selectedOption === 'createNew'}
                  onChange={this.handleChange}
                />
                <span>Create new album</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  name="albumOptions"
                  className="with-gap"
                  value="addToExisting"
                  type="radio"
                  checked={selectedOption === 'addToExisting'}
                  onChange={this.handleChange}
                />
                <span>Add to existing album</span>
              </label>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="modal-close waves-effect waves-green btn-flat">Save</button>
        </div>
      </div>
    );
  }
}

export default AddToAlbum;
