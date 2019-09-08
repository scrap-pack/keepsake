import React from 'react';
import { Link } from 'react-router-dom';
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
import LandingPage from './LandingPage.jsx';

const Home = props => {
  const {
    images,
    select,
    swapSelect,
    selectImage,
    deselectImage,
    addToSingleImage,
    currentImages,
    authenticated,
  } = props;

  if (!authenticated) return <LandingPage />;
  // select button to changes between single image veiw and select images
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div>
        <div> Welcome! </div>
        <Link to="/scrapbook" />
        <Link to="/upload" />,
      </div>

      <h1
        onClick={event => {
          event.preventDefault();
          swapSelect();
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
                  if (select) {
                    if (
                      currentImages.filter(
                        currentImage => currentImage.id === image.id
                      ).length > 0
                    ) {
                      deselectImage(image);
                    } else {
                      selectImage(image);
                      //add jsx to show image is selected
                    }
                  } else {
                    addToSingleImage(image);
                    <Link to="/SingleImage" component={SingleImage} />;
                    //fix this
                  }
                }}
              />
            </div>
          );
        })}
      </div>

      <Link to="/upload">
        <div className="btn orange darken-2">Upload</div>
      </Link>
      <Tag />
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
    authenticated: state.currentUser.authenticated,
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
    addToSingleImage: image => {
      dispatch(getSingleImage(image));
    },
    swapSelect: () => {
      dispatch(flipSelect());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
