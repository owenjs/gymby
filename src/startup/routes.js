import express from "express";
import helmet from "helmet";
import cors from "cors";
import errorMiddleWare from "src/middleware/error";

import apiV1 from "src/routes/api/v1";

export default app => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use(express.static("dist/public"));

  app.use("/api/v1", apiV1);

  app.use(errorMiddleWare);
};
