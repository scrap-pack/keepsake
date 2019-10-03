import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LandingPage from './LandingPage.jsx';
import { fetchAllAlbums } from '../redux/albums.js';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { user } = this.props.currentUser;
    const { fetchAllAlbums } = this.props;
    fetchAllAlbums(user);
  }

  render() {
    const { authenticated } = this.props.currentUser;

    if (!authenticated) return <LandingPage />;
    else return <Redirect to="/scrapbook" />;
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });

const mapDispatch = dispatch => ({
  fetchAllAlbums: user => dispatch(fetchAllAlbums(user)),
});

export default connect(
  mapStateToProps,
  mapDispatch
)(Home);
