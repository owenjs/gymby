import express from "express";
import config from "src/startup";
import dotenv from "dotenv";
dotenv.config();

const app = express();

config(app);

const server = app.listen(process.env.PORT || 3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://[${address}]:${port}`);
});

export default server;
