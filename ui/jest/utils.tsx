import { PropsWithChildren } from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClientProvider } from "react-query";
import queryClient from "/@/api/client";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import rootReducer from "/@/reducers";

const render = (ui: JSX.Element, { preloadedState = {}, route = "/", ...renderOptions } = {}) => {
  const store = configureStore({ reducer: rootReducer, preloadedState });

  const Wrapper = ({ children }: PropsWithChildren<object>): JSX.Element => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
