/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncAlbum from './AsyncAlbum.jsx';
import { fetchAllAlbums } from '../redux/albums';

class AllAlbums extends React.Component {
  componentDidMount() {
    const { getAlbums, owner } = this.props;
    getAlbums(owner);
  }

  render() {
    const {
      allAlbums,
    } = this.props;

    return (
      <div>
        <div className="col offset-s2">
          <h4>My Albums</h4>
        </div>
        <div className="row">
          {allAlbums.map((album) => (
            <div key={album.id} className="col m4 l4">
              <AsyncAlbum album={album} key={album.id} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  allAlbums: state.albums.allAlbums,
  owner: state.currentUser.currentUser,
});

const mapDispatchToProps = dispatch => ({
  getAlbums: (owner) => dispatch(fetchAllAlbums(owner)),
});

const propTypes = {
  allAlbums: PropTypes.array.isRequired,
};

AllAlbums.propTypes = propTypes;

const ConnectedAllAlbums = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllAlbums);

export default ConnectedAllAlbums;
