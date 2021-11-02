import config from "src/startup/config";
import db from "src/startup/db";
import routes from "src/startup/routes";

export default app => {
  config(app);
  db();
  routes(app);
};
