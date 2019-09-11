import React from 'react';
import { connect } from 'react-redux';
import landingpageimg from '../../public/images/landingpage.jpg';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $(document).ready(function() {
      $('.parallax').parallax();
    });
  }
  render() {
    return (
      <div>
        <div id="index-banner" className="parallax-container">
          <div className="section no-pad-bot">
            <div className="container">
              <br />
              <div style={{ height: '250px' }} />
              <h3 className="header center orange-text orange-lighten-5">
                Tresure your memories
              </h3>
              <div className="row center">
                <a
                  href="/signup"
                  id="landing-page-signup-button"
                  className="btn-large waves-effect waves-light teal lighten-1"
                >
                  Get Started
                </a>
              </div>
              <br />
            </div>
          </div>
          <div className="parallax">
            <img style={{ width: '100%' }} src={landingpageimg} />
          </div>
        </div>
        <div className="container">
          <br />
          <div className="section valign-center">
            <div className="row center-align">
              <div className="col s12 ">
                <h4 className="teal-text teal-darken-2">
                  Build your personalized scrapbook and share it!
                </h4>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="teal lighten-2 row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center white-text">
                    <i className="material-icons">photo_camera</i>
                  </h2>
                  <h5 className="center">Add a photo</h5>

                  <p className="light">
                    “ One of the best ways to make yourself happy in the present
                    is to recall happy times from the past. Photos are a great
                    memory-prompt, and because we tend to take photos of happy
                    occasions, they weight our memories to the good. “
                  </p>
                  <p className="right-align">— Gretchen Rubin</p>
                </div>
              </div>

              <div className="white col s12 m4">
                <div className="icon-block">
                  <h2 className="center teal-text teal-lighten-2">
                    <i className="material-icons">insert_photo</i>
                  </h2>
                  <h5 className="center">Add to your collection</h5>

                  <p className="light">
                    “ A great private collection is a material concentrate that
                    continually stimulates, that overexcites. Not only because
                    it can always be added to, but because it is already too
                    much. The collector’s need is precisely for excess, for
                    surfeit, for profusion. It’s too much—and it’s just enough
                    for me. … A collection is always more than is necessary. ”
                  </p>
                  <p className="right-align">— Susan Sontag</p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center white-text">
                    <i className="material-icons">group</i>
                  </h2>
                  <h5 className="center">Share with others</h5>

                  <p className="light">
                    “ Love only grows by sharing. You can only have more for
                    yourself by giving it away to others. “
                  </p>
                  <p className="right-align">— Brian Tracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ currentUser }) => ({ currentUser });

export default connect(mapState)(LandingPage);
