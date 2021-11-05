import express from "express";
import helmet from "helmet";
import errorMiddleWare from "src/middleware/error";

import api from "src/routes/api";

export default app => {
  app.use(helmet());
  app.use(express.json());

  app.use(express.static("dist/public"));

  app.use("/api", api);

  app.use(errorMiddleWare);
};
