import express from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware } from "../middlewares/auth";
import * as Follow from "../controller/follow/controller";

const router = express();

router.get(
  "/:id",
  authMiddleware,
  tryCatchMiddleware.NotFound(Follow.following)
);

router.delete(
  "/:id",
  authMiddleware,
  tryCatchMiddleware.NotFound(Follow.unFollow)
);

export default router;
