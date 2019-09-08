import React from 'react';
import { connect } from 'react-redux';

import LandingPage from './LandingPage.jsx';

const Home = props => {
  const { authenticated } = props.currentUser;

  if (!authenticated) return <LandingPage />;
  return <div> hello</div>;
};

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps)(Home);
