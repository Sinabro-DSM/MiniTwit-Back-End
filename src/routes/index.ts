import express from "express";
import user from "./user";
import profile from "./profile";
import timeline from "./timeline";
import follow from "./follow";

const router = express();

router.use("/user", user);
router.use("/profile", profile);
router.use("/timeline", timeline);
router.use("/follow", follow);

export default router;
