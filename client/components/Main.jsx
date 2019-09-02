import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import Upload from './Upload.jsx';
import ImageGallery from './ImageGallery.jsx';
import { fetchAllImages } from '../redux/images';
import Navbar from './Navbar.jsx';

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
        <Switch>
          <Route exact path="/" component={ImageGallery} />
          <Route exact path="/upload" component={Upload} />
        </Switch>
      </div>
    );
  }
}

Main.propTypes = propTypes;

const mapDispatchToProps = (dispatch) => ({
  getImages: () => dispatch(fetchAllImages()),
});

const connectedComponent = connect(
  null,
  mapDispatchToProps,
);

const connectedMain = connectedComponent(Main);

export default connectedMain;
