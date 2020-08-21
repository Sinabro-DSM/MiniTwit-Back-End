import express from "express";
import user from "./user";
import profile from "./profile";

const router = express();

router.use("/user", user);
router.use("/profile", profile);

export default router;
