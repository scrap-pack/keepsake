import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSelectedImage } from '../redux/images';

const Home = ({ images }) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {images.map(elem => {
          return (
            <div key={elem.id}>
              <img
                src={elem.imageUrl}
                alt=""
                onClick={event => {
                  event.preventDefault();
                  this.props.selectImage(elem);
                }}
                //add ability to deselect images
              />
            </div>
          );
        })}
      </div>
      <Link to="/upload">
        <div
          style={{
            borderRadius: '50%',
            width: '200px',
            height: '200px',
            background: 'orange',
            border: '5px solid blue',
            textAlign: 'center',
            verticalAlign: 'middle',
            size: '100px',
          }}
        >
          Upload
        </div>
      </Link>
    </div>
  );
};

Home.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      dateTaken: PropTypes.number,
      fileName: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ).isRequired,
};

const mapStateToProps = state => {
  return {
    images: state.images.allImages,
    currentImages: state.images.selectedImages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectImage: image => {
      addSelectedImage(image);
    },
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
);

const connectedImagesComponent = connectedComponent(Home);

export default connectedImagesComponent;
