import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutThunk, changeLoginStatus } from '../redux/users';

const Navbar = props => {
  const { logout } = props;
  const { authenticated } = props.currentUser;

  const amIAuthenticated = authenticated ? (
    <div>
      <li key="my-images">
        <Link to="/scrapbook">My Images</Link>
      </li>
      <li key="logout">
        <Link to="/login" onClick={logout}>
          Logout
        </Link>
      </li>
    </div>
  ) : (
    <div>
      <li key="signup">
        <Link to="/signup">Sign Up</Link>
      </li>
      <li key="login">
        <Link to="/login">Login</Link>
      </li>
    </div>
  );

  return (
    <nav className="teal darken-2" role="navigation">
      <div className="nav-wrapper container">
        <a id="logo-container" href="/" className="brand-logo">
          <div id="logo" style={{ fontFamily: 'Chalkduster, fantasy' }}>
            KeepSake
          </div>
        </a>
        <ul className="right hide-on-med-and-down">{amIAuthenticated}</ul>
        <ul id="nav-mobile" className="sidenav">
          <li>
            <a href="/">Navbar Link</a>
          </li>
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    </nav>
  );
};

const mapState = ({ currentUser }) => ({ currentUser });
const mapDispatch = dispatch => ({
  logout: () => {
    dispatch(changeLoginStatus(false));
    dispatch(logoutThunk());
  },
});

export default connect(
  mapState,
  mapDispatch
)(Navbar);
