import mongoose from "mongoose";
import config from "config";
import { URL } from "src/constants/db";

const connect = () => {
  mongoose
    .connect(URL)
    .then(() => {
      console.log(
        `Connected to MongoDB, Cluster: ${process.env.DB_CLUSTER}, Collection: ${config.get("db.collection")}`
      );
    })
    .catch(err => console.log(err));
};

export default connect;
