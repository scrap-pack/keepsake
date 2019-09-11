/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AsyncImage from './AsyncImage.jsx';
import {
  getSingleAlbum,
} from '../redux/albums';

class AsyncAlbum extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      album,
      getAlbum,
      history,
    } = this.props;
    const { images } = album;

    return (
      <div>
        {album.id
          ? (
            <div className="card" key={album.id}>
              <div
                className="image-column"
                onClick={() => {
                  getAlbum(album);
                  history.push(`/albums/${album.id}`);
                }}
              >
                <AsyncImage image={images[0]} />
                <AsyncImage image={images[1]} />
                <AsyncImage image={images[2]} />
                <AsyncImage image={images[3]} />
              </div>
              <div className="card-content">
                <div>
                  <p>
                    {album.name}
                    <span>
                      <a
                        data-target="share-album"
                        style={{ float: 'right' }}
                        className="btn-floating btn-small waves-effect waves-light teal modal-trigger"
                      >
                        <i className="material-icons">share</i>
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )
          : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAlbum: (album) => dispatch(getSingleAlbum(album)),
});

const propTypes = {
  getAlbum: PropTypes.func.isRequired,
  album: PropTypes.object.isRequired,
  history: PropTypes.object,
};

AsyncAlbum.propTypes = propTypes;

const ConnectedAsyncAlbum = connect(
  null,
  mapDispatchToProps,
)(AsyncAlbum);

export default withRouter(ConnectedAsyncAlbum);
