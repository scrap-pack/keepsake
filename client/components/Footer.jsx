import React from 'react';

const Footer = props => {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row center-align">CONNECT WITH US</div>
        <div className="row center-align">
          <div className="col l3" />
          <div className="col s12 l6">
            <div className="row center-align">
              <div className="col s3 l3">
                <a href="https://www.facebook.com">
                  <i className=" material-icons white-text fa fa-facebook-square"></i>
                </a>
              </div>
              <div className="col s3 l3">
                <a href="https://www.instagram.com">
                  <i className="material-icons white-text fa fa-instagram"></i>
                </a>
              </div>
              <div className="col s3 l3">
                <a href="https://twitter.com">
                  <i className="material-icons white-text fa fa-twitter"></i>
                </a>
              </div>
              <div className="col s3 l3">
                <a href="https://www.pinterest.com">
                  <i className="material-icons white-text fa fa-pinterest-square"></i>
                </a>
              </div>
            </div>
            <div className="col l3" />
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container center-align">
          © Created by{' '}
          <a className="white-text" href="/scrap_pack">
            Scrap Pack, Inc.
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
