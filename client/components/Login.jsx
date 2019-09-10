import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loginThunk } from '../redux/users.js';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.initState = {
      email: '',
      password: '',
      error: 'Invalid Login Credentials',
    };
    this.state = {
      email: '',
      password: '',
      error: 'Invalid Login Credentials!',
    };
  }
  componentDidMount() {
    this.setState(this.initState);
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleLogin(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    const { login } = this.props;
    login(email, password);
  }

  renderAlert() {
    if (this.props.currentUser.error) {
      return <h5 className="red-text red-lighten-1">{this.state.error}</h5>;
    }
  }
  render() {
    const { authenticated } = this.props.currentUser;
    if (!authenticated) {
      return (
        <div id="signup-container" className="container valign-wrapper">
          <div className="row center-align">
            <h3>Login To Account</h3>
            <form
              id="login-form"
              className=" card grey lighten-4 col s12 m12 l12 "
              onSubmit={this.handleLogin}
            >
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
                    onChange={this.handleChange}
                  />
                  <label htmlFor="password">Password</label>
                  <span
                    className="helper-text"
                    data-error="Invalid Password"
                    data-success=""
                  />
                </div>
              </div>
              {this.renderAlert()}
              <div className="row">
                <div className="col s12">
                  <button className="btn-large teal darken-1" type="submit">
                    Login <i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
              <div className="row">
                Don't have an account? <Link to="/signup">Sign up here.</Link>
              </div>
            </form>
          </div>
        </div>
      );
    } else return <Redirect to="/" />;
  }
}

const mapState = ({ currentUser }) => ({ currentUser });

const mapDispatch = dispatch => ({
  login: (email, password) => {
    dispatch(loginThunk(email, password));
  },
});
export default connect(
  mapState,
  mapDispatch
)(Login);
