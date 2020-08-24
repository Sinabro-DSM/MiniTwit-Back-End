import { User } from "../../models/user";

export const findUserById = async (id: string): Promise<User> => {
  try {
    const user: any = User.findOne({ where: { id } });
    return user;
  } catch (e) {
    throw e;
  }
};

export const followOne = async (followerId: string, followingId: string) => {
  const user: any = await findUserById(followerId);
  await user.addFollowing(followingId);
};

export const unFollow = async (followerId: string, followingId: string) => {
  const user: any = await findUserById(followerId);
  await user.removeFollowing(followingId);
};
