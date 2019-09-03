import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SignUp = props => {
  const { loggedIn } = props;

  if (!loggedIn) {
    return (
      <div id="signup-container" className="container valign-wrapper">
        <div className="row center-align">
          <h3>Create An Account</h3>
          <div className=" card grey lighten-4 col s12 m12 l12 ">
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">
                  <div className="teal-text text-darken-1">account_circle</div>
                </i>
                <input id="first_name" type="text" className="validate" />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s6">
                <input id="last_name" type="text" className="validate" />
                <label htmlFor="last_name">Last Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">
                  <div className="teal-text text-darken-1">email</div>
                </i>
                <input id="email" type="email" className="validate" />
                <label htmlFor="email">Email</label>
                <span
                  class="helper-text"
                  data-error="Invalid Email"
                  data-success=""
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">
                  <div className="teal-text text-darken-1">fingerprint</div>
                </i>
                <input id="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
                <span
                  class="helper-text"
                  data-error="Invalid Password"
                  data-success=""
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <button className="btn-large teal darken-1">Sign Up!</button>
              </div>
            </div>
            <div className="row">
              Already have an account? <Link to="/login">Login here.</Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else window.history.back();
  return null;
};

const mapState = ({ loggedIn }) => ({ loggedIn });

const mapDispatch = dispatch => ({});

export default connect(
  mapState,
  mapDispatch
)(SignUp);
