import { Request, Response, NextFunction } from "express";
import * as query from "./query";
import { resolveSoa } from "dns";

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

export const likeOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req["decoded"].id;
  const timelineId: string = req.params.id;
  await query.like(userId, timelineId);
  res.status(200).json({ message: "성공" });
};

export const unLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req["decoded"].id;
  const timelineId: string = req.params.id;
  await query.unLike(timelineId, userId);
  res.status(200).json({ message: "성공" });
};

export const showAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req["decoded"].id;
  const page: string = req.params.page;
  const timelines: any = await query.showAllTimeline(id, page);
  res.status(200).json({
    message: "성공",
    timelines,
  });
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const userId: string = req["decoded"].id;
  await query.deleteTimeline(id, userId);
  res.status(200).json({ message: "성공" });
};
