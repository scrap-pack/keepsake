/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncImage from './AsyncImage.jsx';

const SingleAlbum = (props) => {
  const {
    singleAlbum,
  } = props;

  return (
    <div className="row">
      <div className="col s12">
        <h4>{singleAlbum.name}</h4>
      </div>
      <div className="row">
        {singleAlbum
          ? (
            <div className="row">
              {singleAlbum.images
                .map((image) => (
                  <AsyncImage image={image} key={image.id} />
                ))}
            </div>
          ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  singleAlbum: state.albums.singleAlbum,
});

const propTypes = {
  singleAlbum: PropTypes.object.isRequired,
};

SingleAlbum.propTypes = propTypes;

const ConnectedSingleAlbum = connect(
  mapStateToProps,
  null,
)(SingleAlbum);

export default ConnectedSingleAlbum;
