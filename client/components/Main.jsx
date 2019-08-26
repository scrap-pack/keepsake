import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router";
import { connect } from "react-redux";
import Home from "./Home.jsx";
import Upload from "./Upload.jsx";
import { fetchImages } from "../redux/images";

const propTypes = {
  getImages: PropTypes.func.isRequired,
};

class Main extends Component {
  componentDidMount() {
    const { getImages } = this.props;
    getImages();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/upload" component={Upload} />
      </Switch>
    );
  }
}

Main.propTypes = propTypes;

const mapDispatchToProps = (dispatch) => ({
  getImages: () => dispatch(fetchImages()),
});

const connectedComponent = connect(
  null,
  mapDispatchToProps,
);

const connectedMain = connectedComponent(Main);

export default connectedMain;
