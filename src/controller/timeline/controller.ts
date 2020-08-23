import { Request, Response, NextFunction } from "express";
import * as query from "./query";

export const writeOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req["decoded"].id;
  const img: any = req.files;
  const content: string = req.body.content;
  const timelineId: string = await query.mkId();
  const timeline: any = await query.writeOne(timelineId, content, userId);
  for (let i = 0; i < img.length; i++) {
    const imageId: string = await query.mkId();
    await query.addImg(imageId, img[i].key, timeline.id);
  }
  res.status(200).json({ message: "성공" });
};
