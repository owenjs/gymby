import config from "config";

export const URL = `mongodb+srv://${config.get("db.user")}:${config.get("db.pass")}@${config.get(
  "db.cluster"
)}.neya2.mongodb.net/${config.get("db.collection")}?retryWrites=true&w=majority`;
