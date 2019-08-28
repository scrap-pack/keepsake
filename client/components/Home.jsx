import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSelectedImage, removeSelectedImage } from '../redux/images';

//select button to changes between single image veiw and select images

const Home = ({ images }) => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <h1
        onClick={() => {
          this.props.select = !this.props.select;
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
                  if (this.props.select) {
                    if (elem in this.props.currentImages) {
                      this.props.deselectImage(image);
                    } else {
                      this.props.selectImage(image);
                      //add jsx to show image is selected
                    }
                  } else {
                    <Redirect to="/singleImage" image={image} />;
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
    select: false,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectImage: image => {
      addSelectedImage(image);
    },
    deselectImage: image => {
      removeSelectedImage(image);
    },
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
);

const connectedImagesComponent = connectedComponent(Home);

export default connectedImagesComponent;
