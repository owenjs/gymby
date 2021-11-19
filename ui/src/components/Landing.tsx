import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { NAME as authSliceName } from "/@/reducers/auth";
import logo from "/@/assets/logo.svg";
import PropTypes, { InferProps } from "prop-types";
import { RootState } from "/@/reducers";

const propTypes = {
  auth: PropTypes.bool.isRequired
};

const App = ({ auth }: InferProps<typeof propTypes>) => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={logo} alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          {" | "}
          <Link className="App-link" to="/auth">
            {auth ? "Authorised" : "Unauthorised"}
          </Link>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
};

App.propTypes = propTypes;

export default connect((state: RootState) => ({ auth: state[authSliceName].auth }))(App);
