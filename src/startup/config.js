import morgan from "morgan";

const config = app => {
  if (app.get("env") === "development") {
    app.use(morgan("tiny"));

  }
};

export default config;
