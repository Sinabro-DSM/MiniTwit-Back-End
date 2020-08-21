import express from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import * as User from "../controller/user/controller";

const router = express();

router.post(
  "/email/send",
  tryCatchMiddleware.Conflict(User.emailExist),
  tryCatchMiddleware.ServerError(User.emailSend)
);
router.post("/register", tryCatchMiddleware.Conflict(User.signUp));
router.post("/login", tryCatchMiddleware.NotFound(User.login));

export default router;
