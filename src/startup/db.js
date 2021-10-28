import mongoose from "mongoose";
import config from "config";
import logger from "src/logger";
import { URL } from "src/constants/db";

const connect = () => {
  mongoose.connect(URL).then(() => {
    logger.info(`Connected to MongoDB, Cluster: ${process.env.DB_CLUSTER}, Collection: ${config.get("db.collection")}`);
  });
};

export default connect;
