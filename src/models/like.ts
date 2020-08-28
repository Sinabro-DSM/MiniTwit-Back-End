import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Like extends Model {
  timelineId: string;
  userId: string;
}

Like.init(
  {
    timelineId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Like",
  }
);
