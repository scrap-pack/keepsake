import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = props => {
  return (
    <div>
      <div> Welcome! </div>
      <Link to="/scrapbook" />
      <Link to="/upload" />
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
