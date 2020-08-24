import { Request, Response, NextFunction } from "express";
import * as query from "./query";

export const following = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const followerId = req["decoded"].id;
  const followingId = req.params.id;
  await query.followOne(followerId, followingId);
  res.status(200).json({ message: "성공" });
};

export const unFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const followerId = req["decoded"].id;
  const followingId = req.params.id;
  await query.unFollow(followerId, followingId);
  res.status(200).json({ message: "성공" });
};
