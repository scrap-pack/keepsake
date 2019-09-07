import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { createUserThunk } from '../redux/users.js';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initState = { firstName: '', lastName: '', email: '', password: '' };
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { state } = this;
    const { createUser } = this.props;
    createUser(state);
    this.setState(this.initState);
    this.props.history.push('/');
  }
  render() {
    // If every value of the form is not empty, then signup button will be active
    const isEnabled = Object.values(this.state).every(val => val.length > 0);
    // If user is already authenticated, user cannot resignup  and is redirected to homepage
    const { authenticated } = this.props.currentUser;
    if (authenticated) {
      return <Redirect to="/" />;
    }
    // else return the signup form
    return (
      <div id="signup-container" className="container valign-wrapper">
        <div className="row center-align">
          <h3>Create An Account</h3>
          <form
            id="signup-form"
            className=" card grey lighten-4 col s12 m12 l12 "
            onSubmit={this.handleSubmit}
          >
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">
                  <div className="teal-text text-darken-1">account_circle</div>
                </i>
                <input
                  id="first_name"
                  name="firstName"
                  value={this.value}
                  type="text"
                  className="validate"
                  pattern="[a-zA-Z]+"
                  onChange={this.handleChange}
                />
                <label htmlFor="first_name">First Name</label>
                <span
                  className="helper-text"
                  data-error="Only letters allowed!"
                  data-success=""
                />
              </div>
              <div className="input-field col s6">
                <input
                  id="last_name"
                  name="lastName"
                  value={this.value}
                  type="text"
                  className="validate"
                  pattern="[a-zA-Z]+"
                  onChange={this.handleChange}
                />
                <label htmlFor="last_name">Last Name</label>
                <span
                  className="helper-text"
                  data-error="Only letters allowed!"
                  data-success=""
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">
                  <div className="teal-text text-darken-1">email</div>
                </i>
                <input
                  id="email"
                  name="email"
                  value={this.value}
                  type="email"
                  className="validate"
                  onChange={this.handleChange}
                />
                <label htmlFor="email">Email</label>
                <span
                  className="helper-text"
                  data-error="Invalid Email"
                  data-success=""
                />
              </div>
            </div>
            <div className="row">
              <div className="grey-text">
                <i className="material-icons">info</i>
                &nbsp; &nbsp; Password must be between 8 to 24 characters <br />
                (letters and numbers only).
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">
                  <div className="teal-text text-darken-1">fingerprint</div>
                </i>
                <input
                  id="password"
                  name="password"
                  value={this.value}
                  type="password"
                  className="validate"
                  pattern="[a-zA-Z0-9]{8,24}"
                  onChange={this.handleChange}
                />
                <label htmlFor="password">Password</label>
                <span
                  className="helper-text center-align"
                  data-error="Password must be between 8 to 24 characters(letters and numbers only)!"
                  data-success=""
                />
              </div>
            </div>
            <div id="signup-button" className="row">
              <div className="col s12">
                <button
                  disabled={!isEnabled}
                  className="btn-large teal darken-1"
                  type="submit"
                  onClick={() => <Redirect to="/" />}
                >
                  Sign Up <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
            <div className="row">
              Already have an account? <Link to="/login">Login here.</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = ({ currentUser }) => ({ currentUser });

const mapDispatch = dispatch => ({
  createUser: user => {
    dispatch(createUserThunk(user));
  },
});

export default connect(
  mapState,
  mapDispatch
)(SignUp);
