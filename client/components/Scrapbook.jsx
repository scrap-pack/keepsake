import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllImages } from '../redux/images';
import Search from './Search.jsx';

const Scrapbook = (props) => {
  const { allImages, filteredImages } = props;
  return (
    <div>
      <div className="row">
        <Search />
      </div>
      <div className="row" display="block">
        {filteredImages.length ? filteredImages.map((image) => (
          <div className="col s12 m6 xl3">
            <div className="card" key={image.id}>
              <div className="card-image">
                <img className="responsive-img" src={image.imageUrl} alt="" />
              </div>
            </div>
          </div>
        )) : allImages.map((image) => (
          <div className="col s12 m6 xl3">
            <div className="card" key={image.id}>
              <div className="card-image">
                <img className="responsive-img" src={image.imageUrl} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allImages: state.images.allImages,
  filteredImages: state.images.filteredImages,
});

const mapDispatchToProps = (dispatch) => ({
  getAllImages: () => dispatch(fetchAllImages()),
});

const propTypes = {
  getAllImages: PropTypes.func.isRequired,
  allImages: PropTypes.array.isRequired,
  filteredImages: PropTypes.array.isRequired,
};

Scrapbook.propTypes = propTypes;

const ConnectedScrapbook = connect(mapStateToProps, mapDispatchToProps)(Scrapbook);

export default ConnectedScrapbook;
