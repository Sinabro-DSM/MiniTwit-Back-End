import { User } from "../../models/user";
import { Op } from "sequelize";

export const findUserById = async (id): Promise<User> => {
  try {
    const user: any = User.findOne({ where: { id } });
    return user;
  } catch (e) {
    throw e;
  }
};

export const searchUser = async (nickname): Promise<User> => {
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
