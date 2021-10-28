import config from "src/startup/config";
import db from "src/startup/db";

const init = app => {
  config(app);
  db();
};

export default init;
