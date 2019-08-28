import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSelectedImage } from '../redux/images';

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
        {images.map(elem => {
          return (
            <div key={elem.id}>
              <img
                src={elem.imageUrl}
                alt=""
                onClick={event => {
                  event.preventDefault();
                  if (this.props.select) {
                    this.props.selectImage(elem);
                  } else {
                    <Redirect to="/singleImage" />;
                  }
                }}
                //add ability to deselect images
                //add jsx to show image is selected
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
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
);

const connectedImagesComponent = connectedComponent(Home);

export default connectedImagesComponent;
