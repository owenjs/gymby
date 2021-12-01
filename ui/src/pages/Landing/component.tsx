import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/@/assets/logo.svg";
import PropTypes, { InferProps } from "prop-types";

const propTypes = {
  authToken: PropTypes.string.isRequired
};

const Landing = ({ authToken }: InferProps<typeof propTypes>) => {
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
          <Link className="App-link" to="/dashboard">
            {authToken ? "Authorised" : "Unauthorised"}
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

Landing.propTypes = propTypes;

export default Landing;
