import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "/@/configureStore";
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "/@/pages";
import "/@/scss/index.scss";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Pages />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
