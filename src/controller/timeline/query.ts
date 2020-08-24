import { Timeline } from "../../models/timeline";
import { User } from "../../models/user";
import { Image } from "../../models/image";
import uuid4 from "uuid4";
import { resolveSoa } from "dns";

export const findUserById = async (id: string): Promise<User> => {
  try {
    const user: any = User.findOne({ where: { id } });
    return user;
  } catch (e) {
    throw e;
  }
};

export const findTimelineById = async (id: string): Promise<Timeline> => {
  try {
    const timeline: any = Timeline.findOne({ where: { id } });
    return timeline;
  } catch (e) {
    throw e;
  }
};

export const mkId = async (): Promise<string> => {
  const id = await uuid4().split("-");
  return id[2] + id[1] + id[0] + id[3] + id[4];
};

export const writeOne = async (
  id: string,
  content: string,
  userId: string
): Promise<Timeline> => {
  return await Timeline.create({ id, content, userId });
};

export const addImg = async (id: string, img: string, timelineId: string) => {
  return await Image.create({ id, img, timelineId });
};

export const like = async (userId: string, timelineId: string) => {
  const user: any = await findUserById(userId);
  await user.addTimeline(timelineId);
};

export const showAllTimeline = async (id: string): Promise<object> => {
  try {
    const timeline = await User.findAll({
      include: [
        {
          model: Timeline,
          attributes: ["id", "content"],
          include: [
            {
              model: Image,
              attributes: ["id", "img"],
            },
          ],
        },
        {
          model: User,
          as: "Followings",
          attributes: ["id", "nickname", "img"],
          include: [
            {
              model: Timeline,
              attributes: ["id", "content"],
              include: [
                {
                  model: Image,
                  attributes: ["id", "img"],
                },
              ],
            },
          ],
        },
      ],
      attributes: ["id", "nickname", "img"],
      where: { id },
    });
    return timeline;
  } catch (e) {
    throw e;
  }
};
