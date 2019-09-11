import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LandingPage from './LandingPage.jsx';

const Home = props => {
  const { authenticated } = props.currentUser;

  if (!authenticated) return <LandingPage />;
  else return <Redirect to="/scrapbook" />;
};

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps)(Home);
