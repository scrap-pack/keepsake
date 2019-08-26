import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from './Home.jsx';
import { fetchImages } from '../redux/images.js';
import Navbar from './Header/Navbar.js';

const propTypes = {
  getImages: PropTypes.func.isRequired,
};

class Main extends Component {
  componentDidMount() {
    const { getImages } = this.props;
    getImages();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Home />
      </div>
    );
  }
}

Main.propTypes = propTypes;

const mapDispatchToProps = dispatch => ({
  getImages: () => dispatch(fetchImages()),
});

const connectedComponent = connect(
  null,
  mapDispatchToProps
);

const connectedMain = connectedComponent(Main);

export default connectedMain;
