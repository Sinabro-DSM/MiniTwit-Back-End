import { Timeline } from "../../models/timeline";
import { User } from "../../models/user";
import { Image } from "../../models/image";
import uuid4 from "uuid4";
import Sequelize from "sequelize";
import { Like } from "../../models/like";

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
  await Like.create({ userId, timelineId });
};

export const showAllTimeline = async (
  id: string,
  page: any
): Promise<object> => {
  try {
    let userIdArr: Array<string> = [id];
    const user: any = await findUserById(id);
    console.log(user);
    const following: Array<object> = await user.getFollowings();
    for (let i = 0; i < following.length; i++) {
      userIdArr.push(following[i]["id"]);
    }

    const timeline: any = await Timeline.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email", "nickname", "img"],
        },
        {
          model: Image,
          attributes: ["id", "img"],
        },
        {
          model: Like,
          attributes: ["userId"],
        },
      ],
      order: [["createdAt", "DESC"]],
      where: { userId: { [Sequelize.Op.in]: userIdArr } },
      attributes: ["id", "content", "createdAt"],
      offset: 10 * (page - 1),
      limit: 10,
    });
    for (let i = 0; i < timeline.length; i++) {
      timeline[i].dataValues.isLike = false;
      timeline[i].dataValues.isMine = false;
      if (timeline[i].User.id === id) {
        timeline[i].dataValues.isMine = true;
      }
      for (let j = 0; j < timeline[i].Likes.length; j++) {
        if (timeline[i].Likes[j].userId === id) {
          timeline[i].dataValues.isLike = true;
        }
      }
    }
    return timeline;
  } catch (e) {
    throw e;
  }
};

export const deleteTimeline = async (id: string, userId: string) => {
  const timeline: any = await Timeline.findOne({ where: { id } });
  if (timeline["userId"] !== userId) throw new Error("자신의 글이 아님");
  await timeline.destroy();
};
