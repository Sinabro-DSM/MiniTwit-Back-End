import express from "express";
import user from "./user";
import profile from "./profile";
import timeline from "./timeline";

const router = express();

router.use("/user", user);
router.use("/profile", profile);
router.use("/timeline", timeline);

export default router;
