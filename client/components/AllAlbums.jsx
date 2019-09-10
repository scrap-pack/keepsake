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
    <div className="row">
      <div className="col">
        <h4>Albums</h4>
      </div>
      <div className="col">
        {allAlbums.map((album) => (
          <AsyncAlbum album={album} key={album.id} />
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
