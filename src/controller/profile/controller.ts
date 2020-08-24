import { Request, Response, NextFunction } from "express";
import * as query from "./query";

export const changeProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req["decoded"].id;
  const img: string = req.file["key"];
  const user: any = await query.findUserById(id);
  if (!user) throw new Error("존재하지 않는 유저");
  user.img = img;
  await user.save();
  res.status(200).json({ message: "성공" });
};

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const nickname = req.body.nickname;
  const users = await query.searchUser(nickname);
  res.status(200).json({ message: "성공", users });
};

export const showProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const profile: any = await query.showUser(id);
  res.status(200).json({
    message: "성공",
    profile,
  });
};
