import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <nav class="teal darken-2" role="navigation">
      <div class="nav-wrapper container">
        <a id="logo-container" href="/" class="brand-logo">
          <div id="logo" style={{ fontFamily: 'Chalkduster, fantasy' }}>
            KeepSake
          </div>
        </a>
        <ul class="right hide-on-med-and-down">
          <li>
            <Link to="/upload">My Images</Link>
          </li>
        </ul>

        <ul id="nav-mobile" class="sidenav">
          <li>
            <a href="/">Navbar Link</a>
          </li>
        </ul>
        <a href="#" data-target="nav-mobile" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
