import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";
import * as dotenv from "dotenv";
import path from "path";
import { Timeline } from "./timeline";
import { Like } from "./like";
dotenv.config({ path: path.join(__dirname, "../../.env") });

export class User extends Model {
  email: string;
  password: string;
  nickname: string;
  img: string;
}

User.init(
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    img: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: process.env.DEFAULT_IMAGE,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.belongsToMany(User, {
  foreignKey: "followerId",
  as: "Followings",
  through: "Follow",
});
User.belongsToMany(User, {
  foreignKey: "followingId",
  as: "Followers",
  through: "Follow",
});

User.hasMany(Timeline, { foreignKey: "userId", sourceKey: "id" });
Timeline.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Like);
Like.belongsTo(User);
