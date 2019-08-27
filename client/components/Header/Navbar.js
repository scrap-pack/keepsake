import React from 'react';

const Navbar = props => {
  return (
    <nav className="teal darken-2" role="navigation">
      <div className="nav-wrapper container">
        <a id="logo-container" href="/" className="brand-logo">
          <div id="logo" style={{ fontFamily: 'Chalkduster, fantasy' }}>
            KeepSake
          </div>
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <a href="/">My Images</a>
          </li>
        </ul>

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

export default Navbar;
