import config from "src/startup/config";
import db from "src/startup/db";
import routes from "src/startup/routes";
import validation from "src/startup/validation";

export default app => {
  config(app);
  db();
  routes(app);
  validation();
};
