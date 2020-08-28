import express from "express";
import { refreshMiddleware } from "../middlewares/auth";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import * as User from "../controller/user/controller";

const router = express();

router.post("/email/send", tryCatchMiddleware.Conflict(User.emailSend));
router.post("/register", tryCatchMiddleware.Conflict(User.signUp));
router.post("/login", tryCatchMiddleware.NotFound(User.login));
router.get(
  "/refresh",
  refreshMiddleware,
  tryCatchMiddleware.NotFound(User.refresh)
);

export default router;
