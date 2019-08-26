import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";

// eslint-disable-next-line no-undef
const appDiv = document.getElementById("app");

render(
  <Provider>
    <Router>
      <Main />
    </Router>
  </Provider>,
  appDiv
);
