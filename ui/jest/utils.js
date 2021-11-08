import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "/@/reducers";

const render = (
  ui,
  { preloadedState, store = configureStore({ reducer: rootReducer, preloadedState }), ...renderOptions } = {}
) => {
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
