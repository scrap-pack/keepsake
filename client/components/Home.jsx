import React from "react";
import { Link } from "react-router-dom";
import connect from "react-redux";
import PropTypes from "prop-types";

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
              <img src={elem.imageUrl} alt="" />
            </div>
          );
        })}
      </div>
      <Link to="/upload">
        <div
          style={{
<<<<<<< HEAD:client/components/Home.js
            borderRadius: '50%',
            width: '200px',
            height: '200px',
            background: 'orange',
            border: '5px solid blue',
            textAlign: 'center',
            verticalAlign: 'middle',
            size: '100px',
=======
            borderRadius: "50%",
            width: "200px",
            background: "orange",
            border: "5px solid blue"
>>>>>>> 48d2b8fbe8d75adfabdaf29750d3fc77757b111f:client/components/Home.jsx
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
      longitude: PropTypes.number
    })
  ).isRequired
};

const mapStateToProps = state => {
  return {
<<<<<<< HEAD:client/components/Home.js
    images: state.images.allImages,
=======
    images: state.imageStore.images
>>>>>>> 48d2b8fbe8d75adfabdaf29750d3fc77757b111f:client/components/Home.jsx
  };
};

const connectedComponent = connect(mapStateToProps);

const connectedImagesComponent = connectedComponent(Home);

export default connectedImagesComponent;
