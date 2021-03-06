// Npm libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';

// Redux store
import { fetchAllImages } from '../redux/images';
import { fetchAllAlbums } from '../redux/albums';

// React Components
import Upload from './Upload.jsx';
import SingleImage from './SingleImage.jsx';
import Scrapbook from './Scrapbook.jsx';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import FloatingUploadButton from './FUB.jsx';
import AddToAlbumModal from './AddToAlbumModal.jsx';
import TagImagesModal from './TagImagesModal.jsx';
import DeleteImagesModal from './DeleteImagesModal.jsx';
import AllAlbums from './AllAlbums.jsx';
import SingleAlbum from './SingleAlbum.jsx';
import ShareAlbumModal from './ShareAlbumModal.jsx';

const propTypes = {
  getImages: PropTypes.func.isRequired,
};

class Main extends Component {
  componentDidMount() {
    const { getImages } = this.props;
    getImages();
    $(document).ready(function() {
      $('.fixed-action-btn').floatingActionButton({ hoverEnabled: false });
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <AddToAlbumModal />
        <DeleteImagesModal />
        <TagImagesModal />
        <ShareAlbumModal />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/scrapbook" component={Scrapbook} />
          <Route exact path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/images/:id" component={SingleImage} />
          <Route exact path="/albums" component={AllAlbums} />
          <Route exact path="/albums/:id" component={SingleAlbum} />
        </Switch>
        <FloatingUploadButton />
      </div>
    );
  }
}

Main.propTypes = propTypes;

const mapDispatchToProps = dispatch => ({
  getImages: () => dispatch(fetchAllImages()),
});

const connectedComponent = connect(
  null,
  mapDispatchToProps,
);

const connectedMain = connectedComponent(Main);

export default connectedMain;
