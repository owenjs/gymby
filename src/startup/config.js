import morgan from "morgan";

const config = app => {
  if (app.get("env") === "development") {
    app.use(morgan("test"));
  }
};

export default config;
