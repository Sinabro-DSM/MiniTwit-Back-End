import { User } from "../../models/user";
import { Timeline } from "../../models/timeline";
import { Image } from "../../models/image";
import { Op } from "sequelize";
import { Like } from "../../models/like";

export const findUserById = async (id: string): Promise<User> => {
  try {
    const user: any = User.findOne({ where: { id } });
    return user;
  } catch (e) {
    throw e;
  }
};

export const searchUser = async (nickname: string): Promise<User> => {
  try {
    const users: any = await User.findAll({
      attributes: ["id", "nickname", "img"],
      where: { nickname: { [Op.like]: `%${nickname}%` } },
    });
    return users;
  } catch (e) {
    throw e;
  }
};

export const showUser = async (id: string): Promise<object> => {
  try {
    const profile: any = await User.findOne({
      include: [
        {
          model: User,
          as: "Followings",
          attributes: ["id", "nickname", "img"],
        },
        {
          model: User,
          as: "Followers",
          attributes: ["id", "nickname", "img"],
        },
        {
          model: Timeline,
          attributes: ["id", "content"],
          include: [
            {
              model: Image,
              attributes: ["id", "img"],
            },
            {
              model: Like,
              attributes: ["userId"],
            },
          ],
        },
      ],
      attributes: ["email", "nickname", "img"],
      where: { id },
    });

    for (let i = 0; i < profile.Timelines.length; i++) {
      profile.Timelines[i].dataValues.isLike = false;
      for (let j = 0; j < profile.Timelines[i].Likes.length; j++) {
        if (profile.Timelines[i].Likes[j].userId === id) {
          profile.Timelines[i].dataValues.isLike = true;
        }
      }
    }
    console.log(profile.Timelines);
    return profile;
  } catch (e) {
    throw e;
  }
};
