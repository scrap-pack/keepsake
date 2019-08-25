import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = props => {
  const { images } = props.images;

  return (
    <div>
      {images.map(elem => {
        return (
          <div key={elem.id}>
            <img src={elem.imageUrl} alt="" />
          </div>
        );
      })}
      <Link to="/upload">
        <div
          style={{
            borderRadius: '50%',
            width: '200px',
            background: 'orange',
            border: '5px solid blue',
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

const mapStateToProps = ({ images }) => ({ images });

const connectedComponent = connect(mapStateToProps);

const connectedImagesComponent = connectedComponent(Home);

export default connectedImagesComponent;
