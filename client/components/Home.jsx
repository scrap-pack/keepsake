import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addSelectedImage,
  removeSelectedImage,
  getSingleImage,
  flipSelect,
} from '../redux/images';
import Tag from './Tag.jsx';
import SingleImage from './SingleImage.jsx';

const Home = props => {
  const { images } = props;
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <h1
        onClick={event => {
          event.preventDefault();
          props.swapSelect();
        }}
      >
        SELECT
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {images.map(image => {
          return (
            <div key={image.id}>
              <img
                src={image.imageUrl}
                alt=""
                onClick={event => {
                  event.preventDefault();
                  if (props.select) {
                    if (
                      props.currentImages.filter(
                        currentImage => currentImage.id === image.id
                      ).length > 0
                    ) {
                      props.deselectImage(image);
                    } else {
                      props.selectImage(image);
                      //add jsx to show image is selected
                    }
                  } else {
                    props.addToSingleImage(image);
                    <Redirect to="/SingleImage" component={SingleImage} />;
                    //fix this
                  }
                }}
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
    select: state.images.select,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectImage: image => {
      dispatch(addSelectedImage(image));
    },
    deselectImage: image => {
      dispatch(removeSelectedImage(image));
    },
    addToSingleImage: image => dispatch(getSingleImage(image)),
    swapSelect: () => dispatch(flipSelect()),
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
);

const connectedImagesComponent = connectedComponent(Home);

export default connectedImagesComponent;
