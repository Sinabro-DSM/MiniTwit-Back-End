import express from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware } from "../middlewares/auth";
import { uploadMiddleware } from "../middlewares/upload";
import * as Profile from "../controller/profile/controller";

const router = express();

router.put(
  "/",
  authMiddleware,
  uploadMiddleware.single("file"),
  tryCatchMiddleware.NotFound(Profile.changeProfile)
);
router.get("/search/:nickname", tryCatchMiddleware.ServerError(Profile.search));
router.get("/", authMiddleware, tryCatchMiddleware.NotFound(Profile.showMine));
router.get(
  "/:id",
  authMiddleware,
  tryCatchMiddleware.NotFound(Profile.showProfile)
);

export default router;
