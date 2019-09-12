/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncAlbum from './AsyncAlbum.jsx';

const AllAlbums = (props) => {
  const {
    allAlbums,
  } = props;

  return (
    <div>
      <div className="row">
        <h4>Albums</h4>
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
};

const mapStateToProps = (state) => ({
  allAlbums: state.albums.allAlbums,
});

const propTypes = {
  allAlbums: PropTypes.array.isRequired,
};

AllAlbums.propTypes = propTypes;

const ConnectedAllAlbums = connect(
  mapStateToProps,
  null,
)(AllAlbums);

export default ConnectedAllAlbums;
