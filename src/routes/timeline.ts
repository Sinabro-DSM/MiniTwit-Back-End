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

router.get(
  "/like/:id",
  authMiddleware,
  tryCatchMiddleware.ServerError(Timeline.likeOne)
);

router.delete(
  "/like/:id",
  authMiddleware,
  tryCatchMiddleware.NotFound(Timeline.unLike)
);

router.get(
  "/:page",
  authMiddleware,
  tryCatchMiddleware.NotFound(Timeline.showAll)
);

router.delete(
  "/:id",
  authMiddleware,
  tryCatchMiddleware.Forbidden(Timeline.deleteOne)
);

export default router;
