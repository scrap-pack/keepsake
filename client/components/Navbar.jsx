import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutThunk, changeLoginStatus } from '../redux/users';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(document).ready(function() {
      $('.sidenav').sidenav();
    });
  }

  render() {
    const { logout } = this.props;
    const { authenticated } = this.props.currentUser;

    const amIAuthenticated = authenticated ? (
      <div>
        <li key="my-images">
          <Link to="/scrapbook">My Images</Link>
        </li>
        <li key="my-albums">
          <Link to="/albums">My Albums</Link>
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
          <a href="/signup">SIGN UP</a>
        </li>
        <li key="login">
          <a href="/login">LOGIN</a>
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
            {amIAuthenticated}
          </ul>
          <a href="#" data-target="nav-mobile" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>
    );
  }
}

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
