import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = props => {
  const { images } = props.images;

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
              <img src={elem.imageUrl} alt="" />
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
  };
};

const connectedComponent = connect(mapStateToProps);

const connectedImagesComponent = connectedComponent(Home);

export default connectedImagesComponent;
