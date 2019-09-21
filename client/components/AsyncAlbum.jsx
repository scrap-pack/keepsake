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
import Image from 'react-image-resizer';
import { getSingleAlbum, selectAlbumToShare } from '../redux/albums';

class AsyncAlbum extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { album, getAlbum, history, selectAlbum } = this.props;
    const { images } = album;
    const style = {
      image: {
        background: '#ffffff',
      },
    };
    // Creates album card with default 4 slots
    const maxFourImages = images => {
      let newImages = [];
      for (let i = 0; i < 4; i++) {
        if (images[i]) {
          newImages.push(images[i]);
        } else {
          const nullImage = { id: i };
          newImages.push(nullImage);
        }
      }
      return newImages;
    };
    // All images from album gets passed in, if less than 4 images in album, placeholder will be used.
    const fourImages = maxFourImages(images);

    return (
      <div>
        {album.id ? (
          <div className="card" key={album.id}>
            <div
              onClick={() => {
                getAlbum(album);
                history.push(`/albums/${album.id}`);
              }}
            >
              <ul>
                {fourImages.map(image => {
                  return (
                    <Image
                      key={image.id}
                      style={{
                        display: 'inline-block',
                        image: style.image,
                      }}
                      width={200}
                      height={200}
                      src={image.imageUrl}
                      alt=""
                    />
                  );
                })}
              </ul>
            </div>
            <div className="card-content">
              <div>
                <p>
                  {album.name}
                  <span>
                    <a
                      onClick={() => selectAlbum(album)}
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
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAlbum: album => dispatch(getSingleAlbum(album)),
  selectAlbum: album => dispatch(selectAlbumToShare(album)),
});

const propTypes = {
  getAlbum: PropTypes.func.isRequired,
  album: PropTypes.object.isRequired,
  history: PropTypes.object,
  selectAlbum: PropTypes.func.isRequired,
};

AsyncAlbum.propTypes = propTypes;

const ConnectedAsyncAlbum = connect(
  null,
  mapDispatchToProps
)(AsyncAlbum);

export default withRouter(ConnectedAsyncAlbum);
