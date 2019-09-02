// Npm libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';

// Redux store
import { fetchImages } from '../redux/images';

// React Components
import Home from './Home.jsx';
import Upload from './Upload.jsx';
import Scrapbook from './Scrapbook.jsx';
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
        <Switch>
          <Route exact path="/" component={ImageGallery} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/scrapbook" component={Scrapbook} />
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
