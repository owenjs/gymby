import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "/@/api/client";
import configureStore from "/@/configureStore";
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "/@/pages";
import "/@/scss/index.scss";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Pages />

          <ReactQueryDevtools initialIsOpen={false} />
        </Router>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
