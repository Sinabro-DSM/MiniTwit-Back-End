import express from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { uploadMiddleware } from "../middlewares/upload";
import { authMiddleware } from "../middlewares/auth";
import * as Timeline from "../controller/timeline/controller";

const router = express();

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.array("file", 4),
  tryCatchMiddleware.ServerError(Timeline.writeOne)
);

export default router;
