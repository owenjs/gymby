import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "/@/reducers";

export default (preloadedState?: object) => {
  // const middlewares = [];

  // if (process.env.NODE_ENV === 'development') {
  //   middlewares.push(secretMiddleware)
  // }

  // const enhancers = [];

  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  // }

  return configureStore({
    reducer: rootReducer,
    preloadedState
    // middleware: getDefaultMiddleware => [...middlewares, ...getDefaultMiddleware()],
    // enhancers
  });
};
