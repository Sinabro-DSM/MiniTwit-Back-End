import { User } from "../../models/user";
import bcrypt from "bcrypt-nodejs";
import uuid4 from "uuid4";

export const mkRandomNumber = () => {
  let arr: Array<number> = [];
  for (let i = 0; i < 6; i++) {
    arr[i] = Math.floor(Math.random() * 10);
  }
  return arr.join("");
};

export const findUserByEmail = async (email: string): Promise<User> => {
  try {
    const user: any = await User.findOne({ where: { email } });
    return user;
  } catch (e) {
    throw e;
  }
};

export const mkId = async (): Promise<string> => {
  const id = await uuid4().split("-");
  return id[2] + id[1] + id[0] + id[3] + id[4];
};

export const passwordEncoding = async (password: string): Promise<string> => {
  return await bcrypt.hashSync(password);
};

export const createUser = async (
  id: string,
  email: string,
  password: string,
  nickname: string
) => {
  await User.create({ id, email, password, nickname });
};

export const passwordCompare = async (
  password: string,
  encodedPassword: string
): Promise<boolean> => {
  return await bcrypt.compareSync(password, encodedPassword);
};

export const findUserById = async (id: string): Promise<User> => {
  try {
    const user: any = await User.findOne({ where: { id } });
    return user;
  } catch (e) {
    throw e;
  }
};
